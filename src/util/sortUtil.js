import { getSn } from './stringUtil'

const proofDetailSortAscFunction = (value1, value2) => {
    let result
    result = value1.clearanceOrder - value2.clearanceOrder
    if (result !== 0) {
        return result
    }

    const sn1 = getSn(value1.indexValue)
    const sn2 = getSn(value2.indexValue)
    return sn1 - sn2
}

const proofDetailSortDescFunction = (value1, value2) => {
    let result
    result = value2.clearanceOrder - value1.clearanceOrder
    if (result !== 0) {
        return result
    }

    const sn1 = getSn(value1.indexValue)
    const sn2 = getSn(value2.indexValue)
    return sn2 - sn1
}

export { proofDetailSortAscFunction, proofDetailSortDescFunction }
