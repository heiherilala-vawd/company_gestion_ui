import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskForm from './TaskForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function TaskEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="task-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TaskForm />
      </SimpleForm>
    </GenericEdit>
  )
}
