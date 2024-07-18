import { Wallet, BigNumber, Utils, Erc20, IWallet, TransactionReceipt, Contract, IMulticallContractCall } from "@ijstech/eth-wallet";
import { Contracts as TimeIsMoneyContracts } from "@scom/oswap-time-is-money-contract";
import { Contracts } from "@scom/oswap-openswap-contract";
import { Contracts as UtilsContracts } from "@scom/oswap-chainlink-contract";
import { Contracts as CrossChainContracts } from "@scom/oswap-cross-chain-bridge-contract";
import {
  ISingleStakingCampaign,
  ISingleStaking,
  IOptionInfo,
  IExtendOptionInfo,
  ICampaignDetail,
  IRewardInfo,
} from "../global/index";
import {
  USDPeggedTokenAddressMap,
  getTokenDecimals,
  State
} from "../store/index";
import { tokenStore, ToUSDPriceFeedAddressesMap, WETHByChainId, tokenPriceAMMReference, ITokenObject } from '@scom/scom-token-list';

export const getTokenPrice = async (wallet: IWallet, token: string) => { // in USD value
  let chainId = wallet.chainId;
  let tokenPrice: string;

  // get price from price feed 
  let tokenPriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token.toLowerCase()];
  if (tokenPriceFeedAddress) {
    let aggregator = new UtilsContracts.EACAggregatorProxy(wallet, tokenPriceFeedAddress);
    let tokenLatestRoundData = await aggregator.latestRoundData();
    let tokenPriceFeedDecimals = await aggregator.decimals();
    return tokenLatestRoundData.answer.shiftedBy(-tokenPriceFeedDecimals).toFixed();
  }

  // get price from AMM
  let referencePair = tokenPriceAMMReference[chainId][token.toLowerCase()]
  if (!referencePair) return null;
  let pair = new Contracts.OSWAP_Pair(wallet, referencePair);
  let token0 = await pair.token0();
  let token1 = await pair.token1();
  let reserves = await pair.getReserves()
  let token0PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token0.toLowerCase()]
  let token1PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token1.toLowerCase()]

  if (token0PriceFeedAddress || token1PriceFeedAddress) {
    if (token0PriceFeedAddress) {
      let aggregator = new UtilsContracts.EACAggregatorProxy(wallet, token0PriceFeedAddress);
      let token0LatestRoundData = await aggregator.latestRoundData();
      let token0PriceFeedDecimals = await aggregator.decimals();
      let token0USDPrice = new BigNumber(token0LatestRoundData.answer).shiftedBy(-token0PriceFeedDecimals).toFixed();
      if (new BigNumber(token.toLowerCase()).lt(token0.toLowerCase())) {
        tokenPrice = new BigNumber(reserves.reserve1).div(reserves.reserve0).times(token0USDPrice).toFixed()
      } else {
        tokenPrice = new BigNumber(reserves.reserve0).div(reserves.reserve1).times(token0USDPrice).toFixed()
      }
    } else {
      let aggregator = new UtilsContracts.EACAggregatorProxy(wallet, token1PriceFeedAddress);
      let token1LatestRoundData = await aggregator.latestRoundData();
      let token1PriceFeedDecimals = await aggregator.decimals();
      let token1USDPrice = new BigNumber(token1LatestRoundData.answer).shiftedBy(-token1PriceFeedDecimals).toFixed();
      if (new BigNumber(token.toLowerCase()).lt(token1.toLowerCase())) {
        tokenPrice = new BigNumber(reserves.reserve1).div(reserves.reserve0).times(token1USDPrice).toFixed()
      } else {
        tokenPrice = new BigNumber(reserves.reserve0).div(reserves.reserve1).times(token1USDPrice).toFixed()
      }
    }
  } else {
    if (token0.toLowerCase() == token.toLowerCase()) {//for other reference pair
      let token1Price = await getTokenPrice(wallet, token1);
      if (!token1Price) return null;
      tokenPrice = new BigNumber(token1Price).times(reserves.reserve1).div(reserves.reserve0).toFixed()
    } else {
      let token0Price = await getTokenPrice(wallet, token0);
      if (!token0Price) return null;
      tokenPrice = new BigNumber(token0Price).times(reserves.reserve0).div(reserves.reserve1).toFixed()
    }
  }
  return tokenPrice;
}

