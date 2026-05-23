import {
  List,
  TextField,
  NumberField,
  SelectField,
  DateField,
  DateTimeInput,
  SearchInput,
  TextInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'
import { TransportStatus } from '../../../../gen-ts/src/models/TransportStatus'
import { ResponsiveDatagrid } from '../../../../generic/ResponsiveDatagrid'

const TravelEquipmentFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="equipment_id" reference="equipment" perPage={100}>
    <SelectInput optionText="name" label="Équipement" />
  </ReferenceInput>,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100}>
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
  <TextInput source="quantity" label="Quantité" />,
  <SelectInput
    source="status"
    label="Statut"
    choices={Object.entries(TransportStatus).map(([k, v]) => ({ id: v, name: k }))}
  />,
  <ReferenceInput source="arrival_location" reference="warehouses" perPage={100}>
    <SelectInput optionText="name" label="Lieu d'arrivée" />
  </ReferenceInput>,
  <DateTimeInput source="arrival_date_min" label="Date arrivée min" parse={(v: string) => (v ? `${v}:00Z` : v)} />,
  <DateTimeInput source="arrival_date_max" label="Date arrivée max" parse={(v: string) => (v ? `${v}:00Z` : v)} />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function TravelEquipmentList() {
  return (
    <List resource="travel_equipment" filters={TravelEquipmentFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment.name', 'arrival_date', 'status', 'travel']}>
        <FunctionField
          source="travel"
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <DateField source="arrival_date" label="Date d'arrivée" />
        <NumberField source="quantity" label="Quantité" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'LOST', name: 'Perdu' },
            { id: 'ARRIVED', name: 'Arrivé' },
          ]}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
