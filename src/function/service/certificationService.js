import Web3 from 'web3'
import moment from 'moment'
import contractAbi from '../../contract/CertificationABI.json'
import { ExistenceType } from '../../constants/ExistenceType'

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID

const PROD_CONTRACT_ADDRESS = '0x4FCcB0e465D836678BF32C66b86f0EB87C0401B5'
const DEV_CONTRACT_ADDRESS = '0x1aaFE9daAa219c43B798C0dF2909341cC37C14fb'

let web3
let contract

const buildWeb3AndContract = (env) => {
    let contractAddress = PROD_CONTRACT_ADDRESS
    let nodeUrl = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`

    if (env && env.toLocaleLowerCase() === 'goerli') {
        nodeUrl = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
        contractAddress = DEV_CONTRACT_ADDRESS
    }
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl))
    }
    contract = new web3.eth.Contract(contractAbi, contractAddress)
}

const getCertificationSize = async (address) => {
    const lowerCaseAddress = address.toLocaleLowerCase()
    console.log('getCertificationSize() address: ', lowerCaseAddress)

    if (web3 && contract) {
        try {
            const size = await contract.methods.getCertificationSize(lowerCaseAddress).call()
            console.log('getCertificationSize() size : ', size)
            return size
        } catch (error) {
            console.log('error: ', error)
            return null
        }
    } else {
        console.log('warning: web3 contract not build yet')
    }
    return 0
}

const getCertificationFromContract = async (address, timestamp) => {
    const lowerCaseAddress = address.toLocaleLowerCase()
    console.log('getCertificationFromContract() timestamp: ', timestamp, 'address:', lowerCaseAddress)
    if (web3 && contract) {
        try {
            const certification = await contract.methods.getCertificationByTimestamp(address, timestamp).call()
            console.log('getCertificationFromContract() certification : ', certification)
            const { chineseName, englishName, walletAddress, startTime, expireTime } = certification
            return {
                address: walletAddress,
                certificatedChineseName: chineseName,
                certificatedEnglishName: englishName,
                startTime,
                expireTime,
            }
        } catch (error) {
            console.log('error: ', error)
            return null
        }
    } else {
        console.log('warning: web3 contract not build yet')
    }
    return 0
}

const getCertificationKey = (timestamp) => {
    // 將timestamp都轉換成當天的0:00
    var dateObj = new Date(timestamp)
    var noTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    return noTime.getTime()
}

const getCertification = async (proofVerifyResult, verificationProof) => {
    let certification = null
    const callerAddress = verificationProof.existenceProofs[0].receipt.callerAddress
    buildWeb3AndContract(verificationProof.env)

    // If the address has no any certification, then no certification record needs to be fetch and append
    if ((await getCertificationSize(callerAddress, verificationProof.env)) <= 0) {
        return
    }

    const currentTimestamp = moment().format('x')
    const resultList = proofVerifyResult.verifyReceiptResult

    certification = await getCertificationFromContract(callerAddress, currentTimestamp)

    // If the account is currently under certification, then just use the current certification
    if (certification) {
        resultList.forEach((result) => {
            if (result.existenceType === ExistenceType.EXIST) {
                result.certification = certification
            }
        })
    } else {
        let timeCertMap = {}
        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i].existenceType === ExistenceType.EXIST) {
                let timestampByDay = getCertificationKey(resultList[i].receiptTimestamp)
                if (timeCertMap[timestampByDay] === undefined) {
                    // If the timestamp of the day does not exist its certification record, obtained it from blockchain
                    certification = await getCertificationFromContract(callerAddress, timestampByDay)
                    timeCertMap[timestampByDay] = certification
                } else {
                    // If exist, use the record (if null, indicates that there is no certification at the time)
                    certification = timeCertMap[timestampByDay]
                }
            } else {
                certification = null
            }
            resultList[i].certification = certification
        }
    }
    console.log('resultList: ', resultList)
}

export { getCertification }
