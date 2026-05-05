import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'

const TravelMaterialFilters = [
  <SearchInput source="material" alwaysOn />,
  <TextInput source="travel_id" label="Voyage" />,
]

export default function TravelMaterialList() {
  return (
    <List resource="travel_materials" filters={TravelMaterialFilters} perPage={25}>
      <Datagrid rowClick="show">
        <FunctionField
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <TextField source="arrival_location.name" label="Lieu d'arivé" />
        <DateField source="arrival_date" label="Date d'arivé" />
        <TextField source="material.name" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <NumberField source="quantity_received" label="Quantité reçue" />
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
