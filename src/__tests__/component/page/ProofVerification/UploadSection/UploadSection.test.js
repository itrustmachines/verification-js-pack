import React from 'react'
import { render, screen, fireEvent } from '../../../../test.utils'
// import { SnackbarProvider } from 'notistack'
import UploadSection from '../../../../../component/page/ProofVerification/UploadSection/UploadSection'

const props = {
    handleVerify: jest.fn(),
}

// const mockEnqueue = jest.fn()

// jest.mock('notistack', () => ({
//     ...jest.requireActual('notistack'),
//     useSnackbar: () => {
//         return {
//             enqueueSnackbar: mockEnqueue,
//         }
//     },
// }))

describe('UploadSection', () => {
    describe('render elements', () => {
        test('should render a file input with icon and text', () => {
            render(<UploadSection {...props} />)
            const uploader = screen.getByTestId('proof-uploader')
            expect(uploader).toBeInTheDocument()
            expect(screen.getByRole('img', { name: /fingerprint/i })).toBeInTheDocument()
            expect(screen.getByText(/Choose Your Off-chain Proof to Upload/i)).toBeInTheDocument()
        })
    })

    describe('file input event', () => {
        test('should trigger handleVerify() if user upload one file', async () => {
            render(<UploadSection {...props} />)
            const uploader = screen.getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.change(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleVerify).toHaveBeenCalledTimes(1)
        })

        test('should trigger handleVerify() if user drop one file', async () => {
            render(<UploadSection {...props} />)
            const uploader = screen.getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file = new File([['file']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', {
                value: [file],
            })

            fireEvent.drop(uploader)

            expect(await uploader.files[0]).toStrictEqual(file)
            expect(await uploader.files).toHaveLength(1)
            expect(props.handleVerify).toHaveBeenCalledTimes(1)
        })

        test('should not upload multiple files', async () => {
            render(<UploadSection {...props} />)
            const uploader = screen.getByTestId('proof-uploader')

            window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url')
            const file1 = new File([['file1']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm', {
                type: 'application/json',
            })
            const file2 = new File([['file2']], '0x8a2cbf26d0a4df4116c7a8c6dfc38d970943a09f_30_R2_104_R0.itm', {
                type: 'application/json',
            })

            Object.defineProperty(uploader, 'files', { value: [file1, file2] })

            fireEvent.change(uploader)

            expect(await uploader.files).toHaveLength(2)
            expect(props.handleVerify).not.toHaveBeenCalled()
        })
    })

    describe('file info alert', () => {
        test('should not show info alert if no files upload', () => {
            render(<UploadSection {...props} />)
            const infoAlert = screen.queryByRole('alert')

            expect(infoAlert).toBeNull()
        })
    })

    test.todo('should show snackbar if user upload multiple files')
    test.todo('should show snackbar if upload fail')
})
