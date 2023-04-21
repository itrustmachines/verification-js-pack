import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '../../test.utils'
import UploadedInfoSection from '../../../component/common/UploadedInfoSection'

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
    verificationProof: [
        {
            path: 'DSC_0077.JPG_102_0.itm',
            lastModified: 1666055225289,
            name: 'DSC_0077.JPG_102_0.itm',
            size: 3070,
            type: 'application/json',
        },
    ],
    isVerifyFileName: true,
    handleCheckboxChange: jest.fn(),
}

describe('UploadedInfoSection', () => {
    describe('render titles on each page', () => {
        test('should render title on raw data verification page', () => {
            const route = '/rawDataVerification'
            const { getByText } = render(
                <MemoryRouter initialEntries={[route]}>
                    <UploadedInfoSection {...props} />
                </MemoryRouter>,
            )
            expect(getByText(/Uploaded File to Verify/i)).toBeInTheDocument()
            expect(getByText(/Uploaded Off-chain Proof/i)).toBeInTheDocument()
        })

        test('should render title on file set verification page', () => {
            const route = '/fileSetVerification'
            const { getByText } = render(
                <MemoryRouter initialEntries={[route]}>
                    <UploadedInfoSection {...props} />
                </MemoryRouter>,
            )
            expect(getByText(/Folder to Verify/i)).toBeInTheDocument()
            expect(getByText(/Uploaded Off-chain Proof/i)).toBeInTheDocument()
        })
    })

    describe('render verify file name checkbox on raw data verification page', () => {
        test('should render a checkbox and two alerts', () => {
            const route = '/rawDataVerification'
            const { getByRole, getAllByRole } = render(
                <MemoryRouter initialEntries={[route]}>
                    <UploadedInfoSection {...props} />
                </MemoryRouter>,
            )
            expect(getByRole('checkbox', { name: /Verify file name/i })).toBeInTheDocument()
            expect(getAllByRole('alert')).toHaveLength(2)
        })
    })
})
