import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanForm from './LoanForm'

export default function LoanCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm id="loan-create-form" toolbar={<FormToolbar />}>
        <LoanForm isCreate />
      </SimpleForm>
    </Create>
  )
}
