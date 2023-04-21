import { hexToBytes } from '../util/hashUtil'
import web3 from 'web3'
import { buildVerifyClearanceRecordReport, buildVerifyLastClearanceRecordReport } from '../util/verifyReportUtil'
import { clearanceRecordsEqual } from '../util/messageBuilderUtil'

const buildVerifiedClearanceRecordInfoMap_2_3_0 = (crList, latestCR, report) => {
    console.log('buildVerifiedClearanceRecordMap()_2_3_0 crList = ', crList + ', latestCR = ', latestCR)
    var verifiedClearanceRecordInfoMap = {}
    const clearanceRecordMap = buildClearanceRecordMapFilterByLatestCO(crList, latestCR)
    console.log('buildVerifiedClearanceRecordInfoMap () clearanceRecordMap = ', clearanceRecordMap)
    var pass = false
    var currentCo = latestCR.clearanceOrder
    var currentRecord = clearanceRecordMap[currentCo]

    if (clearanceRecordsEqual(currentRecord, latestCR)) {
        pass = true
    } else {
        console.log('buildVerifiedClearanceRecordMap()_2_3_0 lastCRInClearanceRecordList error')
        currentRecord = latestCR
    }

    delete clearanceRecordMap[currentCo]

    verifiedClearanceRecordInfoMap[currentCo] = { pass: pass, clearanceRecord: currentRecord }
    report.verifyLastClearanceRecordReport = buildVerifyLastClearanceRecordReport(currentRecord, pass)

    if (crList.length > 1) {
        var reportList = []
        while (Object.keys(clearanceRecordMap).length !== 0) {
            var previousCo = currentCo - 1
            const previousRecord = clearanceRecordMap[previousCo]

            if (
                currentRecord !== null &&
                previousRecord !== null &&
                currentRecord !== undefined &&
                previousRecord !== undefined
            ) {
                const verifyChainHashResult = verifyChainHash(currentRecord, previousRecord)
                reportList.push(verifyChainHashResult.report)
                pass = verifyChainHashResult.pass
            } else {
                pass = currentRecord !== null
            }
            if (currentRecord !== null) {
                delete clearanceRecordMap[currentCo]
            }
            verifiedClearanceRecordInfoMap[previousCo] = { pass: pass, clearanceRecord: previousRecord }
            currentCo = currentCo - 1
            currentRecord = previousRecord
        }
        console.log('buildVerifiedClearanceRecordMap()_2_3_0 reportListSize = ', reportList.length)
        report.verifyClearanceRecordReportList = reportList
    }

    console.log(
        'buildVerifiedClearanceRecordInfoMap()_2_3_0 verifiedClearanceRecordInfoMap = ',
        verifiedClearanceRecordInfoMap,
    )
    return verifiedClearanceRecordInfoMap
}

const verifyChainHash = (currentRecord, previousRecord) => {
    console.log('verifyChainHash() currentRecord = ', currentRecord, ', previousRecord = ', previousRecord)
    var rootHashByteArray = hexToBytes(previousRecord.rootHash)
    var clearanceOrderByteArray = web3.utils.hexToBytes(
        web3.utils.padLeft(web3.utils.numberToHex(Number(previousRecord.clearanceOrder)), 64),
    )
    var previousRecordByteArray = hexToBytes(previousRecord.chainHash)
    var concatByteArray = new Int8Array(
        rootHashByteArray.length + clearanceOrderByteArray.length + previousRecordByteArray.length,
    )
    concatByteArray.set(rootHashByteArray)
    concatByteArray.set(clearanceOrderByteArray, rootHashByteArray.length)
    concatByteArray.set(previousRecordByteArray, rootHashByteArray.length + clearanceOrderByteArray.length)
    const chainHash = web3.utils.keccak256(web3.utils.bytesToHex(Uint8Array.from(concatByteArray))).replace('0x', '')
    const pass = currentRecord.chainHash === chainHash
    const report = buildVerifyClearanceRecordReport(currentRecord, concatByteArray, hexToBytes(chainHash), pass)
    const result = {
        pass: pass,
        report: report,
    }

    console.log('verifyChainHash() end, result = ', result)
    return result
}

const buildClearanceRecordMapFilterByLatestCO = (clearanceRecordList, latestCR) => {
    console.log('buildClearanceRecordMap() clearanceRecordListSize = ' + clearanceRecordList.length)
    const clearanceRecords = clearanceRecordList.filter(
        (clearanceRecord) => clearanceRecord.clearanceOrder <= latestCR.clearanceOrder,
    )
    var clearanceRecordMap = {}

    for (const clearanceRecord of clearanceRecords) {
        var clearanceOrder = clearanceRecord.clearanceOrder
        clearanceRecordMap[Number(clearanceOrder)] = clearanceRecord
    }

    console.log('buildClearanceRecordMap() clearanceRecordMapKeySet = ' + Object.keys(clearanceRecordMap))
    return clearanceRecordMap
}

export { buildVerifiedClearanceRecordInfoMap_2_3_0 }
