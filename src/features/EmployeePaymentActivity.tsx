import { SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import EmployeePaymentForm from './money/employee_payments/EmployeePaymentForm'
import { Box, Typography } from '@mui/material'
import GenericCreate from '../generic/GenericCreate'

export default function EmployeePaymentActivity() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Paiement salarié
      </Typography>
      <ResourceContextProvider value="employee_payments">
        <GenericCreate title=" ">
          <SimpleForm id="employee-payment-activity-form" toolbar={<FormToolbar />}>
            <EmployeePaymentForm isCreate />
          </SimpleForm>
        </GenericCreate>
      </ResourceContextProvider>
    </Box>
  )
}
