import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialForm from './MaterialForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function MaterialEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="material-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialForm />
      </SimpleForm>
    </GenericEdit>
  )
}
