import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveTypeForm from './LeaveTypeForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function LeaveTypeCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="leave-type-create-form" toolbar={<FormToolbar />}>
        <LeaveTypeForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
