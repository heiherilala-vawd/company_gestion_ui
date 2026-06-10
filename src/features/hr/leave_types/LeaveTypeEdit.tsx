import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveTypeForm from './LeaveTypeForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function LeaveTypeEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="leave-type-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LeaveTypeForm />
      </SimpleForm>
    </GenericEdit>
  )
}
