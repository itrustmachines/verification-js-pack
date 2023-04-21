import React from 'react'
import { render } from '../../../test.utils'
import RawDataVerificationPage from '../../../../component/page/RawDataVerification/RawDataVerificationPage'

describe('RawDataVerificationPage', () => {
    test('should render page title and upload section stepper', () => {
        const { getByText, getByTestId } = render(<RawDataVerificationPage />)
        expect(getByText(/Raw Data Verification/i)).toBeInTheDocument()
        expect(getByTestId('stepper')).toBeInTheDocument()
    })

    test.todo('should render detail section if there is detailData')
    test.todo('should show/hide backdrop')
})
