import { Create, SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import PurchaseForm from './money/purchases/PurchaseForm'
import { Box, Typography } from '@mui/material'

export default function PurchaseMaterialActivity() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Nouvelle Opération d'Achat Matériau
      </Typography>
      <ResourceContextProvider value="purchases">
        <Create
          redirect="list"
          title=" "
          transform={(data) => ({
            ...data,
            quantity: data.quantity ? data.quantity : 1,
            supplier: { id: data.supplier_id },
            expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
          })}
        >
          <SimpleForm id="purchase-material-activity-form" toolbar={<FormToolbar />}>
            <PurchaseForm isCreate isMaterial />
          </SimpleForm>
        </Create>
      </ResourceContextProvider>
    </Box>
  )
}
