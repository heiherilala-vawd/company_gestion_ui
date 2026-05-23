import {
  List,
  TextField,
  DateField,
  DateTimeInput,
  SearchInput,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../../generic/ResponsiveDatagrid'

const TravelPeopleFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100}>
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <ReferenceInput source="user_id" reference="users" perPage={100}>
    <SelectInput optionText={(r: any) => `${r.first_name} ${r.last_name}`} label="Utilisateur" />
  </ReferenceInput>,
  <ReferenceInput source="arrival_location" reference="warehouses" perPage={100}>
    <SelectInput optionText="name" label="Lieu d'arrivée" />
  </ReferenceInput>,
  <DateTimeInput source="arrival_date_min" label="Date arrivée min" parse={(v: string) => (v ? `${v}:00Z` : v)} />,
  <DateTimeInput source="arrival_date_max" label="Date arrivée max" parse={(v: string) => (v ? `${v}:00Z` : v)} />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function TravelPeopleList() {
  return (
    <List resource="travel_people" filters={TravelPeopleFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['arrival_location.name', 'travel', 'user.first_name', 'user.last_name']}
      >
        <FunctionField
          source="travel"
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <TextField source="user.first_name" label="Prénom" />
        <TextField source="user.last_name" label="Nom" />
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <DateField source="arrival_date" label="Date d'arrivée" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
