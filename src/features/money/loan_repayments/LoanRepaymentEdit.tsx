import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanRepaymentForm from './LoanRepaymentForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function LoanRepaymentEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          loan_id: data.loan?.id,
        }),
      }}
    >
      <SimpleForm id="loan-repayment-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LoanRepaymentForm />
      </SimpleForm>
    </GenericEdit>
  )
}
