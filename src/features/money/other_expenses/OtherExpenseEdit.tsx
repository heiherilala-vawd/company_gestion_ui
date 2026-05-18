import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        select: (data) => ({
          ...data,
          other_expense_type_id: data.other_expense_type?.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
