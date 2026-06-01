import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseTypeForm from './OtherExpenseTypeForm'

export default function OtherExpenseTypeCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="other-expense-type-create-form" toolbar={<FormToolbar />}>
        <OtherExpenseTypeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
