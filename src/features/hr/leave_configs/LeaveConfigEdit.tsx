import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveConfigForm from './LeaveConfigForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function LeaveConfigEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="leave-config-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LeaveConfigForm />
      </SimpleForm>
    </GenericEdit>
  )
}
