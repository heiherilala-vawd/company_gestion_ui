import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeForm from './IncomeForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function IncomeCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm id="income-create-form" toolbar={<FormToolbar />}>
        <IncomeForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
