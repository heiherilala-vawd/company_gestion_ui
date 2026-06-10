import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseTypeForm from './OtherExpenseTypeForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function OtherExpenseTypeCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="other-expense-type-create-form" toolbar={<FormToolbar />}>
        <OtherExpenseTypeForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