const getDefaultStakingByAddress = async (wallet: IWallet, option: ISingleStaking) => {
  try {
    let currentAddress = wallet.address;
    let stakingAddress = option.address;
    let rewards = [option.rewards];
    let hasRewardAddress = rewards.length && rewards[0].address;

    let timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, stakingAddress);
    let mode = '';
    let multicallResult = await wallet.doMulticall([
      {
        contract: timeIsMoney,
        methodName: 'minimumLockTime',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'maximumTotalLock',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'totalLocked',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'getCredit',
        params: [currentAddress],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'lockAmount',
        params: [currentAddress],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'withdrawn',
        params: [currentAddress],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'token',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'endOfEntryPeriod',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'perAddressCap',
        params: [],
        to: stakingAddress
      },
      {
        contract: timeIsMoney,
        methodName: 'startOfEntryPeriod',
        params: [],
        to: stakingAddress
      }
    ])

    const minimumLockTime = multicallResult[0];
    const maximumTotalLock = multicallResult[1];
    const totalLockedWei = multicallResult[2];
    const totalCreditWei = multicallResult[3];
    const lockAmountWei = multicallResult[4];
    const withdrawn = multicallResult[5];
    const tokenAddress = multicallResult[6];
    const endOfEntryPeriod = multicallResult[7].toFixed();
    const perAddressCapWei = multicallResult[8];
    let startOfEntryPeriod = '0';
    if (multicallResult[9]) {
      startOfEntryPeriod = multicallResult[9].toFixed();
    }
    let totalCredit = Utils.fromDecimals(totalCreditWei).toFixed();
    let lockAmount = Utils.fromDecimals(lockAmountWei).toFixed();
    let stakeQty = withdrawn ? '0' : lockAmount;

    if (new BigNumber(totalCredit).gt(0) && hasRewardAddress) {
      mode = 'Claim';
    }
    else if (new BigNumber(stakeQty).isZero()) {
      mode = 'Stake';
    }
    else {
      mode = 'Unlock';
    }

    let stakingDecimals = 18 - getTokenDecimals(tokenAddress.toLocaleLowerCase(), wallet.chainId);
    let perAddressCap = Utils.fromDecimals(perAddressCapWei).shiftedBy(stakingDecimals).toFixed();
    let maxTotalLock = Utils.fromDecimals(maximumTotalLock).shiftedBy(stakingDecimals).toFixed();
    let totalLocked = Utils.fromDecimals(totalLockedWei).toFixed();

    let obj = {
      mode,
      minLockTime: minimumLockTime.toNumber(),
      maxTotalLock,
      totalLocked,
      stakeQty,
      startOfEntryPeriod: parseInt(startOfEntryPeriod) * 1000,
      endOfEntryPeriod: parseInt(endOfEntryPeriod) * 1000,
      perAddressCap,
      lockTokenAddress: tokenAddress,
      tokenAddress: tokenAddress.toLowerCase(),
    };

    if (hasRewardAddress) {
      let rewardsData: IRewardInfo[] = [];
      for (let index = 0; index < rewards.length; index++) {
        let reward = rewards[index];
        let rewardsContract, admin, multiplier, initialReward, rewardTokenAddress, vestingPeriod, vestingStartDate, claimDeadline;
        try {
          let claimable = '0';
          if (reward.isCommonStartDate) {
            rewardsContract = new TimeIsMoneyContracts.RewardsCommonStartDate(wallet, reward.address);
          } else {
            rewardsContract = new TimeIsMoneyContracts.Rewards(wallet, reward.address);
          }
          
          let mulicallContracts: IMulticallContractCall[] = [
            {
              contract: rewardsContract,
              methodName: 'admin',
              params: [],
              to: reward.address
            },
            {
              contract: rewardsContract,
              methodName: 'token',
              params: [],
              to: reward.address
            },
            {
              contract: rewardsContract,
              methodName: 'multiplier',
              params: [],
              to: reward.address
            },
            {
              contract: rewardsContract,
              methodName: 'initialReward',
              params: [],
              to: reward.address
            },
            {
              contract: rewardsContract,
              methodName: 'vestingPeriod',
              params: [],
              to: reward.address
            },
            {
              contract: rewardsContract,
              methodName: 'claimDeadline',
              params: [],
              to: reward.address
            }
          ];
          if (mode === 'Claim') {
            mulicallContracts.push({
              contract: rewardsContract,
              methodName: 'unclaimed',
              params: [],
              to: reward.address
            });
          }
          if (reward.isCommonStartDate) {
            mulicallContracts.push({
              contract: rewardsContract,
              methodName: 'vestingStartDate',
              params: [],
              to: reward.address
            });
          }
          let multicallResult = await wallet.doMulticall(mulicallContracts);
          admin = multicallResult[0];
          rewardTokenAddress = multicallResult[1];
          let multiplierWei = multicallResult[2];
          initialReward = multicallResult[3].toFixed();
          vestingPeriod = multicallResult[4].toNumber();
          claimDeadline = multicallResult[5].toNumber();
          if (mode === 'Claim') {
            claimable = Utils.fromDecimals(multicallResult[6]).toFixed();
          }
          if (reward.isCommonStartDate) {
            vestingStartDate = multicallResult[7].toNumber();
          }

          let rewardToken = new Contracts.ERC20(wallet, rewardTokenAddress);
          let rewardTokenDecimals = await (await rewardToken.decimals()).toNumber();
          multiplier = Utils.fromDecimals(multiplierWei, rewardTokenDecimals).toFixed();
          let rewardAmount = new BigNumber(multiplier).multipliedBy(maxTotalLock).toFixed();
          rewardsData.push({
            ...reward,
            claimable,
            rewardTokenAddress,
            multiplier,
            initialReward,
            vestingPeriod,
            admin,
            vestingStartDate,
            rewardAmount,
            index
          });
        } catch { }
      }
      return {
        ...option,
        ...obj,
        rewardsData: rewardsData,
        rewards: rewardsData.sort((a, b) => a.index - b.index)
      }
    }
    else {
      return obj;
    }
  }
  catch (err) {
    console.log('err', err);
    return null;
  }
}

