import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import VoitureForm from './VoitureForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function VoitureCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        warehouse_name: data.equipment_name,
      })}
    >
      <SimpleForm id="voiture-create-form" toolbar={<FormToolbar />}>
        <VoitureForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
