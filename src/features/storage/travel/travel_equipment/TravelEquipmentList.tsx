import {
  List,
  TextField,
  NumberField,
  SelectField,
  DateField,
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
  <ReferenceInput source="equipment_id" reference="equipment" perPage={100} alwaysOn>
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
  <TextInput source="arrival_location" label="Lieu d'arrivée" />,
  <TextInput source="arrival_date_min" label="Date arrivée min" />,
  <TextInput source="arrival_date_max" label="Date arrivée max" />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function TravelEquipmentList() {
  return (
    <List resource="travel_equipment" filters={TravelEquipmentFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['equipment.name', 'quantity', 'status', 'arrival_location.name']}
      >
        <TextField source="equipment.name" label="Équipement" />
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
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <FunctionField
          label="Déplacement"
          render={(record) =>
            `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
          }
        />
        <DateField source="arrival_date" label="Date d'arrivée" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
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
      </ResponsiveDatagrid>
    </List>
  )
}
