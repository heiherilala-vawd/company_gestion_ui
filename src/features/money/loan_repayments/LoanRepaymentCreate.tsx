import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanRepaymentForm from './LoanRepaymentForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function LoanRepaymentCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        loan_id: localStorage.getItem('currentLoanId'),
      })}
    >
      <SimpleForm id="loan-repayment-create-form" toolbar={<FormToolbar />}>
        <LoanRepaymentForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
