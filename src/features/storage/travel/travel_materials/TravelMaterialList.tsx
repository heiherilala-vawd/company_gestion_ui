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
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../../generic/ResponsiveDatagrid'

const TravelMaterialFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <ReferenceInput source="material_id" reference="materials" perPage={100} key="material_id">
    <SelectInput optionText="name" label="Matériau" />
  </ReferenceInput>,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100} key="travel_id">
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <TextInput source="quantity" label="Quantité" key="quantity" />,
  <TextInput source="quantity_received" label="Qté reçue" key="quantity_received" />,
  <ReferenceInput
    source="arrival_location"
    reference="warehouses"
    perPage={100}
    key="arrival_location"
  >
    <SelectInput optionText="name" label="Lieu d'arrivée" />
  </ReferenceInput>,
  <DateTimeInput
    source="arrival_date_min"
    label="Date arrivée min"
    key="arrival_date_min"
    parse={(v: string) => (v ? `${v}:00Z` : v)}
  />,
  <DateTimeInput
    source="arrival_date_max"
    label="Date arrivée max"
    key="arrival_date_max"
    parse={(v: string) => (v ? `${v}:00Z` : v)}
  />,
  <BooleanInput source="not_arrived" label="Non arrivé" key="not_arrived" />,
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
