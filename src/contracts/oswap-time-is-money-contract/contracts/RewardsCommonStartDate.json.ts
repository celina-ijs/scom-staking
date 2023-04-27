export default {
"abi":[
{"inputs":[{"internalType":"contract TimeIsMoneyI","name":"timeIsMoney_","type":"address"},{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"uint256","name":"multiplier_","type":"uint256"},{"internalType":"uint256","name":"initialReward_","type":"uint256"},{"internalType":"uint256","name":"vestingStartDate_","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod_","type":"uint256"},{"internalType":"uint256","name":"claimDeadline_","type":"uint256"},{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminDrain","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSoFar","type":"uint256"}],"name":"Claim","type":"event"},
{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"claimDeadline","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimFor","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimSoFar","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"initialReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"putFund","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"reward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"rewardForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"takeUnclaimed","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"timeIsMoney","outputs":[{"internalType":"contract TimeIsMoneyI","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"unclaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"unclaimedForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"vestingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"vestingStartDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
],
"bytecode":"6101a06040523480156200001257600080fd5b50604051620018b5380380620018b58339810160408190526200003591620002f9565b6001600055670de0b6b3a7640000851115620000985760405162461bcd60e51b815260206004820152601860248201527f496e697469616c2072657761726420746f6f206c61726765000000000000000060448201526064015b60405180910390fd5b6001600160a01b038116620000f05760405162461bcd60e51b815260206004820152601560248201527f496e76616c69642061646d696e2061646472657373000000000000000000000060448201526064016200008f565b6001600160a01b038716620001485760405162461bcd60e51b815260206004820152601460248201527f496e76616c69642072657761726420746f6b656e00000000000000000000000060448201526064016200008f565b876001600160a01b031663ed6d0c5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200018257600080fd5b505afa15801562000197573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001bd91906200037e565b886001600160a01b031663302ef3f36040518163ffffffff1660e01b815260040160206040518083038186803b158015620001f757600080fd5b505afa1580156200020c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200023291906200037e565b6200023e919062000397565b8410156200028f5760405162461bcd60e51b815260206004820152601a60248201527f496e76616c69642076657374696e67207374617274206461746500000000000060448201526064016200008f565b6001600160601b0319606088811b821660805289901b1660a05260c086905260e0859052620002c785670de0b6b3a7640000620003b2565b6101005261012093909352610140919091526101605260601b6001600160601b0319166101805250620003fb92505050565b600080600080600080600080610100898b03121562000316578384fd5b88516200032381620003e2565b60208a01519098506200033681620003e2565b8097505060408901519550606089015194506080890151935060a0890151925060c0890151915060e08901516200036d81620003e2565b809150509295985092959890939650565b60006020828403121562000390578081fd5b5051919050565b60008219821115620003ad57620003ad620003cc565b500190565b600082821015620003c757620003c7620003cc565b500390565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b0381168114620003f857600080fd5b50565b60805160601c60a05160601c60c05160e051610100516101205161014051610160516101805160601c6113c9620004ec600039600081816102cd01528181610505015261079e0152600081816101c801528181610590015261061801526000818161022601528181610aeb0152610b430152600081816101f701528181610a110152610ac2015260008181610b150152610b680152600081816102600152610a9a01526000818161013a0152610bb301526000818161017c015281816109270152610c390152600081816102fc01528181610338015281816106d10152818161077c0152610dac01526113c96000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c80637313ee5a116100b2578063e073bb4f11610081578063f851a44011610066578063f851a440146102c8578063fbad76cb146102ef578063fc0c546a146102f757600080fd5b8063e073bb4f14610295578063eca679c3146102b557600080fd5b80637313ee5a14610221578063828fd19d14610248578063abee967c1461025b578063ddeae0331461028257600080fd5b80633ba86c44116100ee5780633ba86c44146101c35780634e71d92d146101ea578063579acacc146101f2578063669416b81461021957600080fd5b80630d890369146101205780631b3ed72214610135578063228cb7331461016f5780632b23c16e14610177575b600080fd5b61013361012e3660046111c5565b61031e565b005b61015c7f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b61015c610364565b61019e7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610166565b61015c7f000000000000000000000000000000000000000000000000000000000000000081565b610133610374565b61015c7f000000000000000000000000000000000000000000000000000000000000000081565b61015c6103fb565b61015c7f000000000000000000000000000000000000000000000000000000000000000081565b61015c6102563660046111ab565b610420565b61015c7f000000000000000000000000000000000000000000000000000000000000000081565b6101336102903660046111ab565b610431565b61015c6102a33660046111ab565b60016020526000908152604090205481565b61015c6102c33660046111ab565b6104b4565b61019e7f000000000000000000000000000000000000000000000000000000000000000081565b6101336104ed565b61019e7f000000000000000000000000000000000000000000000000000000000000000081565b61036073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168330846107f9565b5050565b600061036f336108db565b905090565b600260005414156103e6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026000556103f433610cd2565b6001600055565b336000818152600160205260408120549091610416906108db565b61036f9190611321565b600061042b826108db565b92915050565b6002600054141561049e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016103dd565b60026000556104ac81610cd2565b506001600055565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600160205260408120546104e3836108db565b61042b9190611321565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461058c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f4f6e6c79207468652061646d696e2063616e20646f207468697321000000000060448201526064016103dd565b60007f000000000000000000000000000000000000000000000000000000000000000011610616576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4e6f20636c61696d20646561646c696e65207365742e0000000000000000000060448201526064016103dd565b7f00000000000000000000000000000000000000000000000000000000000000004210156106a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f4974277320746f6f206561726c7920746f20646f20746869732e00000000000060448201526064016103dd565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a082319060240160206040518083038186803b15801561072857600080fd5b505afa15801561073c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610760919061120e565b90506107c373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000167f000000000000000000000000000000000000000000000000000000000000000083610e29565b6040518181527f146bbc9b753597a27f70129b547228bac3f0a1fd36ee128a15367d259ab427149060200160405180910390a150565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526108d59085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610e84565b50505050565b6040517f34265c4800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8281166004830152600091829182917f0000000000000000000000000000000000000000000000000000000000000000909116906334265c489060240160206040518083038186803b15801561096b57600080fd5b505afa15801561097f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109a3919061120e565b905060008111610a0f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f596f7520617265206e6f74206120706172746974696f6e65722e00000000000060448201526064016103dd565b7f00000000000000000000000000000000000000000000000000000000000000004211610a98576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f5265776172647320686173206e6f742073746172746564207965742e0000000060448201526064016103dd565b7f000000000000000000000000000000000000000000000000000000000000000091506000610ae77f000000000000000000000000000000000000000000000000000000000000000042611321565b90507f00000000000000000000000000000000000000000000000000000000000000008110610b4157610b3a7f000000000000000000000000000000000000000000000000000000000000000084611293565b9250610ba3565b7f0000000000000000000000000000000000000000000000000000000000000000610b8c827f00000000000000000000000000000000000000000000000000000000000000006112e4565b610b9691906112ab565b610ba09084611293565b92505b6000670de0b6b3a7640000610bd87f0000000000000000000000000000000000000000000000000000000000000000866112e4565b610be291906112ab565b6040517f57344e6f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152919250600091670de0b6b3a76400009184917f000000000000000000000000000000000000000000000000000000000000000016906357344e6f9060240160206040518083038186803b158015610c7b57600080fd5b505afa158015610c8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb3919061120e565b610cbd91906112e4565b610cc791906112ab565b979650505050505050565b6000610cdd826108db565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081205491925090610d119083611321565b905060008111610d7d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f596f752068617665206e6f7468696e6720746f20636c61696d2100000000000060448201526064016103dd565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600160205260409020839055610dd3907f0000000000000000000000000000000000000000000000000000000000000000168483610e29565b604080518281526020810184905273ffffffffffffffffffffffffffffffffffffffff8516917f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf7910160405180910390a2505050565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610e7f9084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401610853565b505050565b6000610ee6826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610f909092919063ffffffff16565b805190915015610e7f5780806020019051810190610f0491906111ee565b610e7f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016103dd565b6060610f9f8484600085610fa9565b90505b9392505050565b60608247101561103b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016103dd565b73ffffffffffffffffffffffffffffffffffffffff85163b6110b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016103dd565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516110e29190611226565b60006040518083038185875af1925050503d806000811461111f576040519150601f19603f3d011682016040523d82523d6000602084013e611124565b606091505b5091509150610cc78282866060831561113e575081610fa2565b82511561114e5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103dd9190611242565b803573ffffffffffffffffffffffffffffffffffffffff811681146111a657600080fd5b919050565b6000602082840312156111bc578081fd5b610fa282611182565b600080604083850312156111d7578081fd5b6111e083611182565b946020939093013593505050565b6000602082840312156111ff578081fd5b81518015158114610fa2578182fd5b60006020828403121561121f578081fd5b5051919050565b60008251611238818460208701611338565b9190910192915050565b6020815260008251806020840152611261816040850160208701611338565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600082198211156112a6576112a6611364565b500190565b6000826112df577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561131c5761131c611364565b500290565b60008282101561133357611333611364565b500390565b60005b8381101561135357818101518382015260200161133b565b838111156108d55750506000910152565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220123bc438f07092d9d350677e4d8109af289f13d9266926fb30ec8d42df37e1dc64736f6c63430008040033"
}