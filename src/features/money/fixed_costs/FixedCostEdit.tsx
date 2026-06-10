import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import FixedCostForm from './FixedCostForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function FixedCostEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="fixed-cost-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <FixedCostForm />
      </SimpleForm>
    </GenericEdit>
  )
}
