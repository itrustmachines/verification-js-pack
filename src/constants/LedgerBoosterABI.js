export default [
    {
        constant: false,
        inputs: [
            {
                name: '_indexValue',
                type: 'string',
            },
            {
                name: '_clearanceOrder',
                type: 'string',
            },
            {
                name: '_secondPart',
                type: 'string',
            },
            {
                name: '_receiptSignature',
                type: 'bytes32[]',
            },
            {
                name: '_merkleProofClearanceOrderAndIndexValue',
                type: 'bytes32[]',
            },
            {
                name: '_slice',
                type: 'bytes32[]',
            },
            {
                name: '_pbPairIndex',
                type: 'bytes8[]',
            },
            {
                name: '_pbPairKey',
                type: 'bytes32[]',
            },
            {
                name: '_pbPairValue',
                type: 'bytes32[]',
            },
            {
                name: '_merkleProofSignature',
                type: 'bytes32[]',
            },
        ],
        name: 'objection',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'spoServerWalletAddress',
        outputs: [
            {
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'maxTxCount',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_clearanceOrder',
                type: 'uint256',
            },
            {
                name: '_rootHash',
                type: 'bytes32',
            },
            {
                name: '_txCount',
                type: 'uint256',
            },
            {
                name: '_description',
                type: 'string',
            },
        ],
        name: 'writeClearanceRecord',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_indexValue',
                type: 'string',
            },
            {
                name: '_clearanceOrder',
                type: 'string',
            },
            {
                name: '_secondPart',
                type: 'string',
            },
        ],
        name: 'getReceiptDigest',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'clearanceOrder',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'currentTxCount',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        name: 'clearanceRecords',
        outputs: [
            {
                name: 'clearanceOrder',
                type: 'uint256',
            },
            {
                name: 'rootHash',
                type: 'bytes32',
            },
            {
                name: 'createTime',
                type: 'uint256',
            },
            {
                name: 'chainHash',
                type: 'bytes32',
            },
            {
                name: 'description',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'itmWalletAddress',
        outputs: [
            {
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        name: 'objectionRecords',
        outputs: [
            {
                name: 'id',
                type: 'uint256',
            },
            {
                name: 'objectionStatus',
                type: 'uint8',
            },
            {
                name: 'clearanceOrder',
                type: 'uint256',
            },
            {
                name: 'indexValue',
                type: 'string',
            },
            {
                name: 'createTime',
                type: 'uint256',
            },
            {
                name: 'sender',
                type: 'address',
            },
            {
                name: 'receiptHash',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_spoServerWalletAddress',
                type: 'address',
            },
        ],
        name: 'setSpoServerWalletAddress',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_addTxCount',
                type: 'uint256',
            },
        ],
        name: 'addMaxTxCount',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                name: '_itmWalletAddress',
                type: 'address',
            },
            {
                name: '_spoServerWalletAddress',
                type: 'address',
            },
            {
                name: '_maxTxCount',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: 'clearanceOrder',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'rootHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                name: 'createTime',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'chainHash',
                type: 'bytes32',
            },
            {
                indexed: false,
                name: 'description',
                type: 'string',
            },
        ],
        name: 'NewClearanceRecord',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: 'maxTxCount',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'currentTxCount',
                type: 'uint256',
            },
        ],
        name: 'NewMaxTxCount',
        type: 'event',
    },
]
