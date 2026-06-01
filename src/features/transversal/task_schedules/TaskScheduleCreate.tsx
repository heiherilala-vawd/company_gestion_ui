import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TaskScheduleForm from './TaskScheduleForm'

export default function TaskScheduleCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="task-schedule-create-form" toolbar={<FormToolbar />}>
        <TaskScheduleForm isCreate />
      </SimpleForm>
    </Create>
  )
}