const getCampaignInfo = async (wallet: IWallet, stakingInfo: { [key: number]: ISingleStakingCampaign }) => {
  let chainId = wallet.chainId;
  let stakingCampaignInfo = stakingInfo[chainId];
  if (!stakingCampaignInfo) return null;

  let staking = { ...stakingCampaignInfo.staking };
  let optionExtendedInfo: IOptionInfo;
  try {
    optionExtendedInfo = await getDefaultStakingByAddress(wallet, staking);
  }
  catch (error) {
    return null;
  }
  let stakingExtendInfo: IExtendOptionInfo = { ...staking, ...optionExtendedInfo };

  // const admin = stakingExtendInfo.rewards && stakingExtendInfo.rewards[0] ? stakingExtendInfo.rewards[0].admin : '';
  return {
    // admin,
    ...stakingCampaignInfo,
    campaignStart: stakingExtendInfo.startOfEntryPeriod / 1000,
    campaignEnd: stakingExtendInfo.endOfEntryPeriod / 1000,
    tokenAddress: stakingExtendInfo.tokenAddress?.toLowerCase(),
    option: stakingExtendInfo
  }
}

const getStakingTotalLocked = async (wallet: IWallet, stakingAddress: string) => {
  let timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, stakingAddress);
  let totalLockedWei = await timeIsMoney.totalLocked();
  let totalLocked = Utils.fromDecimals(totalLockedWei).toFixed();
  return totalLocked;
}

