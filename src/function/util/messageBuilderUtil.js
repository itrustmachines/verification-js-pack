import { sha256ToHex } from './hashUtil'

const concatSigServer = (sigServer) => {
    return sigServer.r + sigServer.s + sigServer.v
}

const buildReceiptToDigestContent = (receipt) => {
    const receiptSignData = buildReceiptToSignData(receipt)
    const digestContent = receiptSignData + concatSigServer(receipt.sigServer)
    return digestContent
}

const buildReceiptToSignData = (receipt) => {
    const iv = receipt.indexValue
    const co = receipt.clearanceOrder

    var toSha256Data =
        receipt.callerAddress +
        receipt.timestamp +
        receipt.cmd +
        receipt.metadata +
        receipt.timestampSPO +
        receipt.result

    if (receipt.sigClient === null) {
        toSha256Data = toSha256Data + 'null'
    } else {
        if (receipt.sigClient.r === null) {
            toSha256Data = toSha256Data + 'null'
        } else {
            toSha256Data = toSha256Data + receipt.sigClient.r
        }

        if (receipt.sigClient.s === null) {
            toSha256Data = toSha256Data + 'null'
        } else {
            toSha256Data = toSha256Data + receipt.sigClient.s
        }

        if (receipt.sigClient.v === null) {
            toSha256Data = toSha256Data + 'null'
        } else {
            toSha256Data = toSha256Data + receipt.sigClient.v
        }
    }
    const sha256Result = sha256ToHex(toSha256Data)
    return iv + co + sha256Result
}

const buildMerkleProofToSignData = (merkleProof) => {
    var pbPairToString = ''
    if (merkleProof.pbPair === null) {
        pbPairToString = 'null'
    } else {
        for (let i = 0; i < merkleProof.pbPair.length; i++) {
            const { index, keyHash, value } = merkleProof.pbPair[i]
            pbPairToString += index + keyHash + value
        }
    }
    const result = merkleProof.slice + pbPairToString + merkleProof.clearanceOrder
    return result
}

const buildMerkleProofToConCatSignData = (merkleProof) => {
    var pbPairToString = ''
    for (let i = 0; i < merkleProof.pbPair.length; i++) {
        const { index, keyHash, value } = merkleProof.pbPair[i]
        pbPairToString += index + keyHash + value
    }
    const result =
        merkleProof.slice + pbPairToString + merkleProof.clearanceOrder + concatSigServer(merkleProof.sigServer)
    return result
}

const buildExistenceProofToSignData = (existenceProof) => {
    const { clearanceOrder, indexValue, exist, merkleProof, receipt } = existenceProof
    const receiptDigestContent = receipt === null ? 'null' : buildReceiptToDigestContent(receipt)
    const merkleProofToConCatSignData = merkleProof === null ? 'null' : buildMerkleProofToConCatSignData(merkleProof)

    const existenceProofToSignData =
        clearanceOrder + indexValue + exist + merkleProofToConCatSignData + receiptDigestContent
    return existenceProofToSignData
}

const buildClearanceRecordToSignData = (record) => {
    const { clearanceOrder, rootHash, chainHash, description, createTime, txHash } = record
    const clearanceRecordToSignData = clearanceOrder + rootHash + chainHash + description + createTime + txHash
    return clearanceRecordToSignData
}

const buildProofMessage = (proof) => {
    const existenceProofToSignData = proof.existenceProofs.reduce(
        (previous, current) => previous + buildExistenceProofToSignData(current),
        '',
    )
    const clearanceRecordToSignData = proof.clearanceRecords.reduce(
        (previous, current) => previous + buildClearanceRecordToSignData(current),
        '',
    )
    return (
        proof.version +
        proof.query +
        proof.timestamp +
        proof.contractAddress +
        proof.serverWalletAddress +
        proof.env +
        proof.nodeConnectionString +
        existenceProofToSignData +
        clearanceRecordToSignData
    )
}

const buildPbPairToString = (pbPair) => {
    const index = pbPair.index !== null ? pbPair.index : 'null'
    const keyHash = pbPair.keyHash !== null ? pbPair.keyHash : 'null'
    const value = pbPair.value !== null ? pbPair.value : 'null'

    const message = `PBPair.PBPairValue(index=${index}, keyHash=${keyHash}, value=${value})`
    console.log('buildPbPairToString() message = ', message)
    return message
}

const buildSpoSignatureToString = (signature) => {
    const r = signature.r !== null ? signature.r : 'null'
    const s = signature.s !== null ? signature.s : 'null'
    const v = signature.v !== null ? signature.v : 'null'

    const message = `SpoSignature(r=${r}, s=${s}, v=${v})`
    console.log('buildSpoSignatureToString() message = ', message)
    return message
}

const buildMerkleProofToString = (merkleProof) => {
    var message = 'MerkleProof('
    const slice = merkleProof.slice !== null ? merkleProof.slice : 'null'
    message = message.concat(`slice=${slice}, `)

    if (merkleProof.pbPair !== null) {
        message = message.concat(`pbPair=[`)

        if (merkleProof.pbPair.length === 1) {
            message = message.concat(buildPbPairToString(merkleProof.pbPair[0]))
        } else {
            var i = 1
            for (var pair of merkleProof.pbPair) {
                message = message.concat(buildPbPairToString(pair))

                if (i === merkleProof.pbPair.length) {
                    message = message.concat('')
                } else {
                    message = message.concat(', ')
                }
                i++
            }
        }
        message = message.concat(`], `)
    } else {
        message = message.concat('pbPair=null, ')
    }

    const clearanceOrder = merkleProof.clearanceOrder !== null ? merkleProof.clearanceOrder : 'null'
    message = message.concat(`clearanceOrder=${clearanceOrder}, `)

    const sigServer = merkleProof.sigServer !== null ? buildSpoSignatureToString(merkleProof.sigServer) : 'null'
    message = message.concat(`sigServer=${sigServer})`)

    console.log('buildMerkleProofToString() message = ', message)
    return message
}

