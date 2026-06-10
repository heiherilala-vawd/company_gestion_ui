import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import SupplierForm from './SupplierForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function SupplierCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="supplier-create-form" toolbar={<FormToolbar />}>
        <SupplierForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