const getWETH = (wallet: IWallet): ITokenObject => {
  let wrappedToken = WETHByChainId[wallet.chainId];
  return wrappedToken;
};

const getLPObject = async (wallet: IWallet, pairAddress: string) => {
  try {
    const WETH = getWETH(wallet);
    let pair = new Contracts.OSWAP_Pair(wallet, pairAddress);

    let getSymbol = await pair.symbol();
    let getName = await pair.name();
    let getDecimal = await pair.decimals();
    let token0 = (await pair.token0()).toLowerCase();
    let token1 = (await pair.token1()).toLowerCase();

    return {
      address: pairAddress.toLowerCase(),
      decimals: getDecimal.toFixed(),
      name: getName,
      symbol: getSymbol,
      token0: token0 == WETH.address!.toLowerCase() ? '' : token0,
      token1: token1 == WETH.address!.toLowerCase() ? '' : token1
    };
  } catch (e) {
    return null;
  }
}

const getLPBalance = async (wallet: IWallet, pairAddress: string) => {
  let pair = new Contracts.OSWAP_Pair(wallet, pairAddress);
  let balance = await pair.balanceOf(wallet.address);
  return Utils.fromDecimals(balance).toFixed();
}

const getVaultObject = async (wallet: IWallet, vaultAddress: string) => {
  try {
    let vault = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultAddress);
    let symbol = await vault.symbol();
    let name = await vault.name();
    let decimals = await vault.decimals();
    let tokenMap = tokenStore.getTokenMapByChainId(wallet.chainId);
    let assetToken: any = tokenMap[vaultAddress.toLowerCase()]
    return {
      address: vaultAddress.toLowerCase(),
      decimals,
      name,
      symbol,
      assetToken
    }
  } catch {
    return {}
  }
}

const getVaultBalance = async (wallet: IWallet, vaultAddress: string) => {
  let vault = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultAddress);
  let balance = await vault.balanceOf(wallet.address);
  return Utils.fromDecimals(balance).toFixed();
}

const getERC20RewardCurrentAPR = async (wallet: IWallet, rewardOption: any, lockedToken: any, lockedDays: number) => {
  let chainId = wallet.chainId;
  const usdPeggedTokenAddress = USDPeggedTokenAddressMap[chainId];
  if (!usdPeggedTokenAddress) return '';

  let APR = "";
  let rewardPrice = await getTokenPrice(wallet, rewardOption.rewardTokenAddress);
  let lockedTokenPrice = await getTokenPrice(wallet, lockedToken.address);
  if (!rewardPrice || !lockedTokenPrice) return null;
  APR = new BigNumber(rewardOption.multiplier).times(new BigNumber(rewardPrice).times(365)).div(new BigNumber(lockedTokenPrice).times(lockedDays)).toFixed();
  return APR
}

const getReservesByPair = async (wallet: IWallet, pairAddress: string, tokenInAddress?: string, tokenOutAddress?: string) => {
  let reserveObj;
  let pair = new Contracts.OSWAP_Pair(wallet, pairAddress);
  let reserves = await pair.getReserves();
  if (!tokenInAddress || !tokenOutAddress) {
    tokenInAddress = await pair.token0();
    tokenOutAddress = await pair.token1();
  }

  if (tokenInAddress && tokenOutAddress) {
    if (new BigNumber(tokenInAddress.toLowerCase()).lt(tokenOutAddress.toLowerCase())) {
      reserveObj = {
        reserveA: reserves.reserve0,
        reserveB: reserves.reserve1
      };
    } else {
      reserveObj = {
        reserveA: reserves.reserve1,
        reserveB: reserves.reserve0
      };
    }
  }
  return reserveObj;
}

