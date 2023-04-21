import React from 'react'
import { render, within } from '../../../../test.utils'
import RwdDetailTableContent from '../../../../../component/page/RawDataVerification/VerifyDetailTable/RwdDetailTableContent'
import { detailData, emptyDescriptionData } from '../../../../resource/rawDataVerificationDetailData'

const props = { detailData }

describe('RwdDetailTableContent', () => {
    describe('render elements', () => {
        test('should render 12 rows and cells', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            expect(getAllByRole('row')).toHaveLength(12)
            expect(getAllByRole('cell')).toHaveLength(12)
        })

        test('should render 11 rows and cells if value of description is empty', () => {
            const { getAllByRole } = render(<RwdDetailTableContent detailData={emptyDescriptionData} />)
            expect(getAllByRole('row')).toHaveLength(11)
            expect(getAllByRole('cell')).toHaveLength(11)
        })
    })

    describe('render uploaded data file name row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[0]

            expect(cell).toHaveTextContent(/Uploaded Data File Name/i)
            expect(cell).toHaveTextContent('DSC_0077.JPG')
        })
    })

    describe('render uploaded data file hash row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[1]

            expect(cell).toHaveTextContent(/Uploaded Data File Hash/i)
            expect(cell).toHaveTextContent(/5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540/i)
        })

        test('should render "N/A" if result is empty', () => {
            const customProps = { detailData: { ...detailData, uploadFileHash: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)
            expect(getAllByRole('cell')[1]).toHaveTextContent('N/A')
        })
    })

    describe('render description row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[2]

            expect(cell).toHaveTextContent(/Description/i)
            expect(cell).toHaveTextContent(/test/i)
        })

        test('should not render the whole row if result is empty', () => {
            const { getAllByRole } = render(<RwdDetailTableContent detailData={emptyDescriptionData} />)
            const cell = getAllByRole('cell')[2]
            expect(cell).not.toHaveTextContent(/Description/i)
        })
    })

    describe('render attester wallet address row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[3]

            expect(cell).toHaveTextContent(/Attester Wallet Address/i)
            expect(cell).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd/i)
        })
    })

    describe('render attester certificated info row', () => {
        test('should render specific title and result if certificated', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[4]

            expect(cell).toHaveTextContent(/Attester Certificated Info/i)
            expect(cell).toHaveTextContent('吳奕萱 / Olive')
            // TODO update in MUI v5
            // expect(cell).toContainElement(getByTestId('CheckCircleIcon'))
        })

        test('should render result if not certificated', () => {
            const customProps = { detailData: { ...detailData, certification: null } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)
            const cell = getAllByRole('cell')[4]

            expect(cell).toHaveTextContent(/Not Certified/i)
            // TODO update in MUI v5
            // expect(cell).toContainElement(getByTestId('ErrorIcon'))
        })
    })

    describe('render attestation time row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[5]

            expect(cell).toHaveTextContent(/Attestation Time/i)
            expect(cell).toHaveTextContent('2022/10/18 09:03:44')
        })

        test('should not render the whole row if result is empty', () => {
            const customProps = { detailData: { ...detailData, ledgerInputTimestamp: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)
            expect(getAllByRole('cell')[5]).not.toHaveTextContent(/Attestation Time/i)
        })
    })

    describe('render off-chain proof row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[6]

            expect(cell).toHaveTextContent(/Off-chain Proof/i)
            expect(cell).toHaveTextContent(/DSC_0077.JPG_102_0.itm/i)
        })
    })

    describe('render contract address row', () => {
        test('should render specific title and result text', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[7]

            expect(cell).toHaveTextContent(/Contract Address/i)
            expect(cell).toHaveTextContent(/0x483410b15Eca4A22fC122d34840F0498e624fA43/i)
        })

        test('should render a result link', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[7]
            const link = within(cell).getByRole('link')

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
        //     const { getAllByRole, findByRole, queryByRole } = render(<RwdDetailTableContent {...props} />)
        //     const cell = getAllByRole('cell')[7]
        //     const helpIcon = within(cell).getByTestId('HelpIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(helpIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_contract_address/i)
        // })

        // TODO update in MUI v5
        // test('should render error icon with a hoverable tooltip if return proof error', async () => {
        //     const customProps = { detailData: { ...detailData, verifyResult: 'PROOF_ERROR' } }
        //     const { getAllByRole, findByRole, queryByRole } = render(<RwdDetailTableContent {...customProps} />)
        //     const cell = getAllByRole('cell')[7]
        //     const errorIcon = within(cell).getByTestId('ErrorIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(errorIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(
        //         /The Proof had been modified, the link might be invalid/i,
        //     )
        // })

        test('should render "N/A" if contract address is empty', () => {
            const customProps = { detailData: { ...detailData, contractAddress: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)
            const cell = getAllByRole('cell')[7]
            expect(cell).toHaveTextContent('N/A')
        })
    })

    describe('render blockchain detail row', () => {
        test('should render specific title and result text', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[8]

            expect(cell).toHaveTextContent(/Blockchain Detail/i)
            expect(cell).toHaveTextContent('102')
        })

        test('should render a result link', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[8]
            const link = within(cell).getByRole('link')

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
        //     const { getAllByRole, findByRole, queryByRole } = render(<RwdDetailTableContent {...props} />)
        //     const cell = getAllByRole('cell')[8]
        //     const helpIcon = within(cell).getByTestId('HelpIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(helpIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(/proof.verification.detail.help_clearance_order/i)
        // })

        // TODO update in MUI v5
        // test('should render error icon with a hoverable tooltip if return proof error', async () => {
        //     const customProps = { detailData: { ...detailData, verifyResult: 'PROOF_ERROR' } }
        //     const { getAllByRole, findByRole, queryByRole } = render(<RwdDetailTableContent {...customProps} />)
        //     const cell = getAllByRole('cell')[8]
        //     const errorIcon = within(cell).getByTestId('ErrorIcon')

        //     expect(queryByRole('tooltip')).not.toBeInTheDocument()

        //     fireEvent.mouseOver(errorIcon)

        //     expect(await findByRole('tooltip')).toBeInTheDocument()
        //     expect(await findByRole('tooltip')).toHaveTextContent(
        //         /The Proof had been modified, the link might be invalid/i,
        //     )
        // })

        test('should render "N/A" if clearance order is empty', () => {
            const customProps = { detailData: { ...detailData, clearanceOrder: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)
            const cell = getAllByRole('cell')[8]
            expect(cell).toHaveTextContent('N/A')
        })
    })

    describe('render index value row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[9]

            expect(cell).toHaveTextContent(/Index Value/i)
            expect(cell).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0/i)
        })

        test('should render "N/A" if index value is empty', () => {
            const customProps = { detailData: { ...detailData, indexValue: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)

            const cell = getAllByRole('cell')[9]
            expect(cell).toHaveTextContent('N/A')
        })
    })

    describe('render root hash row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[10]

            expect(cell).toHaveTextContent(/Root Hash/i)
            expect(cell).toHaveTextContent(/53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e/i)
        })

        test('should render "N/A" if merkle proof root hash is empty', () => {
            const customProps = { detailData: { ...detailData, merkleProofRootHash: null } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)

            const cell = getAllByRole('cell')[10]
            expect(cell).toHaveTextContent('N/A')
        })
    })

    describe('render attested fields row', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<RwdDetailTableContent {...props} />)
            const cell = getAllByRole('cell')[11]
            expect(cell).toHaveTextContent(/Attested Fields/i)

            const expected = `{ "fileName":"DSC_0077.JPG", "fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540", "description":"test", "timestamp":1666055024283, "callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd" }`
            expect(cell).toHaveTextContent(expected)
        })

        test('should render "N/A" if cmd is empty and two rows would be hidden', () => {
            const customProps = { detailData: { ...detailData, cmd: '' } }
            const { getAllByRole } = render(<RwdDetailTableContent {...customProps} />)

            const cell = getAllByRole('cell')[9]

            expect(cell).toHaveTextContent('N/A')
            expect(getAllByRole('row')).toHaveLength(10)
        })
    })
})
