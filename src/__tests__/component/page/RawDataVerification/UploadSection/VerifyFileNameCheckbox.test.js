import React from 'react'
import { render, fireEvent } from '../../../../test.utils'
import VerifyFileNameCheckbox from '../../../../../component/page/RawDataVerification/UploadSection/VerifyFileNameCheckbox'

const props = {
    isVerifyFileName: true,
    handleCheckboxChange: jest.fn(),
}

describe('VerifyFileNameCheckbox', () => {
    test('should render checked checkbox', () => {
        const { getByRole } = render(<VerifyFileNameCheckbox {...props} />)
        expect(getByRole('checkbox', { name: /Verify file name/i })).toBeInTheDocument()
        expect(getByRole('checkbox', { name: /Verify file name/i })).toHaveProperty('checked', true)
    })

    test('should render unchecked checkbox', () => {
        const uncheckedProps = { ...props, isVerifyFileName: false }
        const { getByRole } = render(<VerifyFileNameCheckbox {...uncheckedProps} />)
        expect(getByRole('checkbox', { name: /Verify file name/i })).toHaveProperty('checked', false)
    })

    test('should trigger handleCheckboxChange() event', () => {
        const { getByRole } = render(<VerifyFileNameCheckbox {...props} />)

        fireEvent.click(getByRole('checkbox', { name: /Verify file name/i }))
        expect(props.handleCheckboxChange).toHaveBeenCalledTimes(1)

        fireEvent.click(getByRole('checkbox', { name: /Verify file name/i }))
        expect(props.handleCheckboxChange).toHaveBeenCalledTimes(2)
    })
})
