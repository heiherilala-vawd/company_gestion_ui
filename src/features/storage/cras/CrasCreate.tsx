import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CrasForm from './CrasForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function CrasCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        warehouse_name: data.equipment_name,
      })}
    >
      <SimpleForm id="cras-create-form" toolbar={<FormToolbar />}>
        <CrasForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
