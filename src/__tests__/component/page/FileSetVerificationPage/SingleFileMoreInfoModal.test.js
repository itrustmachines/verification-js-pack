import React from 'react'
import { fireEvent, render, within } from '../../../test.utils'
import SingleFileMoreInfoModal from '../../../../component/page/FileSetVerification/SingleFileMoreInfoModal'
import { detailData } from '../../../resource/fileSetVerificationDetailData'

const props = {
    open: true,
    onClose: jest.fn(),
    content: detailData.verifyFileNameAndHashDetailList[0],
}

describe('SingleFileMoreInfoModal', () => {
    describe('render elements', () => {
        test('should render title and close button', () => {
            const { getByText, getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            expect(getByText(/More Info/i)).toBeInTheDocument()
            expect(getByRole('button', { name: 'close-modal' })).toBeInTheDocument()
        })

        test('should render a table with 3 rows', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            const rows = within(getByRole('table')).getAllByRole('row')
            expect(rows).toHaveLength(3)
        })
    })

    describe('close modal event', () => {
        test('should trigger close event by clicking close button', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            fireEvent.click(getByRole('button', { name: 'close-modal' }))
            expect(props.onClose).toHaveBeenCalledTimes(1)
        })

        test('should trigger close event by clicking backdrop', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            fireEvent.click(getByRole('presentation').firstChild)
            expect(props.onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('render result on row 1', () => {
        test('should render specific title and result', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            const rows = within(getByRole('table')).getAllByRole('row')
            const cells = within(rows[0]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/Status/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
            expect(cells[1]).toHaveTextContent(/File verify success/i)
        })
    })

    describe('render result on row 2', () => {
        test('should render specific title and result', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            const rows = within(getByRole('table')).getAllByRole('row')
            const cells = within(rows[1]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/File Name/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
            expect(cells[1]).toHaveTextContent('DSC_0053.JPG')
        })

        test('should show tooltip when hovering on result text', async () => {
            const { getByText, findByRole } = render(<SingleFileMoreInfoModal {...props} />)
            fireEvent.mouseOver(getByText('DSC_0053.JPG'))
            expect(await findByRole('tooltip')).toBeInTheDocument()
            expect(await findByRole('tooltip')).toHaveTextContent('DSC_0053.JPG')
        })
    })

    describe('render result on row 3', () => {
        test('should render specific title and result', () => {
            const { getByRole } = render(<SingleFileMoreInfoModal {...props} />)
            const rows = within(getByRole('table')).getAllByRole('row')
            const cells = within(rows[2]).getAllByRole('cell')

            expect(cells[0]).toHaveTextContent(/File Hash/i)
            // TODO update in MUI v5
            // expect(cells[1]).toContainElement(getByTestId('CheckIcon'))
            expect(cells[1]).toHaveTextContent('528bbbd4098b7f17c811fbb5c01c04c23e543dd67d1d238f3a8a3731fc6c8626')
        })

        test('should show tooltip when hovering on result text', async () => {
            const { getByText, findByRole } = render(<SingleFileMoreInfoModal {...props} />)
            fireEvent.mouseOver(getByText('528bbbd4098b7f17c811fbb5c01c04c23e543dd67d1d238f3a8a3731fc6c8626'))
            expect(await findByRole('tooltip')).toBeInTheDocument()
            expect(await findByRole('tooltip')).toHaveTextContent(
                '528bbbd4098b7f17c811fbb5c01c04c23e543dd67d1d238f3a8a3731fc6c8626',
            )
        })
    })
})
