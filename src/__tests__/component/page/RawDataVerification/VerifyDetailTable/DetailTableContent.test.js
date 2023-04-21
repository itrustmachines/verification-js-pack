import React from 'react'
import { render, within } from '../../../../test.utils'
import DetailTableContent from '../../../../../component/page/RawDataVerification/VerifyDetailTable/DetailTableContent'
import { detailData, emptyDescriptionData } from '../../../../resource/rawDataVerificationDetailData'

const props = { detailData }

describe('DetailTableContent', () => {
    describe('render elements', () => {
        test('should render 12 rows', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            expect(getAllByRole('row')).toHaveLength(12)
        })

        test('should render 11 rows if value of description is empty', () => {
            const { getAllByRole } = render(<DetailTableContent detailData={emptyDescriptionData} />)
            expect(getAllByRole('row')).toHaveLength(11)
        })
    })

    describe('render uploaded data file name row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[0]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Uploaded Data File Name/i)
            expect(cells[1]).toHaveTextContent('DSC_0077.JPG')
        })
    })

    describe('render uploaded data file hash row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[1]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Uploaded Data File Hash/i)
            expect(cells[1]).toHaveTextContent(/5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540/i)
        })

        test('should render "N/A" if result is empty', () => {
            const customProps = { detailData: { ...detailData, uploadFileHash: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)

            const row = getAllByRole('row')[1]
            const cells = within(row).getAllByRole('cell')

            expect(cells[1]).toHaveTextContent('N/A')
        })
    })

    describe('render description row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[2]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Description/i)
            expect(cells[1]).toHaveTextContent(/test/i)
        })

        test('should not render the whole row if result is empty', () => {
            const { getAllByRole } = render(<DetailTableContent detailData={emptyDescriptionData} />)
            expect(getAllByRole('row')[2]).not.toHaveTextContent(/Description/i)
        })
    })

    describe('render attester wallet address row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[3]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Attester Wallet Address/i)
            expect(cells[1]).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd/i)
        })
    })

    describe('render attester certificated info row', () => {
        test('should render specific title and result if certificated', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[4]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Attester Certificated Info/i)
            expect(cells[1]).toHaveTextContent('吳奕萱 / Olive')
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckCircleIcon'))
        })

        test('should render result if not certificated', () => {
            const customProps = { detailData: { ...detailData, certification: null } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)
            const row = getAllByRole('row')[4]
            const cells = within(row).getAllByRole('cell')

            expect(cells[1]).toHaveTextContent(/Not Certified/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('ErrorIcon'))
        })
    })

    describe('render attestation time row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[5]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Attestation Time/i)
            expect(cells[1]).toHaveTextContent('2022/10/18 09:03:44')
        })

        test('should not render the whole row if result is empty', () => {
            const customProps = { detailData: { ...detailData, ledgerInputTimestamp: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)
            expect(getAllByRole('row')[5]).not.toHaveTextContent(/Attestation Time/i)
        })
    })

    describe('render off-chain proof row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[6]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Off-chain Proof/i)
            expect(cells[1]).toHaveTextContent(/DSC_0077.JPG_102_0.itm/i)
        })
    })

    describe('render contract address row', () => {
        test('should render specific title and result text', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[7]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Contract Address/i)
            expect(cells[1]).toHaveTextContent(/0x483410b15Eca4A22fC122d34840F0498e624fA43/i)
        })

        test('should render a result link', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[7]
            const cells = within(row).getAllByRole('cell')
            const link = within(cells[1]).getByRole('link')

            expect(link).toHaveTextContent(/0x483410b15Eca4A22fC122d34840F0498e624fA43/i)
            expect(link).toHaveAttribute(
                'href',
                'https://GOERLI.etherscan.io/address/0x483410b15Eca4A22fC122d34840F0498e624fA43',
            )
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        // TODO update in MUI v5
        // test('should render help icon with a hoverable tooltip', async () => {
        //     const { getAllByRole, findByRole, queryByRole } = render(<DetailTableContent {...props} />)
        //     const row = getAllByRole('row')[7]
        //     const cells = within(row).getAllByRole('cell')
        // const helpIcon = within(cells[1]).getByTestId('HelpIcon')

        // expect(queryByRole('tooltip')).not.toBeInTheDocument()

        // fireEvent.mouseOver(helpIcon)

        // expect(await findByRole('tooltip')).toBeInTheDocument()
        // expect(await findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_contract_address/i)
        // })

        // TODO update in MUI v5
        // test('should render error icon with a hoverable tooltip if return proof error', async () => {
        //     const customProps = { detailData: { ...detailData, verifyResult: 'PROOF_ERROR' } }
        //     const { getAllByRole, findByRole, queryByRole } = render(<DetailTableContent {...customProps} />)
        //     const row = getAllByRole('row')[7]
        //     const cells = within(row).getAllByRole('cell')
        // const errorIcon = within(cells[1]).getByTestId('ErrorIcon')

        // expect(queryByRole('tooltip')).not.toBeInTheDocument()

        // fireEvent.mouseOver(errorIcon)

        // expect(await findByRole('tooltip')).toBeInTheDocument()
        // expect(await findByRole('tooltip')).toHaveTextContent(
        //     /The Proof had been modified, the link might be invalid/i,
        // )
        // })

        test('should render "N/A" if contract address is empty', () => {
            const customProps = { detailData: { ...detailData, contractAddress: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)
            const row = getAllByRole('row')[7]
            const cells = within(row).getAllByRole('cell')
            expect(cells[1]).toHaveTextContent('N/A')
        })
    })

    describe('render blockchain detail row', () => {
        test('should render specific title and result text', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[8]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Blockchain Detail/i)
            expect(cells[1]).toHaveTextContent('102')
        })

        test('should render a result link', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[8]
            const cells = within(row).getAllByRole('cell')
            const link = within(cells[1]).getByRole('link')

            expect(link).toHaveTextContent('102')
            expect(link).toHaveAttribute(
                'href',
                'https://GOERLI.etherscan.io/tx/0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
            )
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        // TODO update in MUI v5
        // test('should render help icon with a hoverable tooltip', async () => {
        //     const { getAllByRole, findByRole, queryByRole } = render(<DetailTableContent {...props} />)
        //     const row = getAllByRole('row')[8]
        //     const cells = within(row).getAllByRole('cell')
        //     const helpIcon = within(cells[1]).getByTestId('HelpIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(helpIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_clearance_order/i)
        // })

        // TODO update in MUI v5
        // test('should render error icon with a hoverable tooltip if return proof error', async () => {
        //     const customProps = { detailData: { ...detailData, verifyResult: 'PROOF_ERROR' } }
        //     const { getAllByRole, findByRole, queryByRole } = render(<DetailTableContent {...customProps} />)
        //     const row = getAllByRole('row')[8]
        //     const cells = within(row).getAllByRole('cell')
        //     const errorIcon = within(cells[1]).getByTestId('ErrorIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(errorIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(
        //         /The Proof had been modified, the link might be invalid/i,
        //     )
        // })

        test('should render "N/A" if clearance order is empty', () => {
            const customProps = { detailData: { ...detailData, clearanceOrder: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)
            const row = getAllByRole('row')[8]
            const cells = within(row).getAllByRole('cell')
            expect(cells[1]).toHaveTextContent('N/A')
        })
    })

    describe('render index value row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[9]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Index Value/i)
            expect(cells[1]).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0/i)
        })

        test('should render "N/A" if index value is empty', () => {
            const customProps = { detailData: { ...detailData, indexValue: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)

            const row = getAllByRole('row')[9]
            const cells = within(row).getAllByRole('cell')

            expect(cells[1]).toHaveTextContent('N/A')
        })
    })

    describe('render root hash row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[10]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Root Hash/i)
            expect(cells[1]).toHaveTextContent(/53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e/i)
        })

        test('should render "N/A" if merkle proof root hash is empty', () => {
            const customProps = { detailData: { ...detailData, merkleProofRootHash: null } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)

            const row = getAllByRole('row')[10]
            const cells = within(row).getAllByRole('cell')
            expect(cells[1]).toHaveTextContent('N/A')
        })
    })

    describe('render attested fields row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<DetailTableContent {...props} />)
            const row = getAllByRole('row')[11]
            const cells = within(row).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Attested Fields/i)

            const expected = `{ "fileName":"DSC_0077.JPG", "fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540", "description":"test", "timestamp":1666055024283, "callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd" }`
            expect(cells[1]).toHaveTextContent(expected)
        })

        test('should render "N/A" if cmd is empty and two rows would be hidden', () => {
            const customProps = { detailData: { ...detailData, cmd: '' } }
            const { getAllByRole } = render(<DetailTableContent {...customProps} />)

            const row = getAllByRole('row')[9]
            const cells = within(row).getAllByRole('cell')

            expect(cells[1]).toHaveTextContent('N/A')
            expect(row).not.toHaveTextContent(/Description/i)
            expect(row).not.toHaveTextContent(/Attester Wallet Address/i)
        })
    })
})
