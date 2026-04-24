import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin'

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
        <TextInput source="expense.id" label="Dépense id" />
        <TextInput source="departure_location" label="Lieu de départ" />
        <TextInput source="arrival_location" label="Lieu d'arrivée" />
        <DateInput source="departure_date" label="Date de départ" />
        <DateInput source="arrival_date" label="Date d'arrivée" />
      </SimpleForm>
    </Edit>
  )
}
