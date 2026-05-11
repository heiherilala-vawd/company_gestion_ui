import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeForm from './IncomeForm'

export default function IncomeCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <IncomeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
