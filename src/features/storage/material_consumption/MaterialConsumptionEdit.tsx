import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialConsumptionForm from './MaterialConsumptionForm'

export default function MaterialConsumptionEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialConsumptionForm />
      </SimpleForm>
    </Edit>
  )
}
