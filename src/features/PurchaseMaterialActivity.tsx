import { SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import PurchaseForm from './money/purchases/PurchaseForm'
import { Box, Typography } from '@mui/material'
import GenericCreate from '../generic/GenericCreate'

export default function PurchaseMaterialActivity() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Nouvelle Opération d'Achat Matériau
      </Typography>
      <ResourceContextProvider value="purchases">
        <GenericCreate
          title=" "
          transform={(data) => {
            const expense = { ...data.expense, job_id: localStorage.getItem('currentJobId') }
            if (!expense.description && expense._generated_desc) {
              expense.description = expense._generated_desc
            }
            delete expense._generated_desc
            return {
              ...data,
              quantity: data.quantity ? data.quantity : 1,
              supplier: { id: data.supplier_id },
              expense,
            }
          }}
        >
          <SimpleForm
            id="purchase-material-activity-form"
            toolbar={<FormToolbar />}
            defaultValues={{ invoice_date: new Date(), due_date: new Date(), paid_at: new Date() }}
          >
            <PurchaseForm isCreate isMaterial />
          </SimpleForm>
        </GenericCreate>
      </ResourceContextProvider>
    </Box>
  )
}
