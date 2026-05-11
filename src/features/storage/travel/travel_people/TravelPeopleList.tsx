import {
  List,
  TextField,
  DateField,
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
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100} alwaysOn>
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <ReferenceInput source="user_id" reference="users" perPage={100}>
    <SelectInput optionText={(r: any) => `${r.first_name} ${r.last_name}`} label="Utilisateur" />
  </ReferenceInput>,
  <TextInput source="arrival_location" label="Lieu d'arrivée" />,
  <TextInput source="arrival_date_min" label="Date arrivée min" />,
  <TextInput source="arrival_date_max" label="Date arrivée max" />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function TravelPeopleList() {
  return (
    <List resource="travel_people" filters={TravelPeopleFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={[
          'arrival_location.name',
          'arrival_date',
          'user.first_name',
          'user.last_name',
        ]}
      >
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <DateField source="arrival_date" label="Date d'arrivée" />
        <TextField source="user.first_name" label="Prénom" />
        <TextField source="user.last_name" label="Nom" />
        <FunctionField
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
