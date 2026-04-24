import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput } from 'react-admin'

export default function TravelExpenseCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="expense_id" label="Dépense" reference="expenses">
          <SelectInput source="description" optionText="description" />
        </ReferenceInput>
        <TextInput source="departure_location" label="Lieu de départ" />
        <TextInput source="arrival_location" label="Lieu d'arrivée" />
        <DateInput source="departure_date" label="Date de départ" />
        <DateInput source="arrival_date" label="Date d'arrivée" />
      </SimpleForm>
    </Create>
  )
}
