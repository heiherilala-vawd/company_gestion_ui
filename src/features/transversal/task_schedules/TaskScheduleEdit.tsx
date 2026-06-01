import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskScheduleForm from './TaskScheduleForm'

export default function TaskScheduleEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="task-schedule-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TaskScheduleForm />
      </SimpleForm>
    </Edit>
  )
}
