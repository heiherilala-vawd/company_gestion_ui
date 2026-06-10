import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BankFeeForm from './BankFeeForm.tsx'
import GenericEdit from '../../../generic/GenericEdit'

export default function BankFeeEdit() {
  return (
    <GenericEdit
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return data
      }}
    >
      <SimpleForm id="bank-fee-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <BankFeeForm />
      </SimpleForm>
    </GenericEdit>
  )
}
