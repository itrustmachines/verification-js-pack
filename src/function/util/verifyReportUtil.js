import web3 from 'web3'
import { VerifyVerificationProofStatus } from '../../constants/VerifyVerificationProofStatus'

const buildProofSignaturePassReport = (serverWalletAddress, sigServer, signData, proofSignaturePass) => {
    console.log(
        `buildProofSignaturePassReport() serverWalletAddress = ${serverWalletAddress}, sigServer = ${sigServer}, signData= ${signData}, proofSignaturePass = ${proofSignaturePass}`,
    )
    const report = `[Step 1] verify signature of  SPO (sigServer), \n\n\tserverWalletAddress=${serverWalletAddress}, \n\tSPOSignature R=${sigServer.r}, \n\tS=${sigServer.s}, \n\tV=${sigServer.v}, \n\tsigned data=${signData}, \n\tpass=${proofSignaturePass}\n`
    console.log('buildProofSignaturePassReport() reportSize = ' + report.length)
    return report
}

const buildVerifyLastClearanceRecordReport = (lastRecord, verifyResult) => {
    console.log(
        `buildVerifyLastClearanceRecordReport() start, lastRecord = ${lastRecord}, verifyResult = ${verifyResult}`,
    )
    const report = `[Step 2-1] verify last clearance record, \n\n\tTo find the transaction in Blockchain, transaction hash=${lastRecord.txHash}\n\n\tclearanceOrder=${lastRecord.clearanceOrder}\n\trootHash=${lastRecord.rootHash}\n\tchainHash=${lastRecord.chainHash}\n\tdescription=${lastRecord.description}\n\tpass=${verifyResult}\n\n`
    console.log('buildVerifyLastClearanceRecordReport() end, reportSize = ' + report.length)
    return report
}

const buildVerifyClearanceRecordReport = (currentRecord, concatByteArray, calculateChainHash, verifyResult) => {
    console.log(
        `buildVerifyClearanceRecordReport() start, currentRecord = ${currentRecord}, concatByteArray = ${concatByteArray}, calculateChainHash = ${calculateChainHash}, verifyResult = ${verifyResult}`,
    )
    const report = `[Step 2-2] verify clearance record, \n\n\tclearanceOrder=${
        currentRecord.clearanceOrder
    }\n\trootHash=${currentRecord.rootHash}\n\tchainHash=${currentRecord.chainHash}\n\tdescription=${
        currentRecord.description
    }\n\tconcat previous clearance record result=${web3.utils.bytesToHex(
        Uint8Array.from(concatByteArray),
    )}\n\tcalculate concat clearance record with sha3, result=${web3.utils.bytesToHex(
        Uint8Array.from(calculateChainHash),
    )}\n\tpass=${verifyResult}\n`
    console.log('buildVerifyClearanceRecordReport() end, reportSize = ' + report.length)
    return report
}

const buildVerifyExistenceSingleCODescriptionReport = (verifiedClearanceRecordInfo, existenceProofList) => {
    console.log(
        `buildVerifyExistenceSingleCODescriptionReport() start, verifiedClearanceRecordInfo=${verifiedClearanceRecordInfo}, existenceProofListSize=${existenceProofList.length}`,
    )
    var report
    if (verifiedClearanceRecordInfo !== null) {
        report = `[Step 3-1] Verify single clearance order of merkle proof in proof file, clearance order=${verifiedClearanceRecordInfo.clearanceRecord.clearanceOrder}\n`
    } else {
        report = `[Step 3-1] There's no corresponding verified clearance record info, \nverification proof may be edit!\n`
    }
    report.concat(
        `[Step 3-2] There are ${existenceProofList.length} existence proof/not existence proof in this clearance order\n`,
    )

    console.log('buildVerifyExistenceSingleCODescriptionReport() end, reportSize = ' + report.length)
    return report
}

const buildGeneralReport = (fileName, proof, verificationProofStatus) => {
    console.log(
        `buildGeneralReport() start, fileName = ${fileName}, proof = ${proof}, verificationProofStatus = ${verificationProofStatus}`,
    )
    const report = `General report of ${fileName}\nBlockchain: ${proof.env}\n# of clearance orders = ${
        proof.clearanceRecords.length
    }\n# of Merkle proof = ${proof.existenceProofs.length}\nPass = ${
        VerifyVerificationProofStatus.ALL_PASS === verificationProofStatus
    }\n`
    console.log('buildGeneralReport() end, reportStringSize = ' + report.length)
    return report
}

export {
    buildProofSignaturePassReport,
    buildVerifyLastClearanceRecordReport,
    buildVerifyClearanceRecordReport,
    buildVerifyExistenceSingleCODescriptionReport,
    buildGeneralReport,
}
