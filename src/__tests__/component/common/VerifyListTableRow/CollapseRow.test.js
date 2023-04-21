import React from 'react'
import CollapseRow from '../../../../component/common/VerifyListTableRow/CollapseRow'
import { render, fireEvent } from '../../../test.utils'

const props = {
    dataArr: [
        {
            indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R12',
            clearanceOrder: 217,
            ledgerInputTimestamp: null,
            receiptTimestamp: null,
            merkleProofRootHash: '76018399129104a9f55eb73fe360b475f3b1e75d8a63f34b71adb570462100ae',
            contractRootHash: '76018399129104a9f55eb73fe360b475f3b1e75d8a63f34b71adb570462100ae',
            existenceType: 'NOT_EXIST',
            proofExistStatus: 'PASS',
            pass: true,
            txHash: '0x95ebe71d1362b4c479921bd080ffc6b60ef3f2fc4056ae38712afa8ce18ffa10',
            certification: {
                address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
                certificatedChineseName: '吳奕萱',
                certificatedEnglishName: 'Olive Wu',
            },
        },
    ],
    renderMoreInfo: jest.fn(),
    renderClearanceOrder: jest.fn(),
    renderShortIndexValue: jest.fn(),
}

describe('CollapseRow', () => {
    describe('collapse button', () => {
        test('should show specific title and icon when clicking button to expand and collapse rows', () => {
            const { getByRole } = render(<CollapseRow {...props} />)
            expect(getByRole('button')).toHaveTextContent(/Show hidden verify data hint/i)
            // TODO update the test with mui v5
            // expect(getByRole('button')).toContainElement(getByTestId('UnfoldMoreIcon'))

            fireEvent.click(getByRole('button'))

            expect(getByRole('button')).toHaveTextContent(/Hide verify data hint/i)
            // expect(getByRole('button')).toContainElement(getByTestId('UnfoldLessIcon'))
        })

        test('should expand/collapse rows by clicking button', () => {
            const { queryByText, getByRole } = render(<CollapseRow {...props} />)
            expect(queryByText(/End of record proof/i)).not.toBeInTheDocument()

            fireEvent.click(getByRole('button'))

            expect(queryByText(/End of record proof/i)).toBeInTheDocument()
        })
    })

    describe('last table cell', () => {
        test('should render dynamic border bottom style', () => {
            const customProps = { ...props, hideBottomBorder: true }
            const { getAllByRole, getByRole } = render(<CollapseRow {...customProps} />)
            expect(getAllByRole('cell')[0]).toHaveStyle('borderBottom: none')

            fireEvent.click(getByRole('button'))

            expect(getAllByRole('cell')[0]).toHaveStyle('borderBottom: 1px solid ${theme.palette.grey[300]}')
        })
    })
})
