export default {
"abi":[
{"inputs":[{"internalType":"uint256","name":"maximumTotalLock_","type":"uint256"},{"internalType":"uint256","name":"minimumLockTime_","type":"uint256"},{"internalType":"uint256","name":"startOfEntryPeriod_","type":"uint256"},{"internalType":"uint256","name":"endOfEntryPeriod_","type":"uint256"},{"internalType":"uint256","name":"perAddressCap_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"heldLongEnough","type":"bool"}],"name":"Withdrawal","type":"event"},
{"inputs":[],"name":"endOfEntryPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCredit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"lock","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"maximumTotalLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"minimumLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"perAddressCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"readyToWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"releaseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"startOfEntryPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"totalLocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"bool","name":"allowWithdrawalBeforeRelease","type":"bool"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"withdrawn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}
],
"bytecode":"61012060405234801561001157600080fd5b50604051610e9b380380610e9b83398101604081905261003091610050565b600160005560809490945260a09290925260c05260e0526101005261008f565b600080600080600060a08688031215610067578081fd5b5050835160208501516040860151606087015160809097015192989197509594509092509050565b60805160a05160c05160e05161010051610da56100f66000396000818161018d015261095a01526000818161011e01526107ca0152600081816102aa01526107400152600081816102de0152610af301526000818161027601526109eb0152610da56000f3fe6080604052600436106100d25760003560e01c80636ef610921161007f578063cbc2efbe11610059578063cbc2efbe14610264578063e76a5de014610298578063ed6d0c5b146102cc578063f83d08ba1461030057600080fd5b80636ef61092146101e557806395bc3bd014610215578063a810a54c1461024257600080fd5b806347dd5172116100b057806347dd51721461017b57806356891412146101af57806357344e6f146101c557600080fd5b80630a469e7a146100d7578063302ef3f31461010c57806334265c481461014e575b600080fd5b3480156100e357600080fd5b506100f76100f2366004610c7d565b610308565b60405190151581526020015b60405180910390f35b34801561011857600080fd5b506101407f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610103565b34801561015a57600080fd5b50610140610169366004610c7d565b60036020526000908152604090205481565b34801561018757600080fd5b506101407f000000000000000000000000000000000000000000000000000000000000000081565b3480156101bb57600080fd5b5061014060015481565b3480156101d157600080fd5b506101406101e0366004610c7d565b610399565b3480156101f157600080fd5b506100f7610200366004610c7d565b60046020526000908152604090205460ff1681565b34801561022157600080fd5b50610140610230366004610c7d565b60026020526000908152604090205481565b34801561024e57600080fd5b5061026261025d366004610cb8565b6103f7565b005b34801561027057600080fd5b506101407f000000000000000000000000000000000000000000000000000000000000000081565b3480156102a457600080fd5b506101407f000000000000000000000000000000000000000000000000000000000000000081565b3480156102d857600080fd5b506101407f000000000000000000000000000000000000000000000000000000000000000081565b6102626106cb565b73ffffffffffffffffffffffffffffffffffffffff811660009081526002602052604081205415801590610361575073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260409020544210155b8015610393575073ffffffffffffffffffffffffffffffffffffffff821660009081526004602052604090205460ff16155b92915050565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600360205260408120544210156103ce57506000919050565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205490565b60026000541415610469576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b600260009081553381526004602052604090205460ff1615801561049b57503360009081526002602052604090205415155b610501576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4e6f2065746865727320617661696c61626c6520746f2077697468647261772e6044820152606401610460565b3360009081526002602090815260408083205460039092529091205442101561063257816105b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f596f7572206574686572732077657265206e6f74206c6f636b6564206c6f6e6760448201527f20656e6f756768210000000000000000000000000000000000000000000000006064820152608401610460565b33600090815260026020908152604080832083905560039091528120819055600180548392906105e2908490610d29565b909155506105f290503382610b6e565b604080518281526000602082015233917f06e0c61e7e9f4912ee1f3ce060b59207b98f9a232d711462af3166aeeed1250a910160405180910390a26106c2565b33600081815260046020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790556106749082610b6e565b336000818152600260209081526040918290205482519081526001918101919091527f06e0c61e7e9f4912ee1f3ce060b59207b98f9a232d711462af3166aeeed1250a910160405180910390a25b50506001600055565b60026000541415610738576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610460565b6002600055347f00000000000000000000000000000000000000000000000000000000000000004210156107c8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f4974277320746f6f206561726c7920746f20646f2074686973210000000000006044820152606401610460565b7f00000000000000000000000000000000000000000000000000000000000000004210610851576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f536f7272792c20796f752061746520746f6f206c6174652100000000000000006044820152606401610460565b33600090815260026020526040902054156108ee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f596f75206861766520616c72656164792070617274696369706174656420696e60448201527f20746869732e00000000000000000000000000000000000000000000000000006064820152608401610460565b60008111610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f596f752063616e6e6f74206c6f636b206e6f7468696e672100000000000000006044820152606401610460565b7f00000000000000000000000000000000000000000000000000000000000000008111156109e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f596f752063616e6e6f74206c6f636b206f76657220746865206c696d697421006044820152606401610460565b600154610a0f907f0000000000000000000000000000000000000000000000000000000000000000610d29565b811115610ac4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604760248201527f54686973206465706f73697420776f756c64206361757365206f757220746f7460448201527f616c206c6f636b656420616d6f756e7420746f2065786365656420746865206d60648201527f6178696d756d2e00000000000000000000000000000000000000000000000000608482015260a401610460565b33600090815260026020526040812082905560018054839290610ae8908490610d11565b90915550610b1890507f000000000000000000000000000000000000000000000000000000000000000042610d11565b33600081815260036020526040908190209290925590517fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c90610b5e9084815260200190565b60405180910390a2506001600055565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051610ba59190610cd8565b60006040518083038185875af1925050503d8060008114610be2576040519150601f19603f3d011682016040523d82523d6000602084013e610be7565b606091505b5050905080610c78576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610460565b505050565b600060208284031215610c8e578081fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610cb1578182fd5b9392505050565b600060208284031215610cc9578081fd5b81358015158114610cb1578182fd5b60008251815b81811015610cf85760208186018101518583015201610cde565b81811115610d065782828501525b509190910192915050565b60008219821115610d2457610d24610d40565b500190565b600082821015610d3b57610d3b610d40565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220d7246743a80fbbba5b2260eee4fb6ef67a0ecfffcc3249f9cf2a36774cca5ea564736f6c63430008040033"
}