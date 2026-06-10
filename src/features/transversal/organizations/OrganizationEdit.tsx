import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OrganizationForm from './OrganizationForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function OrganizationEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="organization-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OrganizationForm />
      </SimpleForm>
    </GenericEdit>
  )
}
