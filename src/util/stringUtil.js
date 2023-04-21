import moment from 'moment'
import { ExistenceType } from '../constants/ExistenceType'

const renderCertificatedName = (certification) => {
    const { certificatedChineseName, certificatedEnglishName } = certification
    if (
        certificatedChineseName &&
        certificatedChineseName !== '' &&
        certificatedEnglishName &&
        certificatedEnglishName !== ''
    ) {
        return `${certificatedChineseName} / ${certificatedEnglishName}`
    } else if (certificatedChineseName && certificatedChineseName !== '') {
        return certificatedChineseName
    } else if (certificatedEnglishName && certificatedEnglishName !== '') {
        return certificatedEnglishName
    }
}

const getTxHashBaseUrl = (evmEnv) => {
    let txHashBaseUrl = ''
    if (evmEnv === 'RINKEBY' || evmEnv === 'KOVAN' || evmEnv === 'GOERLI' || evmEnv === 'ROPSTEN') {
        txHashBaseUrl = `https://${evmEnv}.etherscan.io/tx`
    } else if (evmEnv === 'MAINNET') {
        txHashBaseUrl = `https://etherscan.io/tx`
    } else if (evmEnv === 'AZURE_QUORUM') {
        txHashBaseUrl = `http://itm-blockchain-explorer.itm.monster/transactions`
    }

    return txHashBaseUrl
}

const renderTime = (value) => {
    if (value) {
        return moment(value).format('YYYY/MM/DD HH:mm:ss')
    } else {
        return 'N/A'
    }
}

const getContractAddressUrl = (evmEnv, contractAddress) => {
    let url = ''
    if (evmEnv === 'RINKEBY' || evmEnv === 'KOVAN' || evmEnv === 'GOERLI' || evmEnv === 'ROPSTEN') {
        url = `https://${evmEnv}.etherscan.io/address/${contractAddress}`
    } else if (evmEnv === 'MAINNET') {
        url = `https://etherscan.io/address/${contractAddress}`
    } else if (evmEnv === 'AZURE_QUORUM') {
        url = `http://itm-blockchain-explorer.itm.monster/contracts/${contractAddress}`
    }
    return url
}

const renderExistence = (existenceType) => {
    if (existenceType === ExistenceType.EXIST) {
        return 'O'
    } else if (existenceType === ExistenceType.NA) {
        return 'N/A'
    } else if (existenceType === ExistenceType.NOT_EXIST) {
        return 'X'
    }
}

const renderCmd = (cmd) => {
    if (cmd) {
        const slice = cmd.slice(1).slice(0, -1)
        const result = `{\n\xa0 ${slice.split(',').join(',\n\xa0\xa0')} \n}`
        return result
    } else {
        return 'N/A'
    }
}

const getSn = (indexValue) => {
    return Number(indexValue.slice(indexValue.lastIndexOf('_R') + 2))
}

const renderAttesterAddress = (data) => {
    const { attesterAddress, cmd } = data
    if (attesterAddress && attesterAddress !== '') {
        return attesterAddress
    } else if (cmd && cmd !== '') {
        return JSON.parse(cmd).callerAddress
    } else {
        return null
    }
}

const isEmptyString = (value) => {
    return !value || value === ''
}

const isDuringTime = (curTimestamp, startTimestamp, endTimestamp) => {
    if (curTimestamp >= startTimestamp && curTimestamp <= endTimestamp) {
        return true
    }
    return false
}

const toHumanReadableFileSize = (size) => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

export {
    renderCertificatedName,
    getTxHashBaseUrl,
    renderTime,
    getContractAddressUrl,
    renderExistence,
    renderCmd,
    getSn,
    renderAttesterAddress,
    isEmptyString,
    isDuringTime,
    toHumanReadableFileSize,
}
