import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskForm from './TaskForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function TaskCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="task-create-form" toolbar={<FormToolbar />}>
        <TaskForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
