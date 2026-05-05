import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'

const TravelPeopleFilters = [
  <SearchInput source="person_name" alwaysOn />,
  <TextInput source="travel_id" label="Voyage" />,
]

export default function TravelPeopleList() {
  return (
    <List resource="travel_people" filters={TravelPeopleFilters} perPage={25}>
      <Datagrid rowClick="show">
        <FunctionField
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <TextField source="arrival_location.name" label="Lieu d'arivé" />
        <DateField source="arrival_date" label="Date d'arivé" />
        <FunctionField
          label="Nom de la personne"
          render={(record) => (
            <span>
              {record.user?.first_name} {record.user?.last_name}
            </span>
          )}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        {/* Nom complet du modificateur */}
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
