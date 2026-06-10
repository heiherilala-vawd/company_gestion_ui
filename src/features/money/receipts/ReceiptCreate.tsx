import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ReceiptForm from './ReceiptForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function ReceiptCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        income_id: localStorage.getItem('currentIncomeId'),
      })}
    >
      <SimpleForm id="receipt-create-form" toolbar={<FormToolbar />}>
        <ReceiptForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
