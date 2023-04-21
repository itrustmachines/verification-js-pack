import React from 'react'
import { render, screen } from '../../test.utils'
import UploadedInfoAlert from '../../../component/common/UploadedInfoAlert'

const props = {
    uploadedFiles: [
        {
            path: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm',
            lastModified: 1666678055988,
            lastModifiedDate: 'Tue Oct 25 2022 14:07:35 GMT+0800 (GMT+08:00)',
            name: '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm',
            size: 34465,
            type: '',
        },
    ],
}

describe('UploadedInfoAlert', () => {
    test('should show specific uploaded proof info', () => {
        render(<UploadedInfoAlert {...props} />)
        const alertContent = screen.getByTestId('uploaded-proof-info')
        expect(alertContent).toHaveTextContent(
            '0xdea7119c372b33f62b00d430e26b9f4383fcbfbd_102_R0_119_R0.itm - 34465 bytes',
        )
    })

    test('should have info severity', () => {
        render(<UploadedInfoAlert {...props} />)
        const alert = screen.getByRole('alert')
        expect(alert).toHaveClass('MuiAlert-standardInfo')
    })
})
