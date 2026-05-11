// companies/CompanyEdit.tsx
import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CompanyForm from './CompanyForm.tsx'

export default function CompanyEdit() {
  return (
    <Edit>
      <SimpleForm redirect="list" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CompanyForm />
      </SimpleForm>
    </Edit>
  )
}
