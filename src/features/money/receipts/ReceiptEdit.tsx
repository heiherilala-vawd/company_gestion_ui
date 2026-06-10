import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ReceiptForm from './ReceiptForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function ReceiptEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          income_id: data.income?.id,
        }),
      }}
    >
      <SimpleForm id="receipt-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <ReceiptForm />
      </SimpleForm>
    </GenericEdit>
  )
}
