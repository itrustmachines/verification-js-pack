import React from 'react'
import { fireEvent, render } from '../../../test.utils'
import StepperButton from '../../../../component/common/VerifyStepper/StepperButton'

const defaultProps = {
    onBackButtonClick: jest.fn(),
    handleVerify: jest.fn(),
    handleReset: jest.fn(),
}

describe('StepperButton', () => {
    const renderStepperButton = (activeStep) => {
        const props = { ...defaultProps, activeStep }
        const { queryAllByRole, queryByRole } = render(<StepperButton {...props} />)

        return {
            buttons: queryAllByRole('button'),
            backButton: queryByRole('button', { name: /Back/i }),
            verifyButton: queryByRole('button', { name: /Verify/i }),
            reuploadButton: queryByRole('button', { name: /Reupload/i }),
        }
    }

    test('should not render any button on step 1', () => {
        const { buttons } = renderStepperButton(0)
        expect(buttons).toHaveLength(0)
    })

    test('should render back button on step 2', () => {
        const { backButton } = renderStepperButton(1)
        expect(backButton).toBeInTheDocument()

        fireEvent.click(backButton)

        expect(defaultProps.onBackButtonClick).toHaveBeenCalledTimes(1)
    })

    test('should render back button and verify button on step 3', () => {
        const { backButton, verifyButton } = renderStepperButton(2)
        expect(backButton).toBeInTheDocument()
        expect(verifyButton).toBeInTheDocument()

        fireEvent.click(backButton)
        expect(defaultProps.onBackButtonClick).toHaveBeenCalledTimes(1)

        fireEvent.click(verifyButton)
        expect(defaultProps.handleVerify).toHaveBeenCalledTimes(1)
    })

    test('should render reupload button when process complete', () => {
        const { reuploadButton } = renderStepperButton(3)
        expect(reuploadButton).toBeInTheDocument()

        fireEvent.click(reuploadButton)

        expect(defaultProps.handleReset).toHaveBeenCalledTimes(1)
    })
})
