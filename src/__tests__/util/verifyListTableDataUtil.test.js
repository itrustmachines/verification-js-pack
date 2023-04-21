import { arrangeRowDataList } from '../../util/verifyListTableDataUtil'

test('test_arrangeRowDataList() EENNENNNENNNNNEN', () => {
    const testData = [
        {
            name: 'proof1',
            existenceType: 'EXIST',
        },
        {
            name: 'proof2',
            existenceType: 'EXIST',
        },
        {
            name: 'proof3',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof4',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof5',
            existenceType: 'EXIST',
        },
        {
            name: 'proof6',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof7',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof8',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof9',
            existenceType: 'EXIST',
        },
        {
            name: 'proof10',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof11',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof12',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof13',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof14',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof15',
            existenceType: 'EXIST',
        },
        {
            name: 'proof16',
            existenceType: 'NOT_EXIST',
        },
    ]
    const resultList = arrangeRowDataList(testData)
    //EENNENNNENNNNNEN
    expect(resultList.length).toBe(8)
    expect(resultList[0].dataList.length).toBe(2)
    expect(resultList[1].dataList.length).toBe(2)
    expect(resultList[2].dataList.length).toBe(1)
    expect(resultList[3].dataList.length).toBe(3)
    expect(resultList[4].dataList.length).toBe(1)
    expect(resultList[5].dataList.length).toBe(5)
    expect(resultList[6].dataList.length).toBe(1)
    expect(resultList[7].dataList.length).toBe(1)
})

test('test_arrangeRowDataList() EENNENENNNEN', () => {
    const testData = [
        {
            name: 'proof1',
            existenceType: 'EXIST',
        },
        {
            name: 'proof2',
            existenceType: 'EXIST',
        },
        {
            name: 'proof3',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof4',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof5',
            existenceType: 'EXIST',
        },
        {
            name: 'proof6',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof7',
            existenceType: 'EXIST',
        },
        {
            name: 'proof8',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof9',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof10',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof11',
            existenceType: 'EXIST',
        },
        {
            name: 'proof12',
            existenceType: 'NOT_EXIST',
        },
    ]
    const resultList = arrangeRowDataList(testData)
    //EENNENENNNEN
    expect(resultList.length).toBe(8)
    expect(resultList[0].dataList.length).toBe(2)
    expect(resultList[1].dataList.length).toBe(2)
    expect(resultList[2].dataList.length).toBe(1)
    expect(resultList[3].dataList.length).toBe(1)
    expect(resultList[4].dataList.length).toBe(1)
    expect(resultList[5].dataList.length).toBe(3)
    expect(resultList[6].dataList.length).toBe(1)
    expect(resultList[7].dataList.length).toBe(1)
})

test('test_arrangeRowDataList()EENNENENEN', () => {
    const testData = [
        {
            name: 'proof1',
            existenceType: 'EXIST',
        },
        {
            name: 'proof2',
            existenceType: 'EXIST',
        },
        {
            name: 'proof3',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof4',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof5',
            existenceType: 'EXIST',
        },
        {
            name: 'proof6',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof7',
            existenceType: 'EXIST',
        },
        {
            name: 'proof8',
            existenceType: 'NOT_EXIST',
        },
        {
            name: 'proof9',
            existenceType: 'EXIST',
        },
        {
            name: 'proof10',
            existenceType: 'NOT_EXIST',
        },
    ]
    // EENNENENEN
    const resultList = arrangeRowDataList(testData)
    expect(resultList.length).toBe(8)
    expect(resultList[0].dataList.length).toBe(2)
    expect(resultList[1].dataList.length).toBe(2)
    expect(resultList[2].dataList.length).toBe(1)
    expect(resultList[3].dataList.length).toBe(1)
    expect(resultList[4].dataList.length).toBe(1)
    expect(resultList[5].dataList.length).toBe(1)
    expect(resultList[6].dataList.length).toBe(1)
    expect(resultList[7].dataList.length).toBe(1)
})

import { proofResult2 } from '../resource/testProofResult'

test('test_arrangeRowDataList() EEENEENNNNEN', () => {
    const testData = proofResult2.proofDetailList
    const resultList = arrangeRowDataList(testData)
    // EEENEENNNNEN
    expect(resultList.length).toBe(6)
    expect(resultList[0].dataList.length).toBe(3)
    expect(resultList[1].dataList.length).toBe(1)
    expect(resultList[2].dataList.length).toBe(2)
    expect(resultList[3].dataList.length).toBe(4)
    expect(resultList[4].dataList.length).toBe(1)
    expect(resultList[5].dataList.length).toBe(1)
})
