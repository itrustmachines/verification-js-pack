import React from 'react'
import { render } from '../../../../test.utils'
import UploadSection from '../../../../../component/page/FileSetVerification/UploadSection/UploadSection'

const props = {
    handleDetailDataChange: jest.fn(),
    handleInProgress: jest.fn(),
    handleProgressDone: jest.fn(),
}

describe('UploadSection', () => {
    test('should render stepper', () => {
        const { getByTestId } = render(<UploadSection {...props} />)
        expect(getByTestId('stepper')).toBeInTheDocument()
    })

    test('should render folder uploader on step 1', () => {
        const { getByTestId } = render(<UploadSection {...props} />)
        expect(getByTestId('folder-uploader')).toBeInTheDocument()
    })

    test.todo('should render proof uploader on step 2')
    test.todo('should render uploaded info section on step 3')
    test.todo('should render buttons')
})
