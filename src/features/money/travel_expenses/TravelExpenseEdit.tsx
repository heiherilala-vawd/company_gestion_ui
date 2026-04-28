import { Edit, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput } from 'react-admin'

export default function TravelExpenseEdit() {
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
        <TextInput source="departure_location" label="Lieu de départ" />
        <TextInput source="arrival_location" label="Lieu d'arrivée" />
        <DateInput source="departure_date" label="Date de départ" />
        <DateInput source="arrival_date" label="Date d'arrivée" />
      </SimpleForm>
    </Edit>
  )
}
