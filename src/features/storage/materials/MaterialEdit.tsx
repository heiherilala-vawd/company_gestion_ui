import { Edit, SimpleForm, TextInput } from 'react-admin'
import MaterialForm from './MaterialForm'

export default function MaterialEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <MaterialForm />
      </SimpleForm>
    </Edit>
  )
}
