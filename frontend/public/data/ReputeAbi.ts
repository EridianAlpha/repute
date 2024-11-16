export const abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
        ],
        name: "computeAnswerAndBounds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "registerOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "registerProject",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timestampStart",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timestampReveal",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timestampFinalize",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timestampEnd",
                type: "uint256",
            },
        ],
        name: "registerVote",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "revealedAnswer",
                type: "uint256",
            },
        ],
        name: "revealVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
        ],
        name: "settleVoteResults",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "hashedAnswer",
                type: "bytes",
            },
        ],
        name: "submitVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "oracle",
                type: "address",
            },
            {
                internalType: "bool",
                name: "blacklistOracle",
                type: "bool",
            },
        ],
        name: "updateOracleBlacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "blacklistedOracles",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "ecrecovery",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "oracle",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "revealedAnswer",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "ecverifyData",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "projectId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteId",
                type: "uint256",
            },
        ],
        name: "getResults",
        outputs: [
            {
                internalType: "uint256",
                name: "answer",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextOracleId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextProjectId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextVoteId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "oracleCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "oracleMap",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "volumeWon",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "volumeLost",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "volumePending",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "projectCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "projectMap",
        outputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenBalance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "voteCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "totalPaidOut",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "totalRugged",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "recoverSigner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "message",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "sig",
                type: "bytes",
            },
        ],
        name: "recoverStringFromRaw",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "totalVoteCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]
