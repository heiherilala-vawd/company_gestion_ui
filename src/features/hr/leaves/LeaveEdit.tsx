import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveForm from './LeaveForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function LeaveEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          user_id: data.user?.id,
          leave_type_id: data.leave_type?.id,
        }),
      }}
    >
      <SimpleForm id="leave-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LeaveForm />
      </SimpleForm>
    </GenericEdit>
  )
}
