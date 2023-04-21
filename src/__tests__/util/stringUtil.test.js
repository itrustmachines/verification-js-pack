import {
    renderCertificatedName,
    getTxHashBaseUrl,
    renderTime,
    getContractAddressUrl,
    renderExistence,
    renderCmd,
    getSn,
    renderAttesterAddress,
    isEmptyString,
} from '../../util/stringUtil'

describe('renderCertificatedName()', () => {
    test('should return "chinese name / english name"', () => {
        const certification = {
            address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
            certificatedChineseName: '吳奕萱',
            certificatedEnglishName: 'Olive Wu',
        }

        const result = renderCertificatedName(certification)

        expect(result).toBe('吳奕萱 / Olive Wu')
    })

    test('should return only chinese name', () => {
        const certification = {
            address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
            certificatedChineseName: '吳奕萱',
            certificatedEnglishName: '',
        }

        const result = renderCertificatedName(certification)

        expect(result).toBe('吳奕萱')
    })

    test('should return only english name', () => {
        const certification = {
            address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
            certificatedChineseName: '',
            certificatedEnglishName: 'Olive Wu',
        }

        const result = renderCertificatedName(certification)

        expect(result).toBe('Olive Wu')
    })
})

describe('getTxHashBaseUrl()', () => {
    test('should return tx hash base url on Ethereum Rinkeby testnet,', () => {
        const evmEnv = 'RINKEBY'
        const result = getTxHashBaseUrl(evmEnv)
        expect(result).toBe('https://RINKEBY.etherscan.io/tx')
    })

    test('should return tx hash base url on Ethereum Kovan testnet', () => {
        const evmEnv = 'KOVAN'
        const result = getTxHashBaseUrl(evmEnv)
        expect(result).toBe('https://KOVAN.etherscan.io/tx')
    })

    test('should return tx hash base url on Ethereum Goerli testnet', () => {
        const evmEnv = 'GOERLI'
        const result = getTxHashBaseUrl(evmEnv)
        expect(result).toBe('https://GOERLI.etherscan.io/tx')
    })

    test('should return tx hash base url on Ethereum Ropsten testnet', () => {
        const evmEnv = 'ROPSTEN'
        const result = getTxHashBaseUrl(evmEnv)
        expect(result).toBe('https://ROPSTEN.etherscan.io/tx')
    })

    test('should return tx hash base url on Ethereum mainnet', () => {
        const evmEnv = 'MAINNET'
        const result = getTxHashBaseUrl(evmEnv)
        expect(result).toBe('https://etherscan.io/tx')
    })
})

describe('renderTime()', () => {
    test('should return specific formatted time', () => {
        const timestamp1 = 1672731460729
        const formattedTime1 = renderTime(timestamp1)
        expect(formattedTime1).toBe('2023/01/03 15:37:40')

        const timestamp2 = 1666055024283
        const formattedTime2 = renderTime(timestamp2)
        expect(formattedTime2).toBe('2022/10/18 09:03:44')
    })

    test('should return "N/A" if value is empty or null', () => {
        const nullTimestamp = null
        const result1 = renderTime(nullTimestamp)
        expect(result1).toBe('N/A')

        const emptyTimestamp = ''
        const result2 = renderTime(emptyTimestamp)
        expect(result2).toBe('N/A')
    })
})

