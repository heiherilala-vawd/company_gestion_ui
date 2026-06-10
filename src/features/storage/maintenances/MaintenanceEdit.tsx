import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceForm from './MaintenanceForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function MaintenanceEdit() {
  return (
    <GenericEdit
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return data
      }}
    >
      <SimpleForm id="maintenance-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaintenanceForm />
      </SimpleForm>
    </GenericEdit>
  )
}
