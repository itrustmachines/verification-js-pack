import React from 'react'
import { fireEvent, render, waitFor } from '../../../../test.utils'
import UploadFolder from '../../../../../component/page/FileSetVerification/UploadSection/UploadFolder'

const props = {
    setFileList: jest.fn(),
    setRootFolderName: jest.fn(),
    handleNext: jest.fn(),
    handleUploadStart: jest.fn(),
}

describe('UploadFolder', () => {
    describe('redner elements', () => {
        test('render a folder uploader with uplodad icon and text', () => {
            const { getByTestId, getByRole, getByText } = render(<UploadFolder {...props} />)
            expect(getByTestId('folder-uploader')).toBeInTheDocument()
            expect(getByRole('img', { name: /fileUpload/i })).toBeInTheDocument()
            expect(getByText(/Choose a Folder to Verify/i)).toBeInTheDocument()
        })

        test('should render a warning alert', () => {
            const { getByRole } = render(<UploadFolder {...props} />)
            expect(getByRole('alert')).toBeInTheDocument()
            expect(getByRole('alert')).toHaveTextContent(/upload.binary.data.alert_upload_hash_info/i)
            expect(getByRole('alert')).toHaveTextContent(/upload.folder.alert/i)
            expect(getByRole('alert')).toHaveClass('MuiAlert-standardWarning')
        })
    })

    describe('file input event', () => {
        // TODO add upload folder test
        test('should upload multiple files', async () => {
            const { getByTestId } = render(<UploadFolder {...props} />)
            const uploader = getByTestId('folder-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const createNewFile = (file, fileName) => {
                const newFile = new File([[file]], fileName, {
                    type: 'image/jpeg',
                    webkitRelativePath: `multiple files folder/${fileName}`,
                })
                return newFile
            }

            const file1 = createNewFile('file1', 'DSC_0053.JPG')
            const file2 = createNewFile('file2', 'DSC_0054.JPG')
            const file3 = createNewFile('file3', 'DSC_0055.JPG')

            Object.defineProperty(uploader, 'files', { value: [file1, file2, file3] })

            fireEvent.change(uploader)

            await waitFor(() => {
                expect(uploader.files[0]).toStrictEqual(file1)
                expect(uploader.files[1]).toStrictEqual(file2)
                expect(uploader.files[2]).toStrictEqual(file3)
                expect(uploader.files).toHaveLength(3)

                expect(props.setFileList).toHaveBeenCalledTimes(1)
                expect(props.setRootFolderName).toHaveBeenCalledTimes(1)
                expect(props.handleNext).toHaveBeenCalledTimes(1)
                expect(props.handleUploadStart).toHaveBeenCalledTimes(1)
            })

            // TODO specify webkitRelativePath property
        })
    })
})
