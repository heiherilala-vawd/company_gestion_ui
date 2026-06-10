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
        <GenericCreate title=" ">
          <SimpleForm id="maintenance-activity-form" toolbar={<FormToolbar />}>
            <MaintenanceForm isCreate />
          </SimpleForm>
        </GenericCreate>
      </ResourceContextProvider>
    </Box>
  )
}
