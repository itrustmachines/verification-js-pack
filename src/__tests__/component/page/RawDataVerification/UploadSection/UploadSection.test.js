import React from 'react'
import { render } from '../../../../test.utils'
import UploadSection from '../../../../../component/page/RawDataVerification/UploadSection/UploadSection'

const props = {
    handleDetailDataChange: jest.fn(),
    handleBackdropOpen: jest.fn(),
    handleBackdropClose: jest.fn(),
}

describe('UploadSection', () => {
    describe('render elements', () => {
        test('should render stepper', () => {
            const { getByTestId } = render(<UploadSection {...props} />)
            expect(getByTestId('stepper')).toBeInTheDocument()
        })

        test.todo('should render file uploader on step 1')
        test.todo('should render proof uploader on step 2')
        test.todo('should render uploaded info section on step 3')
        test.todo('should render button')
    })
})
