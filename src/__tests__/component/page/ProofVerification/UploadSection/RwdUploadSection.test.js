import React from 'react'
import { render, fireEvent } from '../../../../test.utils'
import RwdUploadSection from '../../../../../component/page/ProofVerification/UploadSection/RwdUploadSection'

const maxSize = Number(process.env.REACT_APP_UPLOAD_MAX_SIZE) * 1024 * 1024
const props = {
    handleVerify: jest.fn(),
}

describe('RwdUploadSection', () => {
    describe('render elements', () => {
        test('should render upload button and hidden input', () => {
            const { getByRole, getByTestId } = render(<RwdUploadSection {...props} />)
            expect(getByRole('button', { name: /upload/i })).toBeInTheDocument()
            expect(getByTestId('upload-input')).not.toBeVisible()
        })

        test('should render correct button text and status after uploading and verifying', () => {
            const { getByTestId, getByRole, queryByRole } = render(<RwdUploadSection {...props} />)
            const file = new File([['file']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm', {
                type: 'application/json',
            })

            expect(getByRole('button', { name: /upload/i })).toBeEnabled()
            expect(getByRole('button', { name: /verify/i })).toBeDisabled()

            fireEvent.change(getByTestId('upload-input'), {
                target: { files: [file] },
            })

            expect(getByRole('button', { name: /verify/i })).toBeEnabled()

            fireEvent.click(getByRole('button', { name: /verify/i }))

            expect(getByRole('button', { name: /^upload$/i })).toHaveAttribute('aria-disabled', 'true')
            expect(queryByRole('button', { name: /verify/i })).not.toBeInTheDocument()
            expect(getByRole('button', { name: /reupload/i })).toBeInTheDocument()
        })
    })

    describe('file input', () => {
        test('should upload one file', async () => {
            const { getByTestId } = render(<RwdUploadSection {...props} />)
            const uploadInput = getByTestId('upload-input')
            const file = new File([['file']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm', {
                type: 'application/json',
            })

            fireEvent.change(uploadInput, {
                target: { files: [file] },
            })

            expect(await uploadInput.files[0]).toStrictEqual(file)
            expect(await uploadInput.files).toHaveLength(1)
            expect(await uploadInput.files[0].size).toBeLessThan(maxSize)
        })
    })

    describe('file info alert', () => {
        test('should not show info alert if no files uploaded', () => {
            const { queryByRole } = render(<RwdUploadSection {...props} />)
            expect(queryByRole('alert')).toBeNull()
        })
    })
})
