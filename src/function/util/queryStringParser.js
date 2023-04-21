import { QueryType } from '../../constants/QueryType'
const parse = (queryString) => {
    var query = {}

    if (queryString.startsWith('Locators')) {
        query.type = QueryType.LOCATOR
    } else {
        if (queryString.includes(',FromTS=') && queryString.includes(',ToTS=')) {
            query.type = QueryType.TIMESTAMP
        } else if (queryString.includes(',FromSN=') && queryString.includes(',ToSN=')) {
            query.type = QueryType.CLEARANCE_ORDER_AND_SN
        } else {
            query.type = QueryType.CLEARANCE_ORDER
        }

        const keyValuePairs = queryString.split(',')

        for (const pair of keyValuePairs) {
            const splitString = pair.split('=')

            if (splitString[0] === 'IV_Key') {
                query.indexValueKey = splitString[1]
            } else if (splitString[0] === 'FromTS') {
                query.fromTS = Number(splitString[1])
            } else if (splitString[0] === 'ToTS') {
                query.toTS = Number(splitString[1])
            } else if (splitString[0] === 'FromCO') {
                query.fromCO = Number(splitString[1])
            } else if (splitString[0] === 'ToCO') {
                query.toCO = Number(splitString[1])
            } else if (splitString[0] === 'FromSN') {
                query.fromSN = Number(splitString[1])
            } else if (splitString[0] === 'ToSN') {
                query.toSN = Number(splitString[1])
            }
        }
    }

    console.log('parse () query = ' + query)
    return query
}

export { parse }
