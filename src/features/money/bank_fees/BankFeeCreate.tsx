import { Create, SimpleForm } from 'react-admin'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <BankFeeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
