import { Edit, SimpleForm, TextInput } from 'react-admin'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <BankFeeForm />
      </SimpleForm>
    </Edit>
  )
}
