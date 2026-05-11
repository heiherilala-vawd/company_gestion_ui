// companies/CompanyEdit.tsx
import { Edit, SimpleForm, TextInput } from 'react-admin'
import CompanyForm from './CompanyForm.tsx'

export default function CompanyEdit() {
  return (
    <Edit>
      <SimpleForm redirect="list">
        <TextInput source="id" sx={{ display: 'none' }} />
        <CompanyForm />
      </SimpleForm>
    </Edit>
  )
}
