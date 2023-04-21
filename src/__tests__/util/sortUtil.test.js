import { proofDetailSortAscFunction, proofDetailSortDescFunction } from '../../util/sortUtil'

describe('proofDetailSortAscFunction()', () => {
    test('should return ascending sorting', () => {
        const proofDetailList = [
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 102,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
                clearanceOrder: 102,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 103,
            },
        ]
        const result = proofDetailList.sort(proofDetailSortAscFunction)

        const expected = [
            {
                clearanceOrder: 102,
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
            },
            {
                clearanceOrder: 102,
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
            },
            {
                clearanceOrder: 103,
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
            },
        ]

        expect(result).toStrictEqual(expected)
    })
})

describe('proofDetailSortDescFunction()', () => {
    test('should return descending sorting', () => {
        const proofDetailList = [
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 102,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
                clearanceOrder: 102,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 118,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 119,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
                clearanceOrder: 119,
            },
        ]
        const result = proofDetailList.sort(proofDetailSortDescFunction)

        const expected = [
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
                clearanceOrder: 119,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 119,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 118,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R1',
                clearanceOrder: 102,
            },
            {
                indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
                clearanceOrder: 102,
            },
        ]

        expect(result).toStrictEqual(expected)
    })
})