const buildReceiptToString = (receipt) => {
    const id = receipt.id !== null ? receipt.id : 'null'
    const callerAddress = receipt.callerAddress !== null ? receipt.callerAddress : 'null'
    const timestamp = receipt.timestamp !== null ? receipt.timestamp : 'null'
    const cmd = receipt.cmd !== null ? receipt.cmd : 'null'
    const indexValue = receipt.indexValue !== null ? receipt.indexValue : 'null'
    const metadata = receipt.metadata !== null ? receipt.metadata : 'null'
    const clearanceOrder = receipt.clearanceOrder !== null ? receipt.clearanceOrder : 'null'
    const sigClient = receipt.sigClient !== null ? buildSpoSignatureToString(receipt.sigClient) : 'null'
    const timestampSPO = receipt.timestampSPO !== null ? receipt.timestampSPO : 'null'
    const result = receipt.result !== null ? receipt.result : 'null'
    const sigServer = receipt.sigServer !== null ? buildSpoSignatureToString(receipt.sigServer) : 'null'

    const message = `Receipt(id=${id}, callerAddress=${callerAddress}, timestamp=${timestamp}, cmd=${cmd}, indexValue=${indexValue}, metadata=${metadata}, clearanceOrder=${clearanceOrder}, sigClient=${sigClient}, timestampSPO=${timestampSPO}, result=${result}, sigServer=${sigServer})`
    console.log('buildReceiptToString() message = ', message)
    return message
}

const buildExistenceProofToString = (existenceProof) => {
    const clearanceOrder = existenceProof.clearanceOrder !== null ? existenceProof.clearanceOrder : 'null'
    const indexValue = existenceProof.indexValue !== null ? existenceProof.indexValue : 'null'
    const exist = existenceProof.exist !== null ? existenceProof.exist : 'null'
    const merkleProof =
        existenceProof.merkleProof !== null ? buildMerkleProofToString(existenceProof.merkleProof) : 'null'
    const receipt = existenceProof.receipt !== null ? buildReceiptToString(existenceProof.receipt) : 'null'

    const message = `ExistenceProof(clearanceOrder=${clearanceOrder}, indexValue=${indexValue}, exist=${exist}, merkleProof=${merkleProof}, receipt=${receipt})`
    console.log('buildExistenceProofToString() message = ', message)
    return message
}

const buildClearanceRecordToString = (clearanceRecord) => {
    const id = clearanceRecord.id !== null ? clearanceRecord.id : 'null'
    const clearanceOrder = clearanceRecord.clearanceOrder !== null ? clearanceRecord.clearanceOrder : 'null'
    const rootHash = clearanceRecord.rootHash !== null ? clearanceRecord.rootHash : 'null'
    const chainHash = clearanceRecord.chainHash !== null ? clearanceRecord.chainHash : 'null'
    const description = clearanceRecord.description !== null ? clearanceRecord.description : 'null'
    const createTime = clearanceRecord.createTime !== null ? clearanceRecord.createTime : 'null'
    const txHash = clearanceRecord.txHash !== null ? clearanceRecord.txHash : 'null'

    const message = `ClearanceRecord(id=${id}, clearanceOrder=${clearanceOrder}, rootHash=${rootHash}, chainHash=${chainHash}, description=${description}, createTime=${createTime}, txHash=${txHash})`
    console.log('buildClearanceRecordToString() message = ', message)
    return message
}

const buildProofMessageFail = (proof) => {
    var message =
        proof.version +
        proof.query +
        proof.timestamp +
        proof.contractAddress +
        proof.serverWalletAddress +
        proof.env +
        proof.nodeConnectionString
    message = message.concat('[')

    var i = 1
    for (var existenceProof of proof.existenceProofs) {
        message = message.concat(buildExistenceProofToString(existenceProof))

        if (i === proof.existenceProofs.length) {
            message = message.concat('')
        } else {
            message = message.concat(', ')
        }

        i++
    }

    message = message.concat(']')
    message = message.concat('[')
    i = 1
    for (var clearanceRecord of proof.clearanceRecords) {
        message = message.concat(buildClearanceRecordToString(clearanceRecord))

        if (i === proof.clearanceRecords.length) {
            message = message.concat('')
        } else {
            message = message.concat(', ')
        }

        i++
    }

    message = message.concat(']')
    console.log('buildProofMessageFail() message = ', message)
    return message
}

const clearanceRecordsEqual = (firstCr, secondCr) => {
    console.log('clearanceRecordsEqual(), firtsCr = ', firstCr, ' secondCr = ', secondCr)
    var result = false
    if (
        firstCr.rootHash === secondCr.rootHash &&
        firstCr.clearanceOrder === secondCr.clearanceOrder &&
        firstCr.chainHash === secondCr.chainHash
    ) {
        result = true
    }
    console.log('clearanceRecordsEqual(), result = ', result)
    return result
}

export {
    concatSigServer,
    buildReceiptToDigestContent,
    buildReceiptToSignData,
    buildMerkleProofToSignData,
    buildExistenceProofToSignData,
    buildProofMessage,
    buildProofMessageFail,
    buildClearanceRecordToSignData,
    clearanceRecordsEqual,
}
