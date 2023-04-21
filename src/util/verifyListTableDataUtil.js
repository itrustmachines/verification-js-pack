import { ExistenceType } from '../constants/ExistenceType'

export const arrangeRowDataList = (proofDetailList) => {
    var rowList = []
    // each element
    // {
    //     collapse: false,
    //     dataList:[]
    // }
    var currentList = []
    var collapse = false
    proofDetailList.forEach((data, index) => {
        if (index === 0) {
            if (data.existenceType === ExistenceType.EXIST) {
                collapse = false
            } else {
                collapse = true
            }
            currentList.push(data)
        } else {
            // 若跟前一筆資料一樣，則繼續append
            if (data.existenceType === proofDetailList[index - 1].existenceType) {
                currentList.push(data)
            } else {
                // 若不一樣，則將currentList新增至rowList，並且重置currentList與collapse狀態
                rowList.push({
                    collapse: collapse,
                    dataList: currentList,
                })
                currentList = []
                currentList.push(data)
                if (data.existenceType === ExistenceType.EXIST) {
                    collapse = false
                } else {
                    collapse = true
                }
            }
        }
    })
    //都跑完之後, 檢查最後的清單剩餘項目
    rowList.push({
        collapse: collapse,
        dataList: currentList,
    })
    return rowList
}
