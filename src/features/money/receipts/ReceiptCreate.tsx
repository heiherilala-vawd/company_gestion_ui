import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ReceiptForm from './ReceiptForm'

export default function ReceiptCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        income_id: localStorage.getItem('currentIncomeId'),
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <ReceiptForm isCreate />
      </SimpleForm>
    </Create>
  )
}
