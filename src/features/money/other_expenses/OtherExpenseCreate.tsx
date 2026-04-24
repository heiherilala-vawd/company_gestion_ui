import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

export default function OtherExpenseCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="expense_id" label="Dépense" reference="expenses">
          <SelectInput source="description" optionText="description" />
        </ReferenceInput>
        <TextInput source="description" label="Description" multiline />
      </SimpleForm>
    </Create>
  )
}
