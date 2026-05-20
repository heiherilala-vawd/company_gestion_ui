import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LeaveForm from './LeaveForm'

export default function LeaveCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <LeaveForm isCreate />
      </SimpleForm>
    </Create>
  )
}
