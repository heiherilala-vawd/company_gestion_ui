import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceForm from './MaintenanceForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function MaintenanceCreate() {
  return (
    <GenericCreate
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return data
      }}
    >
      <SimpleForm id="maintenance-create-form" toolbar={<FormToolbar />}>
        <MaintenanceForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
