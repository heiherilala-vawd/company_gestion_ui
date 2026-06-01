import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import FixedCostForm from './FixedCostForm'

export default function FixedCostEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="fixed-cost-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <FixedCostForm />
      </SimpleForm>
    </Edit>
  )
}
