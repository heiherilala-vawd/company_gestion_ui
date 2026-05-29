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
import FormToolbar from '../generic/FormToolbar'
import IncomeForm from './money/incomes/IncomeForm.tsx'
import generateId from '../utili/utils.tsx'
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'

function LoanForm() {
  return (
    <>
      <TextInput source="id" readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
      <TextInput source="lender" label="Prêteur" data-testid="input-lender" />
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <NumberInput
        source="interest_rate"
        label="Taux d'intérêt annuel (en points de base)"
        data-testid="input-interest_rate"
      />
      <DateTimeInput
        source="start_date"
        label="Date de début"
        defaultValue={new Date().toISOString()}
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      <TextInput source="status" readOnly defaultValue="ACTIVE" sx={{ display: 'none' }} />
    </>
  )
}

export default function IncomesActivity() {
  useNavigate()
  const [entityType, setEntityType] = useState<'income' | 'loan'>('income')

  const handleEntityChange = (_: any, value: 'income' | 'loan' | null) => {
    if (value) setEntityType(value)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Gestion des revenus et emprunts
      </Typography>

      <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange} sx={{ mb: 3 }}>
        <ToggleButton value="income">Revenus</ToggleButton>
        <ToggleButton value="loan">Emprunts</ToggleButton>
      </ToggleButtonGroup>

      {entityType === 'income' ? (
        <ResourceContextProvider value="incomes">
          <Create
            redirect="list"
            title=" "
            transform={(data) => ({
              ...data,
              job_id: localStorage.getItem('currentJobId'),
            })}
          >
            <SimpleForm toolbar={<FormToolbar />}>
              <IncomeForm isCreate />
            </SimpleForm>
          </Create>
        </ResourceContextProvider>
      ) : (
        <ResourceContextProvider value="loans">
          <Create
            redirect="list"
            title=" "
            transform={(data) => ({
              ...data,
              job_id: localStorage.getItem('currentJobId'),
            })}
          >
            <SimpleForm toolbar={<FormToolbar />}>
              <LoanForm />
            </SimpleForm>
          </Create>
        </ResourceContextProvider>
      )}
    </Box>
  )
}
