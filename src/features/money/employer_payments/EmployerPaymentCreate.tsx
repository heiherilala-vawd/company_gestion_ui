import { Create, SimpleForm } from 'react-admin'
import EmployerPaymentForm from './EmployerPaymentForm'

export default function EmployerPaymentCreate() {
  return (
    <Create>
      <SimpleForm>
        <EmployerPaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
