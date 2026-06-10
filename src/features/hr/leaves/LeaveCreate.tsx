import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveForm from './LeaveForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function LeaveCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="leave-create-form" toolbar={<FormToolbar />}>
        <LeaveForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
