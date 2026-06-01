import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import FixedCostForm from './FixedCostForm'

export default function FixedCostCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="fixed-cost-create-form" toolbar={<FormToolbar />}>
        <FixedCostForm isCreate />
      </SimpleForm>
    </Create>
  )
}
