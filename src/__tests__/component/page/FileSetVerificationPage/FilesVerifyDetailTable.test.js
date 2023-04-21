import React from 'react'
import { render, within, fireEvent, waitFor } from '../../../test.utils'
import FilesVerifyDetailTable from '../../../../component/page/FileSetVerification/FilesVerifyDetailTable'
import { detailData } from '../../../resource/fileSetVerificationDetailData'

const props = { detailData }

describe('FilesVerifyDetailTable', () => {
    describe('render elements', () => {
        test('should render title and expand icon', () => {
            const { getByText, getByRole } = render(<FilesVerifyDetailTable {...props} />)
            expect(getByText(/multiple Files Verify Detail/i)).toBeInTheDocument()
            expect(getByRole('button', { name: 'expand-list' })).toBeInTheDocument()
        })

        test('should expand/collapse table by toggling expand button', async () => {
            const { getByRole, getByTestId, queryByTestId } = render(<FilesVerifyDetailTable {...props} />)
            expect(getByTestId('list-collapse')).toBeInTheDocument()

            fireEvent.click(getByRole('button', { name: 'expand-list' }))
            await waitFor(() => {
                expect(queryByTestId('list-collapse')).not.toBeInTheDocument()
            })

            fireEvent.click(getByRole('button', { name: 'expand-list' }))
            await waitFor(() => {
                expect(getByTestId('list-collapse')).toBeInTheDocument()
            })
        })

        test('should render 7 rows', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            expect(getAllByRole('row')).toHaveLength(7)
        })
    })

    describe('render cell content on row 1', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[0]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Off-chain Proof/i)
            expect(contentCell).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_131_R0_131_R5/i)
        })
    })

    describe('render cell content on row 2', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Upload Time/i)
            expect(contentCell).toHaveTextContent('2023/02/20 15:56:37')
        })
    })

    describe('render cell content on row 3', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Contract Address/i)
            expect(contentCell).toHaveTextContent(/0x483410b15Eca4A22fC122d34840F0498e624fA43/i)
        })

        test('should contain a link which can click to visit external link', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
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
            // const { findByRole } = render(<FilesVerifyDetailTable {...props} />)
            // fireEvent.mouseOver(getByTestId('HelpIcon'))
            // expect(await screen.findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_contract_address/i)
        })
    })

    describe('render cell content on row 4', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[3]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Root Folder Name/i)
            expect(contentCell).toHaveTextContent(/multiple files folder/i)
        })
    })

    describe('render cell content on row 5', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[4]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/File Status/i)
            expect(contentCell).toHaveTextContent(/Total:6, Pass:6, Modified:0, Added:0, Missing:0/i)
        })
    })

    describe('render cell content on row 6', () => {
        test('should render specific title and text', () => {
            const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[5]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Verify Result/i)
            expect(contentCell).toHaveTextContent(/success/i)
        })

        test('should render correct status icon', () => {
            // TODO update the test in MUI v5
            // const { getAllByRole } = render(<FilesVerifyDetailTable {...props} />)
            // const rows = getAllByRole('row')
            // const cells = within(rows[5]).getAllByRole('cell')
            // const contentCell = cells[1]
            // const icon = within(contentCell).getByTestId('CheckIcon')
            // expect(icon).toHaveStyle('color: #4caf50')
        })
    })

    describe('render cell content on row 7', () => {
        test('should render specific title and text', () => {
            const { getAllByRole, getByRole } = render(<FilesVerifyDetailTable {...props} />)
            const rows = getAllByRole('row')
            const cells = within(rows[6]).getAllByRole('cell')
            const titleCell = cells[0]
            const contentCell = cells[1]

            expect(titleCell).toHaveTextContent(/Files Verify List/i)
            expect(contentCell).toContainElement(getByRole('button', { name: /view/i }))
        })

        test('should open verify list modal when clicking view button', async () => {
            const { getByRole, findByRole } = render(<FilesVerifyDetailTable {...props} />)

            fireEvent.click(getByRole('button', { name: /view/i }))

            expect(await findByRole('presentation')).toBeInTheDocument()
        })
    })
})
