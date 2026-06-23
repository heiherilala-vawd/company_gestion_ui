import { Create, SimpleForm } from 'react-admin'
import EquipmentIncidentForm from './EquipmentIncidentForm'

export default function EquipmentIncidentCreate() {
  return (
    <Create title="Créer un incident">
      <SimpleForm>
        <EquipmentIncidentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
