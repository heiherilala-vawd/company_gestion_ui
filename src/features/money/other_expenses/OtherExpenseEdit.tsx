import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

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
        <ReferenceInput source="expense_id" reference="expenses">
          <SelectInput optionText="description" />
        </ReferenceInput>
        <TextInput source="description" label="Description" multiline />
      </SimpleForm>
    </Edit>
  )
}
