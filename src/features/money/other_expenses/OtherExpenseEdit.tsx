import { Edit, SimpleForm, TextInput } from 'react-admin'

export default function OtherExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="expense.id" label="Dépense id" />
        <TextInput source="description" label="Description" multiline />
      </SimpleForm>
    </Edit>
  )
}
