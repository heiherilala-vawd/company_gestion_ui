// companies/CompanyEdit.tsx
import { Edit, SimpleForm, TextInput } from 'react-admin'
import CompanyForm from './CompanyForm.tsx'

export default function CompanyEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <CompanyForm />
      </SimpleForm>
    </Edit>
  )
}
