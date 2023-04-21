import React from 'react'
import { render } from '../../../../test.utils'
import VerifyDetailTable from '../../../../../component/page/RawDataVerification/VerifyDetailTable/VerifyDetailTable'
import { detailData } from '../../../../resource/rawDataVerificationDetailData'

const props = { detailData }

describe('VerifyDetailTable', () => {
    describe('render elements', () => {
        test('should render title', () => {
            const { getByText } = render(<VerifyDetailTable {...props} />)
            expect(getByText(/Verify Detail/i)).toBeInTheDocument()
        })

        test('should render table and content', () => {
            const { getByRole, getAllByRole } = render(<VerifyDetailTable {...props} />)
            expect(getByRole('table', { name: 'sticky table' })).toBeInTheDocument()
            expect(getAllByRole('cell')[0]).toHaveTextContent(/Uploaded Data File Name/i)
        })
    })
})
