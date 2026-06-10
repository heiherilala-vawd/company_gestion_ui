import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialConsumptionForm from './MaterialConsumptionForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function MaterialConsumptionCreate() {
  return (
    <GenericCreate>
      <SimpleForm
        id="material-consumption-create-form"
        toolbar={<FormToolbar />}
        defaultValues={{ consumption_date: new Date(), consumption_status: 'IN_PROGRESS' }}
      >
        <MaterialConsumptionForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
