export default {
"abi":[
{"inputs":[{"internalType":"address","name":"_factory","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
{"inputs":[{"internalType":"bytes32[]","name":"params","type":"bytes32[]"}],"name":"execute","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
],
"bytecode":"60c060405234801561001057600080fd5b50604051610c98380380610c988339818101604052602081101561003357600080fd5b50516001600160601b0319606082901b1660a05260408051635aa6e67560e01b815290516001600160a01b03831691635aa6e675916004808301926020929190829003018186803b15801561008757600080fd5b505afa15801561009b573d6000803e3d6000fd5b505050506040513d60208110156100b157600080fd5b5051606081811b6001600160601b03191660805260a0516001600160a01b0390921692501c610b6a61012e6000398061029d52806103cc52806104b6528061055452806105f252806106d8528061078f528061080952806108f152806109665280610a585280610b1252508060f3528061015b5250610b6a6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80635aa6e675146100465780638af7c64914610077578063c45a0155146100e9575b600080fd5b61004e6100f1565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100e76004803603602081101561008d57600080fd5b8101906020810181356401000000008111156100a857600080fd5b8201836020820111156100ba57600080fd5b803590602001918460208302840111640100000000831117156100dc57600080fd5b509092509050610115565b005b61004e610b10565b7f000000000000000000000000000000000000000000000000000000000000000081565b604080517fb15866e6000000000000000000000000000000000000000000000000000000008152336004820152905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169163b15866e6916024808301926020929190829003018186803b1580156101a157600080fd5b505afa1580156101b5573d6000803e3d6000fd5b505050506040513d60208110156101cb57600080fd5b505161023857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f742066726f6d20766f74696e670000000000000000000000000000000000604482015290519081900360640190fd5b60008282600081811061024757fe5b90506020020135905060008383600181811061025f57fe5b6020029190910135915050600483141561048357817f7365744f7261636c65000000000000000000000000000000000000000000000014156103a2577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16630c1445818260601c868660028181106102e857fe5b9050602002013560601c878760038181106102ff57fe5b604080517fffffffff0000000000000000000000000000000000000000000000000000000060e089901b16815273ffffffffffffffffffffffffffffffffffffffff9687166004820152949095166024850152602002919091013560601c6044830152509051606480830192600092919082900301818387803b15801561038557600080fd5b505af1158015610399573d6000803e3d6000fd5b5050505061047e565b817f6164644f6c644f7261636c65546f4e65775061697200000000000000000000001415610417577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663399762478260601c868660028181106102e857fe5b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f556e6b6e6f776e20636f6d6d616e640000000000000000000000000000000000604482015290519081900360640190fd5b610b0a565b60028314156107d657817f7365745472616465466565000000000000000000000000000000000000000000141561052a577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663106030238260001c6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561038557600080fd5b817f73657450726f746f636f6c46656500000000000000000000000000000000000014156105c8577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663787dce3d8260001c6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561038557600080fd5b817f73657446656550657244656c656761746f7200000000000000000000000000001415610666577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663636b0d1a8260001c6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561038557600080fd5b817f73657450726f746f636f6c466565546f00000000000000000000000000000000141561071f57604080517fe0e6799f000000000000000000000000000000000000000000000000000000008152606083901c6004820152905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169163e0e6799f91602480830192600092919082900301818387803b15801561038557600080fd5b817f7365744c69766500000000000000000000000000000000000000000000000000141561041757604080517ff5ee33480000000000000000000000000000000000000000000000000000000081528215156004820152905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169163f5ee334891602480830192600092919082900301818387803b15801561038557600080fd5b6003831415610aa357817f7365744d696e4c6f7453697a650000000000000000000000000000000000000014156108c7577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663130a0b408260601c8686600281811061085457fe5b9050602002013560001c6040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561038557600080fd5b817f736574536563757269747953636f72654f7261636c6500000000000000000000141561093c577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632288f2ff8260601c8686600281811061085457fe5b817f7365744c697665466f72506169720000000000000000000000000000000000001415610a2e577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636883618a8260601c868660028181106109b157fe5b604080517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b16815273ffffffffffffffffffffffffffffffffffffffff909516600486015260209091029290920135151560248401525051604480830192600092919082900301818387803b15801561038557600080fd5b817f73657457686974654c69737400000000000000000000000000000000000000001415610417577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16638d14e1278260601c868660028181106109b157fe5b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e76616c696420706172616d65746572730000000000000000000000000000604482015290519081900360640190fd5b50505050565b7f00000000000000000000000000000000000000000000000000000000000000008156fea2646970667358221220d76d6028e6fa6925b283d1cebcf93c71dc2666e462fee3c145644197a6d4696964736f6c634300060b0033"
}