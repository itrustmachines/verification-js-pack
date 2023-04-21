import React from 'react'
import { render, fireEvent, waitFor } from '../../../../test.utils'
import UploadBinaryData from '../../../../../component/page/RawDataVerification/UploadSection/UploadBinaryData'

const props = {
    handleFileDataChange: jest.fn(),
    handleFileHashChange: jest.fn(),
    handleFileNameChange: jest.fn(),
    handleNext: jest.fn(),
}

describe('UploadBinaryData', () => {
    describe('render elements', () => {
        test('should render a file input with icon and text', () => {
            const { getByTestId, getByRole, getByText } = render(<UploadBinaryData {...props} />)
            expect(getByTestId('binary-data-uploader')).toBeInTheDocument()
            expect(getByRole('img', { name: /fileUpload/i })).toBeInTheDocument()
            expect(getByText(/Choose a File to Verify/i)).toBeInTheDocument()
        })

        test('should render warning alert', () => {
            const { getByRole } = render(<UploadBinaryData {...props} />)
            expect(getByRole('alert')).toBeInTheDocument()
            expect(getByRole('alert')).toHaveTextContent(/upload.binary.data.alert_upload_hash_info/i)
            expect(getByRole('alert')).toHaveClass('MuiAlert-standardWarning')
        })
    })

    describe('file input event', () => {
        test('should upload one file', async () => {
            const { getByTestId } = render(<UploadBinaryData {...props} />)
            const uploader = getByTestId('binary-data-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], 'DSC_0077.JPG', {
                type: 'image/jpeg',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.change(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleFileDataChange).toHaveBeenCalledTimes(1)
            await waitFor(() => {
                expect(props.handleFileHashChange).toHaveBeenCalledTimes(1)
            })
            expect(props.handleFileNameChange).toHaveBeenCalledTimes(1)
            expect(props.handleNext).toHaveBeenCalledTimes(1)
        })

        test('should drop one file', async () => {
            const { getByTestId } = render(<UploadBinaryData {...props} />)
            const uploader = getByTestId('binary-data-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], 'DSC_0077.JPG', {
                type: 'image/jpeg',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.drop(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleFileDataChange).toHaveBeenCalledTimes(1)
            await waitFor(() => {
                expect(props.handleFileHashChange).toHaveBeenCalledTimes(1)
            })
            expect(props.handleFileNameChange).toHaveBeenCalledTimes(1)
            expect(props.handleNext).toHaveBeenCalledTimes(1)
        })

        test('should not upload multiple files', async () => {
            const { getByTestId } = render(<UploadBinaryData {...props} />)
            const uploader = getByTestId('binary-data-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file1 = new File([['file1']], 'DSC_0077.JPG', {
                type: 'image/jpeg',
            })
            const file2 = new File([['file2']], 'DSC_0078.JPG', {
                type: 'image/jpeg',
            })

            Object.defineProperty(uploader, 'files', { value: [file1, file2] })

            fireEvent.change(uploader)

            expect(await uploader.files).toHaveLength(2)
            expect(props.handleFileDataChange).not.toHaveBeenCalled()
            await waitFor(() => {
                expect(props.handleFileHashChange).not.toHaveBeenCalled()
            })
            expect(props.handleFileNameChange).not.toHaveBeenCalled()
            expect(props.handleNext).not.toHaveBeenCalled()
        })
    })
})
