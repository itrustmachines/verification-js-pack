import { hexToBytes, sha256HexString, sha256ToHex, sha256toInt8Arr } from './hashUtil'
import { buildReceiptToDigestContent } from './messageBuilderUtil'

const getLeafNode = (index, interNodes) => {
    const sliceListSize = interNodes.length
    var leafNode
    if (index % 2 === 0 || sliceListSize === 1) {
        leafNode = interNodes[0]
    } else {
        leafNode = interNodes[1]
    }
    // console.log('getLeafNode() leafNode=', leafNode)
    return leafNode
}

const isLeafNode = (slice, pbPair) => {
    const tokens = slice.split('.')
    // console.log('isLeafNode() tokens=', tokens)
    const sliceIndex = tokens[0]
    // console.log('isLeafNode() sliceIndex=', sliceIndex)

    const interNodes = tokens.slice(1)
    // console.log('isLeafNode() interNodes=', interNodes)

    const leafNode = getLeafNode(sliceIndex, interNodes)
    console.log('leafNode=', leafNode.toString().toLowerCase())

    // const valueList = pbPair.map((pair) => {
    //     return hexToBytes(pair.value)
    // })

    // console.log('valueList=', valueList)
    // const pbPairHashValue = sha256ByteArrayToHex(valueList)

    var valueString = ''
    pbPair.map((pbPairValue) => {
        valueString += pbPairValue.value
    })

    const pbPairHashValue = sha256HexString(valueString)

    console.log('pbPairHashValue=', pbPairHashValue.toString().toLowerCase())

    return leafNode.toString().toLowerCase() === pbPairHashValue.toString().toLowerCase()
}

const arrayEqual = (arr1, arr2) => {
    // console.log('arrayEqual() arr1=', arr1, 'arr2=', arr2)
    if ((!arr1 && arr2) || (arr1 && !arr2)) {
        return false
    }

    if (arr1.length !== arr2.length) {
        return false
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false
        }
    }

    return true
}

const isReceiptInPbPair = (receipt, pbPair) => {
    const indexValueHash = sha256ToHex(receipt.indexValue)
    // console.log('isReceiptInPbPair() indexValueHash=', indexValueHash)

    const receiptDigestContent = buildReceiptToDigestContent(receipt)
    const receiptDigestValue = sha256toInt8Arr(receiptDigestContent)
    // console.log('isReceiptInPbPair() receiptDigestValue=', receiptDigestValue)

    var result = false
    for (let i = 0; i < pbPair.length; i++) {
        if (String(indexValueHash).toLowerCase() === String(pbPair[i].keyHash).toLowerCase()) {
            // console.log('found receipt location')
            result = arrayEqual(hexToBytes(pbPair[i].value), receiptDigestValue)
            break
        }
    }
    return result
}

const evalRootHashFromSlice = (sliceString) => {
    const tokens = sliceString.split('.')
    var index = Number(tokens[0])
    var treeHeight = Math.floor(tokens.length / 2)
    var pass = true

    for (let i = 1; index > 1; i += 2, index = Math.floor(index / 2), treeHeight--) {
        var parentIndex = i + 2 + ((Math.floor(index / 2) === 1 ? 0 : Math.floor(index / 2)) % 2)
        var parentDigestToHex = sha256HexString(tokens[i] + tokens[i + 1])

        if (parentDigestToHex !== tokens[parentIndex]) {
            pass = false
        }
    }

    const merkleTreeReport = {
        slice: sliceString,
        maxLevel: (tokens.length + 1) / 2 - 1,
    }
    const verifySliceReport = {
        pass: pass,
        merkleTreeReport: merkleTreeReport,
    }
    return verifySliceReport
}

const getRootHashFromSlice = (sliceString) => {
    if (!sliceString) {
        return null
    }

    const tokens = sliceString.split('.')
    var index = Number(tokens[0])
    var parentIndex = 1
    var parentDigestHex = tokens[1]

    for (let i = 1; index > 1; i += 2, index = Math.floor(index / 2)) {
        if (i === parentIndex) {
            parentDigestHex = sha256HexString(parentDigestHex + tokens[i + 1])
        } else {
            parentDigestHex = sha256HexString(tokens[i] + parentDigestHex)
        }

        parentIndex = i + 2 + ((Math.floor(index / 2) === 1 ? 0 : Math.floor(index / 2)) % 2)
    }

    return parentDigestHex
}

const isLeafNodeWithReport = (slice, pbPair) => {
    const tokens = slice.split('.')
    const sliceIndex = tokens[0]
    const interNodes = tokens.slice(1)
    const leafNode = getLeafNode(sliceIndex, interNodes)

    var valueString = ''
    pbPair.map((pbPairValue) => {
        valueString += pbPairValue.value
    })

    const pbPairHashValue = sha256HexString(valueString)
    const pass = leafNode.toString().toLowerCase() === pbPairHashValue.toString().toLowerCase()
    const report = {
        pass: pass,
        indexPosition: sliceIndex,
        pbPairHashValue: pbPairHashValue,
    }

    return report
}

export { isLeafNode, isLeafNodeWithReport, isReceiptInPbPair, evalRootHashFromSlice, getRootHashFromSlice }
