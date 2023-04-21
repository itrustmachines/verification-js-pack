import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '../../../test.utils'
import VerifyDetailTable from '../../../../component/page/ProofVerification/VerifyDetailTable'
import { verifySuccessData as detailData } from '../../../resource/proofVerificationDetailData'

const props = { detailData }

describe('VerifyDetailTable', () => {
    describe('render elements', () => {
        test('should render title and expand button', () => {
            const { getByText, getByRole } = render(<VerifyDetailTable {...props} />)
            expect(getByText(/Blockchain Verify Detail/i)).toBeInTheDocument()
            expect(getByRole('button', { name: 'expand-detail' })).toBeInTheDocument()
        })

        test('should expand/collapse table by toggling expand button', async () => {
            const { getByTestId, getByRole, queryByTestId } = render(<VerifyDetailTable {...props} />)
            expect(getByTestId('detail-collapse')).toBeInTheDocument()

            // TODO update icon check in MUI v5
            fireEvent.click(getByRole('button', { name: 'expand-detail' }))
            await waitFor(() => {
                expect(queryByTestId('detail-collapse')).not.toBeInTheDocument()
            })

            fireEvent.click(getByRole('button', { name: 'expand-detail' }))
            await waitFor(() => {
                expect(getByTestId('detail-collapse')).toBeInTheDocument()
            })
        })

        test('should render table with 6 rows', () => {
            render(<VerifyDetailTable {...props} />)
            expect(screen.getByRole('table')).toBeInTheDocument()
            expect(screen.getAllByRole('row')).toHaveLength(6)
        })
    })

    describe('render cell content on row 1', () => {
        test('should render specific title and text', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[0]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Off-chain Proof/i)
            expect(contentCell).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm/i)
        })
    })

    describe('render cell content on row 2', () => {
        test('should render specific title and text', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Upload Time/i)
            expect(contentCell).toHaveTextContent('2022/11/18 10:51:19')
        })
    })

    describe('render cell content on row 3', () => {
        test('should render specific title and text', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Contract Address/i)
            expect(contentCell).toHaveTextContent(/0x483410b15Eca4A22fC122d34840F0498e624fA43/i)
        })

        test('should contain a link which can click to visit external link', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')
            const contentCell = cells[1]
            const link = within(contentCell).getByRole('link')

            expect(link).toHaveAttribute(
                'href',
                'https://GOERLI.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43',
            )
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        test('should render a hint icon with tooltip', async () => {
            // TODO update in MUI v5
            // const { findByRole } = render(<VerifyDetailTable {...props} />)
            // fireEvent.mouseOver(getByTestId('HelpIcon'))
            // expect(await screen.findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_contract_address/i)
        })
    })

    describe('render cell content on row 4', () => {
        test('should render specific title and text', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[3]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Existence Status/i)
            expect(contentCell).toHaveTextContent(/Total: 22,Pass: 22,Modified: 0, Added: 0,Removed: 0/i)
        })
    })

    describe('render cell content on row 5', () => {
        test('should render specific title and text', () => {
            render(<VerifyDetailTable {...props} />)
            const rows = screen.getAllByRole('row')
            const cells = within(rows[4]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Verify Result/i)
            expect(contentCell).toHaveTextContent(/Verify success/i)
        })

        test('should render correct status icon', () => {
            render(<VerifyDetailTable {...props} />)

            // TODO update the test in MUI v5: data-testid is already added by MUI in latest version.
            const icon = screen.getByTestId('CheckIcon')
            expect(icon).toHaveStyle('color: #4caf50')
        })
    })

    describe('render cell content on row 6', () => {
        test('should render specific title and text', () => {
            const { getAllByRole, getByRole } = render(<VerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[5]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Blockchain Verify List/i)
            expect(contentCell).toContainElement(getByRole('button', { name: /view/i }))
        })

        test('should open verify list modal by clicking view button', async () => {
            const { getByRole, findByRole } = render(<VerifyDetailTable {...props} />)

            fireEvent.click(getByRole('button', { name: /view/i }))

            expect(await findByRole('presentation')).toBeInTheDocument()
        })
    })
})
