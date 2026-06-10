import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeTypeForm from './IncomeTypeForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function IncomeTypeCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="income-type-create-form" toolbar={<FormToolbar />}>
        <IncomeTypeForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
