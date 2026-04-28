import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
} from 'react-admin'

const TravelExpenseFilters = [
  <SearchInput source="departure_location" alwaysOn />,
  <TextInput source="arrival_location" label="Arrivée" />,
]

export default function TravelExpenseList() {
  return (
    <List resource="travel_expenses" filters={TravelExpenseFilters} perPage={25}>
      <Datagrid rowClick="show">
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="departure_location" label="Départ" />
        <TextField source="arrival_location" label="Arrivée" />
        <DateField source="departure_date" label="Date départ" showTime />
        <DateField source="arrival_date" label="Date arrivée" showTime />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