const getLPRewardCurrentAPR = async (wallet: IWallet, rewardOption: any, lpObject: any, lockedDays: number) => {
  if (!lpObject) return '';
  const WETH = getWETH(wallet);
  const WETHAddress = WETH.address!;
  let chainId = wallet.chainId;
  const usdPeggedTokenAddress = USDPeggedTokenAddressMap[chainId];
  if (!usdPeggedTokenAddress) return '';

  let APR = '';
  if (lpObject.token0.toLowerCase() == usdPeggedTokenAddress.toLowerCase() || lpObject.token1.toLowerCase() == usdPeggedTokenAddress.toLowerCase()) {
    let rewardPrice = '';
    if (rewardOption.APROption && rewardOption.APROption == 1) {
      let WETH9PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][WETHAddress.toLowerCase()];
      if (!WETH9PriceFeedAddress) return '';

      let aggregator = new UtilsContracts.EACAggregatorProxy(wallet, WETH9PriceFeedAddress);
      let WETH9LatestRoundData = await aggregator.latestRoundData();
      let WETH9PriceFeedDecimals = await aggregator.decimals();
      let WETH9USDPrice = new BigNumber(WETH9LatestRoundData.answer).shiftedBy(-WETH9PriceFeedDecimals).toFixed();

      let rewardReserves = await getReservesByPair(rewardOption.referencePair, WETHAddress, rewardOption.rewardTokenAddress);
      if (!rewardReserves) return '';
      rewardPrice = new BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).times(WETH9USDPrice).toFixed();
    }
    else {
      let rewardReserves = await getReservesByPair(rewardOption.referencePair, usdPeggedTokenAddress, rewardOption.rewardTokenAddress);
      if (!rewardReserves) return '';
      rewardPrice = new BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).toFixed();
    }

    let lpTokenOut = lpObject.token0.toLowerCase() == usdPeggedTokenAddress.toLowerCase() ? lpObject.token1 : lpObject.token0;
    let lockedLPReserves = await getReservesByPair(lpObject.address, usdPeggedTokenAddress, lpTokenOut);
    if (!lockedLPReserves) return '';
    let lockedLPPrice = new BigNumber(lockedLPReserves.reserveA).div(lockedLPReserves.reserveB).times(2).toFixed();
    APR = new BigNumber(rewardOption.multiplier).times(new BigNumber(rewardPrice).times(365)).div(new BigNumber(lockedLPPrice).times(lockedDays)).toFixed();
  }
  else {
    if (!lpObject.token0 || !lpObject.token1 || lpObject.token0.toLowerCase() == WETHAddress.toLowerCase() || lpObject.token1.toLowerCase() == WETHAddress.toLowerCase()) {
      let WETH9PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][WETHAddress.toLowerCase()];
      if (!WETH9PriceFeedAddress) return '';

      let aggregator = new UtilsContracts.EACAggregatorProxy(wallet, WETH9PriceFeedAddress);
      let WETH9LatestRoundData = await aggregator.latestRoundData();
      let WETH9PriceFeedDecimals = await aggregator.decimals();
      let WETH9USDPrice = new BigNumber(WETH9LatestRoundData.answer).shiftedBy(-WETH9PriceFeedDecimals).toFixed();

      let rewardReserves = await getReservesByPair(rewardOption.referencePair, WETHAddress, rewardOption.rewardTokenAddress);
      if (!rewardReserves) return '';
      let rewardPrice = new BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).times(WETH9USDPrice).toFixed();

      let otherTokenAddress = (!lpObject.token0 || lpObject.token0.toLowerCase() == WETHAddress.toLowerCase()) ? lpObject.token1 : lpObject.token0;
      let lockedLPReserves = await getReservesByPair(lpObject.address, WETHAddress, otherTokenAddress);
      if (!lockedLPReserves) return '';
      let otherTokenPrice = new BigNumber(lockedLPReserves.reserveA).div(lockedLPReserves.reserveB).times(WETH9USDPrice).toFixed();

      let lockedLPPrice = new BigNumber(otherTokenPrice).times(2).div(new BigNumber(otherTokenPrice).div(WETH9USDPrice).sqrt()).toFixed();
      APR = new BigNumber(rewardOption.multiplier).times(new BigNumber(rewardPrice).times(365)).div(new BigNumber(lockedLPPrice).times(lockedDays)).toFixed();
    }
  }
  return APR;
}

