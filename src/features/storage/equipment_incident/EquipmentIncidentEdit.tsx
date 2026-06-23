import { Edit, SimpleForm } from 'react-admin'
import EquipmentIncidentForm from './EquipmentIncidentForm'

export default function EquipmentIncidentEdit() {
  return (
    <Edit title="Modifier un incident">
      <SimpleForm>
        <EquipmentIncidentForm />
      </SimpleForm>
    </Edit>
  )
}
