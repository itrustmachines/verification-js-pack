import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '../../../test.utils'
import VerifyStepper from '../../../../component/common/VerifyStepper/VerifyStepper'

describe('VerifyStepper', () => {
    describe('render stepper and steps', () => {
        test('should render stepper and 3 steps', () => {
            const { getByTestId, getAllByTestId } = render(<VerifyStepper activeStep={0} />)
            expect(getByTestId('stepper')).toBeInTheDocument()
            expect(getAllByTestId('step')).toHaveLength(3)
        })

        test('should render step title on raw data verification page', () => {
            const route = '/rawDataVerification'
            const { getAllByTestId } = render(
                <MemoryRouter initialEntries={[route]}>
                    <VerifyStepper activeStep={0} />
                </MemoryRouter>,
            )
            const steps = getAllByTestId('step')
            expect(steps[0]).toHaveTextContent(/Upload File to Verify/i)
            expect(steps[1]).toHaveTextContent(/Upload Off-chain Proof/i)
            expect(steps[2]).toHaveTextContent(/Verify/i)
        })

        test('should render step title on file set verification page', () => {
            const route = '/fileSetVerification'
            const { getAllByTestId } = render(
                <MemoryRouter initialEntries={[route]}>
                    <VerifyStepper activeStep={0} />
                </MemoryRouter>,
            )
            const steps = getAllByTestId('step')
            expect(steps[0]).toHaveTextContent(/Upload Folder to Verify/i)
            expect(steps[1]).toHaveTextContent(/Upload Off-chain Proof/i)
            expect(steps[2]).toHaveTextContent(/Verify/i)
        })
    })

    describe('render step icon content', () => {
        test('should render specific icon on step 1', () => {
            const { getAllByTestId } = render(<VerifyStepper activeStep={0} />)
            const steps = getAllByTestId('step')
            expect(steps[0]).toHaveTextContent(1)
            expect(steps[1]).toHaveTextContent(2)
            expect(steps[2]).toHaveTextContent(3)
        })

        test('should render specific icon on step 2', () => {
            const { getAllByTestId } = render(<VerifyStepper activeStep={1} />)
            const steps = getAllByTestId('step')
            // TODO update in MUI v5
            // expect(steps[0]).toContainElement(getAllByTestId('CheckCircleIcon'))
            expect(steps[1]).toHaveTextContent(2)
            expect(steps[2]).toHaveTextContent(3)
        })

        test('should render specific icon on step 3', () => {
            const { getAllByTestId } = render(<VerifyStepper activeStep={2} />)
            const steps = getAllByTestId('step')
            // TODO update in MUI v5
            // expect(steps[0]).toContainElement(getByTestId('CheckCircleIcon'))
            // expect(steps[1]).toContainElement(getByTestId('CheckCircleIcon'))
            expect(steps[2]).toHaveTextContent(3)
        })

        // TODO update in MUI v5
        // test('should render specific icon when process complete', () => {
        //     const { getAllByTestId } = render(<VerifyStepper activeStep={3} />)
        //     const steps = getAllByTestId('step')
        //     expect(steps[0]).toContainElement(getByTestId('CheckCircleIcon'))
        //     expect(steps[1]).toContainElement(getByTestId('CheckCircleIcon'))
        //     expect(steps[2]).toContainElement(getByTestId('CheckCircleIcon'))
        // })
    })
})
