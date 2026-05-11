import { Create, SimpleForm } from 'react-admin'
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
      <SimpleForm>
        <IncomeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
