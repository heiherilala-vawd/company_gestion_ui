import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseForm from './OtherExpenseForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function OtherExpenseEdit() {
  return (
    <GenericEdit
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return data
      }}
      queryOptions={{
        select: (data) => ({
          ...data,
          other_expense_type_id: data.other_expense_type?.id,
        }),
      }}
    >
      <SimpleForm id="other-expense-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseForm />
      </SimpleForm>
    </GenericEdit>
  )
}
