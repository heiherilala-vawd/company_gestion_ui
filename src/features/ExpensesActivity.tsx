import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SimpleForm, ResourceContextProvider } from 'react-admin'
import FormToolbar from '../generic/FormToolbar'
import BankFeeForm from './money/bank_fees/BankFeeForm.tsx'
import EmployeePaymentForm from './money/employee_payments/EmployeePaymentForm.tsx'
import OtherExpenseForm from './money/other_expenses/OtherExpenseForm.tsx'
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import GenericCreate from '../generic/GenericCreate'

export default function ExpensesActivity() {
  useNavigate()
  const userRole = localStorage.getItem('user_role')
  const isWarehouseWorker = userRole === 'WAREHOUSE_WORKER'
  const [entityType, setEntityType] = useState<'bank_fee' | 'employee_payment' | 'other_expense'>(
    isWarehouseWorker ? 'employee_payment' : 'bank_fee',
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
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Dépenses
      </Typography>

      <ToggleButtonGroup value={entityType} exclusive onChange={handleEntityChange} sx={{ mb: 3 }}>
        {!isWarehouseWorker && <ToggleButton value="bank_fee">Frais bancaires</ToggleButton>}
        <ToggleButton value="employee_payment">Paiement salarié</ToggleButton>
        <ToggleButton value="other_expense">Autre dépense</ToggleButton>
      </ToggleButtonGroup>

      <ResourceContextProvider value={resource}>
        <GenericCreate
          title=" "
          transform={(data) => {
            const expense = { ...data.expense }
            if (!expense.description && expense._generated_desc) {
              expense.description = expense._generated_desc
            }
            delete expense._generated_desc
            const transformed: any = { ...data, expense }
            if ('bank_name' in data && !transformed.description && expense.description) {
              transformed.description = expense.description
            }
            if ('payment_type' in data && !transformed.payment_description && expense.description) {
              transformed.payment_description = expense.description
            }
            if (
              'other_expense_type_id' in data &&
              !transformed.description &&
              expense.description
            ) {
              transformed.description = expense.description
            }
            return transformed
          }}
        >
          <SimpleForm id="expenses-activity-form" toolbar={<FormToolbar />}>
            <FormComponent isCreate />
          </SimpleForm>
        </GenericCreate>
      </ResourceContextProvider>
    </Box>
  )
}
