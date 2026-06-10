import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskScheduleForm from './TaskScheduleForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function TaskScheduleEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="task-schedule-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TaskScheduleForm />
      </SimpleForm>
    </GenericEdit>
  )
}
