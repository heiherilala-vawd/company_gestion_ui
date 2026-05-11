import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Create, SimpleForm, ResourceContextProvider } from 'react-admin'
import BankFeeForm from './money/bank_fees/BankFeeForm.tsx'
import EmployeePaymentForm from './money/employee_payments/EmployeePaymentForm.tsx'
import OtherExpenseForm from './money/other_expenses/OtherExpenseForm.tsx'
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function ExpensesActivity() {
  const navigate = useNavigate()
  const [entityType, setEntityType] = useState<'bank_fee' | 'employee_payment' | 'other_expense'>(
    'bank_fee',
  )

  const handleEntityChange = (_: any, value: any) => {
    if (value) setEntityType(value)
  }

  const resource =
    entityType === 'bank_fee'
      ? 'bank_fees'
      : entityType === 'employee_payment'
        ? 'employee_payments'
        : 'other_expenses'

  const FormComponent =
    entityType === 'bank_fee'
      ? BankFeeForm
      : entityType === 'employee_payment'
        ? EmployeePaymentForm
        : OtherExpenseForm

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1 }}>
        Retour
      </Button>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Dépenses
      </Typography>

      <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange} sx={{ mb: 3 }}>
        <ToggleButton value="bank_fee">Frais bancaires</ToggleButton>
        <ToggleButton value="employee_payment">Paiement salarié</ToggleButton>
        <ToggleButton value="other_expense">Autre dépense</ToggleButton>
      </ToggleButtonGroup>

      <ResourceContextProvider value={resource}>
        <Create redirect="list" title=" ">
          <SimpleForm>
            <FormComponent isCreate />
          </SimpleForm>
        </Create>
      </ResourceContextProvider>
    </Box>
  )
}
