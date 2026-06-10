import { SimpleForm } from 'react-admin'
import { useSearchParams } from 'react-router-dom'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseForm from './PurchaseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function PurchaseCreate() {
  const [searchParams] = useSearchParams()
  const isEquipment =
    searchParams.get('isEquipment') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'equipment'
  const isMaterial =
    searchParams.get('isMaterial') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'material'

  return (
    <GenericCreate
      transform={(data) => {
        const expense = { ...data.expense, job_id: localStorage.getItem('currentJobId') }
        if (!expense.description && expense._generated_desc) {
          expense.description = expense._generated_desc
        }
        delete expense._generated_desc
        return {
          ...data,
          quantity: data.quantity ? data.quantity : 1,
          expense,
        }
      }}
    >
      <SimpleForm
        id="purchase-create-form"
        toolbar={<FormToolbar />}
        defaultValues={{ invoice_date: new Date(), due_date: new Date(), paid_at: new Date() }}
      >
        <PurchaseForm isCreate isEquipment={isEquipment} isMaterial={isMaterial} />
      </SimpleForm>
    </GenericCreate>
  )
}
