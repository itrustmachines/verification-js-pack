import React from 'react'
import { fireEvent, render, within } from '../../../test.utils'
import MoreInfoModal from '../../../../component/page/ProofVerification/MoreInfoModal'

const props = {
    moreInfo: {
        certification: {
            address: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd',
            certificatedChineseName: '吳奕萱',
            certificatedEnglishName: 'Olive Wu',
        },
        clearanceOrder: 102,
        cmd:
            '{"fileName":"DSC_0077.JPG","fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540","description":"","timestamp":1666055024283,"callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd"}',
        contractRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
        existenceType: 'EXIST',
        indexValue: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0',
        ledgerInputTimestamp: 1666055024283,
        merkleProofRootHash: '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
        pass: true,
        proofExistStatus: 'PASS',
        receiptTimestamp: 1666055027487,
        txHash: '0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
        txHashBaseUrl: 'https://goerli.etherscan.io/tx',
    },
    moreInfoModalOpen: true,
    onClose: jest.fn(),
}

describe('MoreInfoModal', () => {
    describe('close modal event', () => {
        test('should trigger close event by clicking close button', () => {
            const { getByRole } = render(<MoreInfoModal {...props} />)

            fireEvent.click(getByRole('button'))
            expect(props.onClose).toHaveBeenCalledTimes(1)
        })

        test('should trigger close event by clicking backdrop', () => {
            const { getByRole } = render(<MoreInfoModal {...props} />)

            fireEvent.click(getByRole('presentation').firstChild)
            expect(props.onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('render list content', () => {
        test('should render modal with 9 list items', () => {
            const { getByRole } = render(<MoreInfoModal {...props} />)
            const modal = getByRole('presentation')
            const list = within(modal).getByRole('list')
            const listItems = within(list).getAllByRole('listitem')

            expect(modal).toBeInTheDocument()
            expect(listItems).toHaveLength(9)
        })
    })

    describe('render content on list item 1', () => {
        test('should render specific title and text link', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)
            const listItem = getAllByRole('listitem')[0]
            const link = within(listItem).getByRole('link')

            expect(listItem).toHaveTextContent(/Blockchain Detail/i)
            expect(link).toHaveAttribute(
                'href',
                'https://goerli.etherscan.io/tx/0x9306f3d64a21c4e5c3776312822be0773def5abaa530d6d583074cd0f395e392',
            )
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })

        test('should show/hide tooltip if hovering over/out the link', async () => {
            const { getByRole, findByRole, queryByRole } = render(<MoreInfoModal {...props} />)
            const modal = getByRole('presentation')
            const list = within(modal).getByRole('list')
            const listItem = within(list).getAllByRole('listitem')[0]
            const link = within(listItem).getByRole('link')

            expect(queryByRole('tooltip')).not.toBeInTheDocument()

            fireEvent.mouseOver(link)

            expect(await findByRole('tooltip')).toBeInTheDocument()
        })
    })

    describe('render content on list item 2', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[1]).toHaveTextContent(/Index Value/i)
            expect(getAllByRole('listitem')[1]).toHaveTextContent('0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_R0')
        })
    })

    describe('render content on list item 3', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[2]).toHaveTextContent(/Existence/i)
            expect(getAllByRole('listitem')[2]).toHaveTextContent('O')
        })
    })

    describe('render content on list item 4', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)
            const listItem = getAllByRole('listitem')[3]

            expect(listItem).toHaveTextContent(/Status/i)
            expect(listItem).toHaveTextContent(/Pass/i)
            // TODO update in MUI v5
            // expect(listItem).toContainElement(getByTestId('CheckIcon'))
        })
    })

    describe('render content on list item 5', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[4]).toHaveTextContent(/Attestation Time/i)
            expect(getAllByRole('listitem')[4]).toHaveTextContent('2022/10/18 09:03:47')
        })
    })

    describe('render content on list item 6', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[5]).toHaveTextContent(/Root Hash/i)
            expect(getAllByRole('listitem')[5]).toHaveTextContent(
                '53c00d0bd56af5e28c9957fbc05f02461cd90d055a2aae46aa8bd7f9bd76104e',
            )
        })
    })

    describe('render content on list item 7', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[6]).toHaveTextContent(/Attester Wallet Address/i)
            expect(getAllByRole('listitem')[6]).toHaveTextContent(/0xdea7119c372b33f62b00d430e26b9f4383fcbfbd/i)
        })
    })

    describe('render content on list item 8', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[7]).toHaveTextContent(/Attester Certificated Info/i)
            expect(getAllByRole('listitem')[7]).toHaveTextContent('吳奕萱 / Olive')
            // TODO update in MUI v5
            // expect(listItem).toContainElement(getByTestId('CheckIcon'))
        })
    })

    describe('render content on list item 9', () => {
        test('should render specific title and result', () => {
            const { getAllByRole } = render(<MoreInfoModal {...props} />)

            expect(getAllByRole('listitem')[8]).toHaveTextContent(/Attested Fields/i)
            expect(getAllByRole('listitem')[8]).toHaveTextContent(
                `{ "fileName":"DSC_0077.JPG", "fileHash":"5a068f29ce2d0fa97cdbadfddfe804b2ad24212131751ef018f88f0002cc2540", "description":"", "timestamp":1666055024283, "callerAddress":"0xdea7119c372b33f62b00d430e26b9f4383fcbfbd" }`,
            )
        })
    })
})
