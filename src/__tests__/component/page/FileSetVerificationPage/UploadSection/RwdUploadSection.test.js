import React from 'react'
import { render, fireEvent } from '../../../../test.utils'
import RwdUploadSection from '../../../../../component/page/FileSetVerification/UploadSection/RwdUploadSection'

const fileList = [
    {
        fileName: 'DSC_0053.JPG',
        hash: '528bbbd4098b7f17c811fbb5c01c04c23e543dd67d1d238f3a8a3731fc6c8626',
    },
    {
        fileName: 'DSC_0054.JPG',
        hash: '43f9275d381560466015a2d17792202b1cccf40dd47ea004aab7537ca1c2a8d2',
    },
    {
        fileName: 'DSC_0055.JPG',
        hash: '77b5cc36ef1307d4177ee5a2756334e191e21b5066400b062662ab29fb159f58',
    },
    {
        fileName: 'DSC_0056.JPG',
        hash: '678304def850d98b93dbd02470146b99a7c4e9447d5883725cbcbb4096d0afc8',
    },
    {
        fileName: 'DSC_0057.JPG',
        hash: 'cc3690b9ac965f8c14a396da0344e5ea39b7eb0735eae6e1e759e271a76be20b',
    },
    {
        fileName: 'DSC_0058.JPG',
        hash: '7603ca3461366513fd1e9aa8b073d7799793910972544554182ea4158b93029b',
    },
]

const rootFolderName = 'multiple files folder'

const verificationProof = [
    {
        lastModified: 1666678374736,
        name: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_131_R0_131_R5.itm',
        size: 18717,
        type: '',
        webkitRelativePath: '',
    },
]

const props = {
    fileList: [],
    rootFolderName: '',
    verificationProof: [],
    onFolderUpload: jest.fn(),
    onProofUpload: jest.fn(),
    handleReset: jest.fn(),
    handleVerify: jest.fn(),
}

describe('RwdUploadSection', () => {
    describe('render elements', () => {
        test('should render each title and 3 buttons', () => {
            const { getByText, getAllByText, getAllByRole } = render(<RwdUploadSection activeStep={0} {...props} />)

            expect(getByText(/Upload Folder to Verify/i)).toBeInTheDocument()
            expect(getByText(/Upload Off-chain Proof/i)).toBeInTheDocument()
            expect(getAllByText(/Verify/i)[0]).toBeInTheDocument()

            expect(getAllByRole('button')).toHaveLength(3)
        })
    })

    describe('display specific button status', () => {
        test('should show correct status on first step', () => {
            const { getByRole } = render(<RwdUploadSection activeStep={0} {...props} />)
            expect(getByRole('button', { name: /Upload Folder/i })).toBeEnabled()
            expect(getByRole('button', { name: /^Upload$/i })).toHaveAttribute('aria-disabled', 'true') // can not use toBeDisabled() because component="label"
            expect(getByRole('button', { name: /Verify/i })).toBeDisabled()
        })

        test('should show correct status on upload folder step', () => {
            const customProps = { ...props, fileList, rootFolderName }
            const { getByRole } = render(<RwdUploadSection activeStep={1} {...customProps} />)
            expect(getByRole('button', { name: /Upload Folder/i })).toBeEnabled()
            expect(getByRole('button', { name: /^Upload$/i })).toBeEnabled()
            expect(getByRole('button', { name: /Verify/i })).toBeDisabled()
        })

        test('should show correct status on upload proof step', () => {
            const customProps = { ...props, fileList, rootFolderName, verificationProof }
            const { getByRole } = render(<RwdUploadSection activeStep={2} {...customProps} />)
            expect(getByRole('button', { name: /Upload Folder/i })).toBeEnabled()
            expect(getByRole('button', { name: /^Upload$/i })).toBeEnabled()
            expect(getByRole('button', { name: /Verify/i })).toBeEnabled()
        })

        test('should show correct status on complete state', () => {
            const customProps = { ...props, fileList, rootFolderName, verificationProof }
            const { getByRole, queryByRole } = render(<RwdUploadSection activeStep={3} {...customProps} />)
            expect(getByRole('button', { name: /Upload Folder/i })).toHaveAttribute('aria-disabled', 'true')
            expect(getByRole('button', { name: /^Upload$/i })).toHaveAttribute('aria-disabled', 'true')
            expect(queryByRole('button', { name: /Verify/i })).not.toBeInTheDocument()
            expect(getByRole('button', { name: /Reupload/i })).toBeEnabled()
        })
    })

    describe('display info alert', () => {
        test('should not render info alert if nothing uploaded', () => {
            const { queryAllByRole } = render(<RwdUploadSection activeStep={0} {...props} />)
            expect(queryAllByRole('alert')).toHaveLength(0)
        })

        test('should render 1 info alert if folder uploaded', () => {
            const customProps = { ...props, fileList, rootFolderName }
            const { getAllByRole } = render(<RwdUploadSection activeStep={1} {...customProps} />)
            expect(getAllByRole('alert')).toHaveLength(1)
        })

        test('should render 2 info alerts if proof uploaded', () => {
            const customProps = { ...props, fileList, rootFolderName, verificationProof }
            const { getAllByRole } = render(<RwdUploadSection activeStep={2} {...customProps} />)
            expect(getAllByRole('alert')).toHaveLength(2)
        })
    })

    describe('file input event', () => {
        // TODO add upload folder test
        test('should upload multiple files', async () => {
            const { getByTestId } = render(<RwdUploadSection activeStep={1} {...props} />)
            const input = getByTestId('upload-folder-input')
            const file1 = new File([['file1']], 'DSC_0053.JPG', {
                type: 'image/jpeg',
                webkitRelativePath: 'multiple files folder/DSC_0053.JPG',
            })

            const file2 = new File([['file2']], 'DSC_0054.JPG', {
                type: 'image/jpeg',
                webkitRelativePath: 'multiple files folder/DSC_0054.JPG',
            })

            fireEvent.change(input, {
                target: { files: [file1, file2] },
            })

            expect(await input.files[0]).toStrictEqual(file1)
            expect(await input.files[1]).toStrictEqual(file2)
            expect(await input.files).toHaveLength(2)
        })

        test('should upload one proof file', async () => {
            const { getByTestId } = render(<RwdUploadSection activeStep={2} {...props} />)
            const input = getByTestId('upload-proof-input')
            const file = new File([['file']], '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_131_R0_131_R5.itm', {
                type: 'application/json',
            })

            fireEvent.change(input, {
                target: { files: [file] },
            })

            expect(await input.files[0]).toStrictEqual(file)
            expect(await input.files).toHaveLength(1)
        })
    })
})
