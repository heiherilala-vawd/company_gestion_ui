import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialConsumptionForm from './MaterialConsumptionForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function MaterialConsumptionEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="material-consumption-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialConsumptionForm />
      </SimpleForm>
    </GenericEdit>
  )
}
