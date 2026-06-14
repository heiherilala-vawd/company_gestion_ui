import { SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import MaintenanceForm from './storage/maintenances/MaintenanceForm'
import { Box, Typography } from '@mui/material'
import GenericCreate from '../generic/GenericCreate'

export default function MaintenanceActivity() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Faire une maintenance
      </Typography>
      <ResourceContextProvider value="maintenances">
        <GenericCreate
          title=" "
          transform={(data) => {
            const expense = { ...data.expense }
            if (!expense.description && expense._generated_desc) {
              expense.description = expense._generated_desc
            }
            delete expense._generated_desc
            const transformed: any = { ...data, expense }
            if (!transformed.description && expense.description) {
              transformed.description = expense.description
            }
            return transformed
          }}
        >
          <SimpleForm id="maintenance-activity-form" toolbar={<FormToolbar />}>
            <MaintenanceForm isCreate />
          </SimpleForm>
        </GenericCreate>
      </ResourceContextProvider>
    </Box>
  )
}
