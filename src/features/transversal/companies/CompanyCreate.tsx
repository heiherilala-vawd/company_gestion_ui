import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CompanyForm from './CompanyForm'

export default function CompanyCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <CompanyForm isCreate />
      </SimpleForm>
    </Create>
  )
}
