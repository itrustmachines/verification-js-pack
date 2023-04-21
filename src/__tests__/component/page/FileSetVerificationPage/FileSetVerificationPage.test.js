import React from 'react'
import { render } from '../../../test.utils'
import FileSetVerificationPage from '../../../../component/page/FileSetVerification/FileSetVerificationPage'

describe('FileSetVerificationPage', () => {
    test('should render title', () => {
        const { getByText } = render(<FileSetVerificationPage />)
        expect(getByText(/File Set Verification/i)).toBeInTheDocument()
    })

    test('should render upload section stpper', () => {
        const { getByTestId } = render(<FileSetVerificationPage />)
        expect(getByTestId('stepper')).toBeInTheDocument()
    })
})
