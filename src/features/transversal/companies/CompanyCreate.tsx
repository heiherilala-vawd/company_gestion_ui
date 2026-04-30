import { Create, SimpleForm } from 'react-admin'
import CompanyForm from './CompanyForm'

export default function CompanyCreate() {
  return (
    <Create>
      <SimpleForm>
        <CompanyForm isCreate />
      </SimpleForm>
    </Create>
  )
}
