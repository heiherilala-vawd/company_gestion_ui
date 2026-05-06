import { Edit, SimpleForm, TextInput } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <OtherExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
