import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialConsumptionForm from './MaterialConsumptionForm'

export default function MaterialConsumptionCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <MaterialConsumptionForm isCreate />
      </SimpleForm>
    </Create>
  )
}
