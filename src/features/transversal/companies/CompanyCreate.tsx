import { Create, SimpleForm } from 'react-admin'
import CompanyForm from './CompanyForm'

export default function CompanyCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <CompanyForm isCreate />
      </SimpleForm>
    </Create>
  )
}