const getVaultRewardCurrentAPR = async (wallet: IWallet, rewardOption: any, vaultObject: any, lockedDays: number) => {
  let APR = '';
  try {
    let rewardPrice = await getTokenPrice(wallet, rewardOption.rewardTokenAddress)
    let assetTokenPrice = await getTokenPrice(wallet, vaultObject.assetToken.address);
    if (!assetTokenPrice || !rewardPrice) return '';
    let vault = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultObject.address);
    let vaultTokenTotalSupply = await vault.totalSupply();
    let lpAssetBalance = await vault.lpAssetBalance();
    let lpToAssetRatio = new BigNumber(lpAssetBalance).div(vaultTokenTotalSupply).toFixed();
    let VaultTokenPrice = new BigNumber(assetTokenPrice).times(lpToAssetRatio).toFixed()
    APR = new BigNumber(rewardOption.multiplier).times(new BigNumber(rewardPrice).times(365)).div(new BigNumber(VaultTokenPrice).times(lockedDays)).toFixed();
  } catch { }
  return APR;
}

const withdrawToken = async (contractAddress: string, callback?: any) => {
  if (!contractAddress) return;
  try {
    let wallet = Wallet.getClientInstance();
    let timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, contractAddress);
    let receipt = await timeIsMoney.withdraw(true);
    return receipt;
  } catch (error) {
    if (callback) {
      callback(error);
    }
  }
}

const claimToken = async (contractAddress: string, callback?: any) => {
  if (!contractAddress) return;
  try {
    let wallet = Wallet.getClientInstance();
    let rewards = new TimeIsMoneyContracts.Rewards(wallet, contractAddress);
    let receipt = await rewards.claim();
    return receipt;
  } catch (error) {
    if (callback) {
      callback(error);
    }
  }
}

const lockToken = async (token: ITokenObject, amount: string, contractAddress: string, callback?: any) => {
  if (!token || !contractAddress) return;
  try {
    let wallet = Wallet.getClientInstance();
    let decimals = typeof token.decimals === 'object' ? (token.decimals as BigNumber).toNumber() : token.decimals;
    let tokenAmount = Utils.toDecimals(amount, decimals);
    let timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, contractAddress);
    let receipt = await timeIsMoney.lock(tokenAmount);
    return receipt;
  } catch (error) {
    if (callback) {
      callback(error);
    }
  }
}

const getProxySelectors = async (state: State, chainId: number, contractAddress: string): Promise<string[]> => {
  const wallet = state.getRpcWallet();
  await wallet.init();
  if (wallet.chainId != chainId) await wallet.switchNetwork(chainId);
  const timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, contractAddress);
  const permittedProxyFunctions: (keyof TimeIsMoneyContracts.TimeIsMoney)[] = [
    "lock",
    "withdraw"
  ];
  const selectors = permittedProxyFunctions
    .map((e: any) => e + "(" + timeIsMoney._abi.filter(f => f.name == e)[0].inputs.map(f => f.type).join(',') + ")")
    .map(e => wallet.soliditySha3(e).substring(0, 10))
    .map(e => timeIsMoney.address.toLowerCase() + e.replace("0x", ""));
  return selectors;
}

const parseDepositEvent = (state: State, receipt: TransactionReceipt, contractAddress: string) => {
  const wallet = state.getRpcWallet();
  let timeIsMoney = new TimeIsMoneyContracts.TimeIsMoney(wallet, contractAddress);
  let event = timeIsMoney.parseDepositEvent(receipt)[0];
  return event;
}

export {
  getCampaignInfo,
  getStakingTotalLocked,
  getLPObject,
  getLPBalance,
  getVaultObject,
  getVaultBalance,
  getERC20RewardCurrentAPR,
  getLPRewardCurrentAPR,
  getVaultRewardCurrentAPR,
  withdrawToken,
  claimToken,
  lockToken,
  getProxySelectors,
  parseDepositEvent
}