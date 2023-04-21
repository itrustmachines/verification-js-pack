import React from 'react'
import { render, within } from '../../../test.utils'
import VerifyResultTable from '../../../../component/page/RawDataVerification/VerifyResultTable'
import { detailData } from '../../../resource/rawDataVerificationDetailData'

const props = { detailData }

describe('VerifyResultTable', () => {
    describe('render title and table', () => {
        test('should render title and table', () => {
            const { getByText, getByRole } = render(<VerifyResultTable {...props} />)
            expect(getByText(/Verify Result/i)).toBeInTheDocument()
            expect(getByRole('table', { name: 'sticky table' })).toBeInTheDocument()
        })
    })

    describe('if file name is verified and verify success', () => {
        const renderVerifyResultTable = () => {
            const { getAllByRole } = render(<VerifyResultTable {...props} />)
            return {
                rows: getAllByRole('row'),
            }
        }

        test('should render table with 3 rows', () => {
            const { rows } = renderVerifyResultTable()
            expect(rows).toHaveLength(3)
        })

        test('should render cell content on first row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[0]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/File Name/i)
            expect(cells[1]).toHaveTextContent(/Success/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
        })

        test('should render cell content on second row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[1]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Content/i)
            expect(cells[1]).toHaveTextContent(/Success/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
        })

        test('should render cell content on third row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[2]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Upload Time/i)
            expect(cells[1]).toHaveTextContent('2023/01/10 11:49:20')
        })
    })

    describe('if verify file name and content fail', () => {
        const renderVerifyResultTable = () => {
            const customProps = {
                detailData: { ...detailData, fileNameVerifyResult: 'FAIL', fileContentVerifyResult: 'FAIL' },
            }
            const { getAllByRole } = render(<VerifyResultTable {...customProps} />)
            return {
                rows: getAllByRole('row'),
            }
        }

        test('should render cell content on first row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[0]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/File Name/i)
            expect(cells[1]).toHaveTextContent(/Fail/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CloseIcon'))
        })

        test('should render cell content on second row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[1]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Content/i)
            expect(cells[1]).toHaveTextContent(/Fail/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CloseIcon'))
        })
    })

    describe('if proof has been modified', () => {
        const renderVerifyResultTable = () => {
            const customProps = {
                detailData: {
                    ...detailData,
                    fileNameVerifyResult: 'PROOF_ERROR',
                    fileContentVerifyResult: 'PROOF_ERROR',
                },
            }
            const { getAllByRole } = render(<VerifyResultTable {...customProps} />)
            return {
                rows: getAllByRole('row'),
            }
        }

        test('should render cell content on first row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[0]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/File Name/i)
            expect(cells[1]).toHaveTextContent(/Proof Error/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('PriorityHighIcon'))
        })

        test('should render cell content on second row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[1]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Content/i)
            expect(cells[1]).toHaveTextContent(/Proof Error/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('PriorityHighIcon'))
        })
    })

    describe('if file name is not verified', () => {
        const renderVerifyResultTable = () => {
            const notVerifyFileNameData = { ...detailData, isVerifyFileName: false }
            const { getAllByRole } = render(<VerifyResultTable detailData={notVerifyFileNameData} />)
            return {
                rows: getAllByRole('row'),
            }
        }

        test('should render table with 2 rows', () => {
            const { rows } = renderVerifyResultTable()
            expect(rows).toHaveLength(2)
        })

        test('should render cell content on first row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[0]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Content/i)
            expect(cells[1]).toHaveTextContent(/Success/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
        })

        test('should render cell content on second row', () => {
            const { rows } = renderVerifyResultTable()
            const cells = within(rows[1]).getAllByRole('cell')
            expect(cells[0]).toHaveTextContent(/Upload Time/i)
            expect(cells[1]).toHaveTextContent('2023/01/10 11:49:20')
        })
    })
})
