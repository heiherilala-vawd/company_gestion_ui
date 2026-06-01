import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import SupplierForm from './SupplierForm'

export default function SupplierCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="supplier-create-form" toolbar={<FormToolbar />}>
        <SupplierForm isCreate />
      </SimpleForm>
    </Create>
  )
}
