import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskForm from './TaskForm'

export default function TaskCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TaskForm isCreate />
      </SimpleForm>
    </Create>
  )
}
