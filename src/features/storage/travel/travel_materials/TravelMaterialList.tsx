import {
  List,
  TextField,
  NumberField,
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

const TravelMaterialFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="material_id" reference="materials" perPage={100}>
    <SelectInput optionText="name" label="Matériau" />
  </ReferenceInput>,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100}>
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <TextInput source="quantity" label="Quantité" />,
  <TextInput source="quantity_received" label="Qté reçue" />,
  <ReferenceInput source="arrival_location" reference="warehouses" perPage={100}>
    <SelectInput optionText="name" label="Lieu d'arrivée" />
  </ReferenceInput>,
  <DateTimeInput
    source="arrival_date_min"
    label="Date arrivée min"
    parse={(v: string) => (v ? `${v}:00Z` : v)}
  />,
  <DateTimeInput
    source="arrival_date_max"
    label="Date arrivée max"
    parse={(v: string) => (v ? `${v}:00Z` : v)}
  />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function TravelMaterialList() {
  return (
    <List resource="travel_materials" filters={TravelMaterialFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['material.name', 'travel', 'quantity_received', 'arrival_date']}
      >
        <FunctionField
          source="travel"
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <TextField source="material.name" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <NumberField source="quantity_received" label="Reçue" />
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <DateField source="arrival_date" label="Date d'arrivée" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
