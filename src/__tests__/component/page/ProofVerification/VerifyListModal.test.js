import React from 'react'
import { fireEvent, render, screen, within } from '../../../test.utils'
import VerifyListModal from '../../../../component/page/ProofVerification/VerifyListModal'
import { verifySuccessData as detailData } from '../../../resource/proofVerificationDetailData'

const props = {
    detailData,
    modalOpen: true,
    handleMoreInfoModalOpen: jest.fn(),
    handleVerifyListModalClose: jest.fn(),
}

describe('VerifyListModal', () => {
    describe('render elements', () => {
        test('should render title and close button', () => {
            const { getByText, getByRole } = render(<VerifyListModal {...props} />)
            expect(getByText(/Blockchain Verify List/i)).toBeInTheDocument()
            expect(getByRole('button', { name: 'close-modal' })).toBeInTheDocument()
        })

        test('should render modal', async () => {
            const { getByRole } = render(<VerifyListModal {...props} />)
            expect(getByRole('presentation')).toBeInTheDocument()
        })

        test('should render table with 9 rows', () => {
            render(<VerifyListModal {...props} />)
            const table = screen.getByRole('table')
            const rows = within(table).getAllByRole('row')
            expect(table).toBeInTheDocument()
            expect(rows).toHaveLength(9)
        })

        test('should render titles on header row', () => {
            render(<VerifyListModal {...props} />)
            const rows = within(screen.getByRole('table')).getAllByRole('row')
            const headers = within(rows[0]).getAllByRole('columnheader')

            expect(headers[0]).toHaveTextContent(/Attestation Time/i)
            expect(headers[1]).toHaveTextContent(/Blockchain Detail/i)
            expect(headers[2]).toHaveTextContent(/Index Value/i)
            expect(headers[3]).toHaveTextContent(/Status/i)
            expect(headers[4]).toHaveTextContent(/More Info/i)
        })
    })

    describe('close modal event', () => {
        test('should close modal by clicking close button', () => {
            const { getByRole } = render(<VerifyListModal {...props} />)
            fireEvent.click(getByRole('button', { name: 'close-modal' }))
            expect(props.handleVerifyListModalClose).toHaveBeenCalledTimes(1)
        })

        test('should close modal by clicking backdrop', () => {
            const { getByRole } = render(<VerifyListModal {...props} />)
            fireEvent.click(getByRole('presentation').firstChild)
            expect(props.handleVerifyListModalClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 1', () => {
        test('should show specific text', () => {
            render(<VerifyListModal {...props} />)
            const rows = within(screen.getByRole('table')).getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent('2022/10/18 09:03:47')
            expect(cells[1]).toHaveTextContent('102')
            expect(cells[2]).toHaveTextContent('0xdea...bd_R0')
        })

        test('should contain a link which can click to visit external link', () => {
            render(<VerifyListModal {...props} />)
            const rows = within(screen.getByRole('table')).getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')
            const link = within(cells[1]).getByRole('link')

            expect(link).toHaveAttribute(
                'href',
                'https://GOERLI.etherscan.io/tx/0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
            )
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        test('should show tooltip when hovering over the icon', async () => {
            // TODO update in mui v5
            // const { getByRole, getByTestId, findByRole } = render(<VerifyListModal {...props} />)
            // const rows = within(getByRole('table')).getAllByRole('row')
            // const cells = within(rows[1]).getAllByRole('cell')
            // const statusIcon = within(cells[3]).getByTestId('CheckIcon')
            // fireEvent.mouseOver(statusIcon)
            // const statusTooltip = await findByRole('tooltip')
            // expect(statusTooltip).toBeInTheDocument()
        })

        test('should call specific fn if user click search icon', () => {
            render(<VerifyListModal {...props} />)
            const rows = within(screen.getByRole('table')).getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')
            const searchIcon = within(cells[4]).getByRole('button')

            fireEvent.click(searchIcon)

            expect(props.handleMoreInfoModalOpen).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 2', () => {
        test('should show specific text', () => {
            render(<VerifyListModal {...props} />)
            const rows = within(screen.getByRole('table')).getAllByRole('row')
            const cells = within(rows[2]).getByRole('cell')
            expect(cells).toHaveTextContent(/Show hidden verify data hint/i)
        })
    })
})
