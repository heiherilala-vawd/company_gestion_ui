import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import FixedCostForm from './FixedCostForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function FixedCostCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="fixed-cost-create-form" toolbar={<FormToolbar />}>
        <FixedCostForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
