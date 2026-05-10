import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Create,
  SimpleForm,
  ResourceContextProvider,
  TextInput,
  NumberInput,
  DateTimeInput,
} from 'react-admin'
import IncomeForm from './money/incomes/IncomeForm.tsx'
import { renderJobSelect } from '../generic/SelectWithCreateProvider.tsx'
import generateId from '../utili/utils.tsx'
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function LoanForm() {
  return (
    <>
      <TextInput source="id" readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
      {renderJobSelect('job_id', 'Chantier')}
      <TextInput source="lender" label="Prêteur" />
      <NumberInput source="amount" label="Montant" />
      <NumberInput source="interest_rate" label="Taux d'intérêt annuel (en points de base)" />
      <DateTimeInput source="start_date" label="Date de début" defaultValue={new Date().toISOString()} data-testid="input-departure_date" />
      <TextInput source="description" label="Description" multiline rows={3} />
      <TextInput source="status" readOnly defaultValue="ACTIVE" sx={{ display: 'none' }} />
    </>
  )
}

export default function IncomesActivity() {
  const navigate = useNavigate()
  const [entityType, setEntityType] = useState<'income' | 'loan'>('income')

  const handleEntityChange = (_: any, value: 'income' | 'loan' | null) => {
    if (value) setEntityType(value)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Gestion des revenus et emprunts
      </Typography>

      <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange} sx={{ mb: 3 }}>
        <ToggleButton value="income">Revenus</ToggleButton>
        <ToggleButton value="loan">Emprunts</ToggleButton>
      </ToggleButtonGroup>

      {entityType === 'income' ? (
        <ResourceContextProvider value="incomes">
          <Create redirect={false} title=" ">
            <SimpleForm>
              <IncomeForm isCreate />
            </SimpleForm>
          </Create>
        </ResourceContextProvider>
      ) : (
        <ResourceContextProvider value="loans">
          <Create redirect={false} title=" ">
            <SimpleForm>
              <LoanForm />
            </SimpleForm>
          </Create>
        </ResourceContextProvider>
      )}
    </Box>
  )
}
