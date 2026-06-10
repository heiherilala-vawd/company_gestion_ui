import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SimpleForm,
  ResourceContextProvider,
  TextInput,
  NumberInput,
  DateTimeInput,
} from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import IncomeForm from './money/incomes/IncomeForm.tsx'
import { renderOrganizationSelect } from '../generic/SelectWithCreateProvider.tsx'
import generateId from '../utili/utils.tsx'
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import GenericCreate from '../generic/GenericCreate'

function LoanForm() {
  return (
    <>
      <TextInput source="id" sx={{ display: 'none' }} defaultValue={generateId()} />
      {renderOrganizationSelect('organization_id', 'Prêteur')}
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <NumberInput
        source="interest_rate"
        label="Taux d'intérêt (% par mois)"
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
      <TextInput source="status" sx={{ display: 'none' }} defaultValue="ACTIVE" />
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
          <GenericCreate
            title=" "
            transform={(data) => ({
              ...data,
              job_id: localStorage.getItem('currentJobId'),
            })}
          >
            <SimpleForm id="income-activity-form" toolbar={<FormToolbar />}>
              <IncomeForm isCreate />
            </SimpleForm>
          </GenericCreate>
        </ResourceContextProvider>
      ) : (
        <ResourceContextProvider value="loans">
          <GenericCreate
            title=" "
            transform={(data) => ({
              ...data,
              job_id: localStorage.getItem('currentJobId'),
            })}
          >
            <SimpleForm id="loan-activity-form" toolbar={<FormToolbar />}>
              <LoanForm />
            </SimpleForm>
          </GenericCreate>
        </ResourceContextProvider>
      )}
    </Box>
  )
}
