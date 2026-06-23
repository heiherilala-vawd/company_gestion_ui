import {
  List,
  TextField,
  DateField,
  SearchInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentIncidentFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <ReferenceInput source="equipment_id" reference="equipment" perPage={100} key="equipment_id">
    <SelectInput optionText="name" label="Équipement" />
  </ReferenceInput>,
  <SelectInput
    source="incident_type"
    label="Type d'incident"
    key="incident_type"
    choices={[
      { id: 'DAMAGED', name: 'Endommagé' },
      { id: 'LOST', name: 'Perdu' },
    ]}
  />,
  <ReferenceInput source="user_id" reference="users" perPage={100} key="user_id">
    <SelectInput optionText="first_name" label="Utilisateur" />
  </ReferenceInput>,
  <ReferenceInput source="travel_id" reference="travel_expenses" perPage={100} key="travel_id">
    <SelectInput optionText="expense.description" label="Voyage" />
  </ReferenceInput>,
]

export default function EquipmentIncidentList() {
  return (
    <List resource="equipment_incident" filters={EquipmentIncidentFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment_id', 'incident_type', 'created_at']}>
        <TextField source="equipment_id" label="Équipement ID" />
        <FunctionField
          label="Type"
          render={(record: any) => (record.incident_type === 'DAMAGED' ? 'Endommagé' : 'Perdu')}
        />
        <TextField source="user_id" label="Utilisateur ID" />
        <TextField source="travel_id" label="Voyage ID" />
        <DateField source="created_at" label="Créé le" showTime />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
