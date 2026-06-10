import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OrganizationForm from './OrganizationForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function OrganizationCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="organization-create-form" toolbar={<FormToolbar />}>
        <OrganizationForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
