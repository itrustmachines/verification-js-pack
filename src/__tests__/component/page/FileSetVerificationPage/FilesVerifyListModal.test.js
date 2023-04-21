import React from 'react'
import { fireEvent, render, within } from '../../../test.utils'
import FilesVerifyListModal from '../../../../component/page/FileSetVerification/FilesVerifyListModal'
import { detailData } from '../../../resource/fileSetVerificationDetailData'

const props = {
    verifyFileDetailList: detailData.verifyFileNameAndHashDetailList,
    modalOpen: true,
    handleVerifyListModalClose: jest.fn(),
    handleMoreInfoOpen: jest.fn(),
}

describe('FilesVerifyListModal', () => {
    describe('render elements', () => {
        test('should render title and close button', () => {
            const { getByText, getByRole } = render(<FilesVerifyListModal {...props} />)
            expect(getByText(/Files Verify List/i)).toBeInTheDocument()
            expect(getByRole('button', { name: 'close-modal' })).toBeInTheDocument()
        })

        test('should render a table with 7 rows', () => {
            const { getByRole } = render(<FilesVerifyListModal {...props} />)
            expect(within(getByRole('table')).getAllByRole('row')).toHaveLength(7)
        })

        test('should render correct titles on header row', () => {
            const { getByRole } = render(<FilesVerifyListModal {...props} />)
            const headers = within(getByRole('table')).getAllByRole('columnheader')

            expect(headers).toHaveLength(4)
            expect(headers[0]).toHaveTextContent(/File Name/i)
            expect(headers[1]).toHaveTextContent(/File Hash/i)
            expect(headers[2]).toHaveTextContent(/Status/i)
            expect(headers[3]).toHaveTextContent(/More Info/i)
        })
    })

    describe('close files verify list modal event', () => {
        test('should trigger close event by clicking close button', () => {
            const { getByRole } = render(<FilesVerifyListModal {...props} />)
            fireEvent.click(getByRole('button', { name: 'close-modal' }))
            expect(props.handleVerifyListModalClose).toHaveBeenCalledTimes(1)
        })

        test('should trigger close event by clicking backdrop', () => {
            const { getByRole } = render(<FilesVerifyListModal {...props} />)
            fireEvent.click(getByRole('presentation').firstChild)
            expect(props.handleVerifyListModalClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 1', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0053.JPG')
            expect(cells[1]).toHaveTextContent('528bbbd4098b7f17c811fbb5c01c04c23e543dd67d1d238f3a8a3731fc6c8626')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 2', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0054.JPG')
            expect(cells[1]).toHaveTextContent('43f9275d381560466015a2d17792202b1cccf40dd47ea004aab7537ca1c2a8d2')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 3', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[3]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0055.JPG')
            expect(cells[1]).toHaveTextContent('77b5cc36ef1307d4177ee5a2756334e191e21b5066400b062662ab29fb159f58')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[3]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 4', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[4]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0056.JPG')
            expect(cells[1]).toHaveTextContent('678304def850d98b93dbd02470146b99a7c4e9447d5883725cbcbb4096d0afc8')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[4]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 5', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[5]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0057.JPG')
            expect(cells[1]).toHaveTextContent('cc3690b9ac965f8c14a396da0344e5ea39b7eb0735eae6e1e759e271a76be20b')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[5]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 6', () => {
        test('should render specific result text', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[6]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('DSC_0058.JPG')
            expect(cells[1]).toHaveTextContent('7603ca3461366513fd1e9aa8b073d7799793910972544554182ea4158b93029b')
            // TODO update in MUI v5
            // expect(cells[2]).toHaveTextContent(getByTestId('CheckIcon'))
            // expect(cells[3]).toHaveTextContent(getByTestId('SearchIcon'))
        })

        test('should trigger more info modal open event by clicking search button', () => {
            const { getAllByRole } = render(<FilesVerifyListModal {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[6]).getAllByRole('cell')

            fireEvent.click(within(cells[3]).getByRole('button'))
            expect(props.handleMoreInfoOpen).toHaveBeenCalledTimes(1)
        })
    })
})
