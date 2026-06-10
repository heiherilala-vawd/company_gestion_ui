import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CompanyForm from './CompanyForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function CompanyCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="company-create-form" toolbar={<FormToolbar />}>
        <CompanyForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
