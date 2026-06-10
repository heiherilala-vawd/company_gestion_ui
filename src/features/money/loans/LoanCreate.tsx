import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanForm from './LoanForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function LoanCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm id="loan-create-form" toolbar={<FormToolbar />}>
        <LoanForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
