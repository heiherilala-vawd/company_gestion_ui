import { Edit, SimpleForm, TextInput } from 'react-admin'
import MaterialForm from './MaterialForm'

export default function MaterialEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialForm />
      </SimpleForm>
    </Edit>
  )
}