describe('getContractAddressUrl()', () => {
    test('should return contract address url on Ethereum Rinkeby testnet', () => {
        const evmEnv = 'RINKEBY'
        const contractAddress = '0x483410b15Eca4A22fC122d34840F0498e624fA43'
        const result = getContractAddressUrl(evmEnv, contractAddress)
        expect(result).toBe('https://RINKEBY.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43')
    })

    test('should return contract address url on Ethereum Kovan testnet', () => {
        const evmEnv = 'KOVAN'
        const contractAddress = '0x483410b15Eca4A22fC122d34840F0498e624fA43'
        const result = getContractAddressUrl(evmEnv, contractAddress)
        expect(result).toBe('https://KOVAN.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43')
    })

    test('should return contract address url on Ethereum Goerli testnet', () => {
        const evmEnv = 'GOERLI'
        const contractAddress = '0x483410b15Eca4A22fC122d34840F0498e624fA43'
        const result = getContractAddressUrl(evmEnv, contractAddress)
        expect(result).toBe('https://GOERLI.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43')
    })

    test('should return contract address url on Ethereum Ropsten testnet', () => {
        const evmEnv = 'ROPSTEN'
        const contractAddress = '0x483410b15Eca4A22fC122d34840F0498e624fA43'
        const result = getContractAddressUrl(evmEnv, contractAddress)
        expect(result).toBe('https://ROPSTEN.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43')
    })

    test('should return contract address url on Ethereum mainnet', () => {
        const evmEnv = 'MAINNET'
        const contractAddress = '0xdea7119c372B33F62B00D430E26b9f4383FcBfBD'
        const result = getContractAddressUrl(evmEnv, contractAddress)
        expect(result).toBe('https://etherscan.io/address/0xdea7119c372B33F62B00D430E26b9f4383FcBfBD')
    })
})

describe('renderExistence()', () => {
    test('should retrn "O" if existenceType is "EXIST"', () => {
        const existenceType = 'EXIST'
        const result = renderExistence(existenceType)
        expect(result).toBe('O')
    })

    test('should retrn "X" if existenceType is "NOT_EXIST"', () => {
        const existenceType = 'NOT_EXIST'
        const result = renderExistence(existenceType)
        expect(result).toBe('X')
    })

    test('should retrn "N/A" if existenceType is "NA"', () => {
        const existenceType = 'NA'
        const result = renderExistence(existenceType)
        expect(result).toBe('N/A')
    })
})

describe('renderCmd()', () => {
    test('should return specific cmd format', () => {
        const cmd =
            '{"fileName":"20221016_211245.jpg","fileHash":"bf0dcfe2c6a98bbeaf33dca502fc0f0406d5372ee948ef133afa8df3803a4da7","description":"","timestamp":1666144525236,"callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd"}'
        const result = renderCmd(cmd)
        const expected =
            '{\n  "fileName":"20221016_211245.jpg",\n  "fileHash":"bf0dcfe2c6a98bbeaf33dca502fc0f0406d5372ee948ef133afa8df3803a4da7",\n  "description":"",\n  "timestamp":1666144525236,\n  "callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd" \n}'
        expect(result).toStrictEqual(expected)
    })

    test('should return "N/A" if cmd is null or empty', () => {
        const nullCmd = null
        const result1 = renderCmd(nullCmd)
        expect(result1).toBe('N/A')

        const emptyCmd = null
        const result2 = renderCmd(emptyCmd)
        expect(result2).toBe('N/A')
    })
})

describe('getSn()', () => {
    test('should return specific serial number', () => {
        const indexValue1 = '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0'
        const result1 = getSn(indexValue1)
        expect(result1).toBe(0)

        const indexValue2 = '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R2'
        const result2 = getSn(indexValue2)
        expect(result2).toBe(2)
    })
})

describe('renderAttesterAddress()', () => {
    test('should return attester address from cmd if value is null or empty', () => {
        const data = {
            indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
            clearanceOrder: 102,
            ledgerInputTimestamp: 1666055024283,
            receiptTimestamp: 1666055027487,
            merkleProofRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
            contractRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
            existenceType: 'EXIST',
            proofExistStatus: 'PASS',
            cmd:
                '{"fileName":"DSC_0077.JPG","fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540","description":"","timestamp":1666055024283,"callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd"}',
            pass: true,
            txHash: '0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
            certification: null,
        }

        const result = renderAttesterAddress(data)
        expect(result).toBe('0xdea7119c372b33f62b00d430e26b9f4383fcbfbd')
    })
})

describe('isEmptyString()', () => {
    test('should return true if value is empty or null', () => {
        const emptyString = ''
        const nullString = null

        const result1 = isEmptyString(emptyString)
        expect(result1).toBeTruthy()

        const result2 = isEmptyString(nullString)
        expect(result2).toBeTruthy()
    })

    test('should return false if it has value', () => {
        const string = 'hi'

        const result = isEmptyString(string)
        expect(result).toBeFalsy()
    })
})
