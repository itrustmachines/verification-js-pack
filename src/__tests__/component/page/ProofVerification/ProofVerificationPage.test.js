import React from 'react'
import { render } from '../../../test.utils'
import { renderHook } from '@testing-library/react-hooks'
import ProofVerificationPage from '../../../../component/page/ProofVerification/ProofVerificationPage'

// jest.mock('./UploadSection/UploadeSection', () => {
//     return <mock-modal data-testid="upload-section" />
// })

describe('ProofVerificationPage', () => {
    test('should render title', () => {
        const { getByText } = render(<ProofVerificationPage />)
        expect(getByText('Proof Verification')).toBeInTheDocument()
    })

    test('should render uploader', () => {
        const { getByTestId } = render(<ProofVerificationPage />)
        expect(getByTestId('proof-uploader')).toBeInTheDocument()
    })

    // test('should render detail section if there is detailData', () => {
    //     const { result } = renderHook(() => <ProofVerificationPage />)
    //     console.log('result.current: ', result.current)
    // })

    test.todo('should render detail section if there is detailData')
    test.todo('should show/hide backdrop')
})
