import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanRepaymentForm from './LoanRepaymentForm'

export default function LoanRepaymentCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        loan_id: localStorage.getItem('currentLoanId'),
      })}
    >
      <SimpleForm id="loan-repayment-create-form" toolbar={<FormToolbar />}>
        <LoanRepaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
