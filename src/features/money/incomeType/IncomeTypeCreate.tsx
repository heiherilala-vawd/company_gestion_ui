import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeTypeForm from './IncomeTypeForm'

export default function IncomeTypeCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="income-type-create-form" toolbar={<FormToolbar />}>
        <IncomeTypeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
