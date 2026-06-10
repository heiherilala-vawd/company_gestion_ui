import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskScheduleForm from './TaskScheduleForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function TaskScheduleCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="task-schedule-create-form" toolbar={<FormToolbar />}>
        <TaskScheduleForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
