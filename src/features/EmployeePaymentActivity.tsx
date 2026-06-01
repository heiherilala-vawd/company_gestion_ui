import { Create, SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import EmployeePaymentForm from './money/employee_payments/EmployeePaymentForm'
import { Box, Typography } from '@mui/material'

export default function EmployeePaymentActivity() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Paiement salarié
      </Typography>
      <ResourceContextProvider value="employee_payments">
        <Create redirect="list" title=" ">
          <SimpleForm id="employee-payment-activity-form" toolbar={<FormToolbar />}>
            <EmployeePaymentForm isCreate />
          </SimpleForm>
        </Create>
      </ResourceContextProvider>
    </Box>
  )
}
