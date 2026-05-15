import {
  List,
  TextField,
  NumberField,
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

const TravelMaterialFilters = [
  <ReferenceInput source="material_id" reference="materials" perPage={100} alwaysOn>
    <SelectInput optionText="name" label="Matériau" />
  </ReferenceInput>,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100}>
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <TextInput source="quantity" label="Quantité" />,
  <TextInput source="quantity_received" label="Qté reçue" />,
  <TextInput source="arrival_location" label="Lieu d'arrivée" />,
  <TextInput source="arrival_date_min" label="Date arrivée min" />,
  <TextInput source="arrival_date_max" label="Date arrivée max" />,
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
