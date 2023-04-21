import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '../../test.utils'
import UploadVerificationProof from '../../../component/common/UploadVerificationProof'

const props = {
    uploadedFiles: [
        {
            path: 'DSC_0077.JPG',
            lastModified: 1659784578000,
            name: 'DSC_0077.JPG',
            size: 11629105,
            type: 'image/jpeg',
        },
    ],
    handleProofDataChange: jest.fn(),
    handleNext: jest.fn(),
}

describe('UploadVerificationProof', () => {
    describe('render elements', () => {
        test('should render a file input with icon and text', () => {
            const { getByTestId, getByRole, getByText } = render(<UploadVerificationProof {...props} />)
            expect(getByTestId('proof-uploader')).toBeInTheDocument()
            expect(getByRole('img', { name: /fingerPrint/i })).toBeInTheDocument()
            expect(getByText(/Choose Your Off-chain Proof to Upload/i)).toBeInTheDocument()
        })
    })

    describe('render uploaded file info alert', () => {
        test('should render specific alert on raw data verification page', () => {
            const route = '/rawDataVerification'
            const { getByText, getByRole } = render(
                <MemoryRouter initialEntries={[route]}>
                    <UploadVerificationProof {...props} />
                </MemoryRouter>,
            )
            expect(getByText(/Uploaded File to Verify/i)).toBeInTheDocument()
            expect(getByRole('alert')).toBeInTheDocument()
        })

        test('should render specific alert on file set verification page', () => {
            const route = '/fileSetVerification'
            const { getByText, getByRole } = render(
                <MemoryRouter initialEntries={[route]}>
                    <UploadVerificationProof {...props} />
                </MemoryRouter>,
            )
            expect(getByText(/Folder to Verify/i)).toBeInTheDocument()
            expect(getByRole('alert')).toBeInTheDocument()
        })
    })

    describe('file input event', () => {
        test('should upload one file', async () => {
            const { getByTestId } = render(<UploadVerificationProof {...props} />)
            const uploader = getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], 'DSC_0077.JPG_102_0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.change(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleProofDataChange).toHaveBeenCalledTimes(1)
            expect(props.handleNext).toHaveBeenCalledTimes(1)
        })

        test('should drop one file', async () => {
            const { getByTestId } = render(<UploadVerificationProof {...props} />)
            const uploader = getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], 'DSC_0077.JPG_102_0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.drop(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleProofDataChange).toHaveBeenCalledTimes(1)
            expect(props.handleNext).toHaveBeenCalledTimes(1)
        })

        test('should not upload multiple files', async () => {
            const { getByTestId } = render(<UploadVerificationProof {...props} />)
            const uploader = getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file1 = new File([['file1']], 'DSC_0077.JPG_102_0.itm', {
                type: 'application/json',
            })
            const file2 = new File([['file2']], 'DSC_0078.JPG_102_0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', { value: [file1, file2] })

            fireEvent.change(uploader)

            expect(await uploader.files).toHaveLength(2)
            expect(props.handleProofDataChange).not.toHaveBeenCalled()
            expect(props.handleNext).not.toHaveBeenCalled()
        })
    })
})
