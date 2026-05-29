import {
  List,
  TextField,
  DateField,
  SearchInput,
  ReferenceInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TravelExpenseFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <ReferenceInput
    source="departure_location"
    reference="warehouses"
    perPage={100}
    key="departure_location"
  >
    <SelectInput optionText="name" label="Départ" />
  </ReferenceInput>,
  <ReferenceInput
    source="arrival_location"
    reference="warehouses"
    perPage={100}
    key="arrival_location"
  >
    <SelectInput optionText="name" label="Arrivée" />
  </ReferenceInput>,
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
      </ResponsiveDatagrid>
    </List>
  )
}
