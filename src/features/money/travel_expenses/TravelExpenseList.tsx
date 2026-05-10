import {
  List,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TravelExpenseFilters = [
  <SearchInput source="departure_location" alwaysOn />,
  <TextInput source="arrival_location" label="Arrivée" />,
]

export default function TravelExpenseList() {
  return (
    <List resource="travel_expenses" filters={TravelExpenseFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={[
          'departure_location.name',
          'arrival_location.name',
          'departure_date',
          'expense.amount',
        ]}
      >
        <TextField source="departure_location.name" label="Départ" />
        <TextField source="arrival_location.name" label="Arrivée" />
        <DateField source="departure_date" label="Date départ" showTime />
        <TextField source="expense.amount" label="Montant" />
        <TextField source="expense.comment" label="Commentaire" />
        <DateField source="arrival_date" label="Date arrivée" showTime />
        <EditButton />
        <DeleteButton />
      </ResponsiveDatagrid>
    </List>
  )
}
