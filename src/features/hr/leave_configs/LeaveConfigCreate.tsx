import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveConfigForm from './LeaveConfigForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function LeaveConfigCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="leave-config-create-form" toolbar={<FormToolbar />}>
        <LeaveConfigForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
