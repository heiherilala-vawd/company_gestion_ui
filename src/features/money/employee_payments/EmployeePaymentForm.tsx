import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderExpenseSelect,
  renderUserSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderUserSelect('employee_id', 'Employé')}
      <TextInput
        source="payment_description"
        label="Description du paiement"
        multiline
        data-testid="input-payment_description"
      />
      <TextInput source="payment_type" label="Type de paiement" data-testid="input-payment_type" />
      <div data-testid="input-expense-form" style={{ width: '100%' }}>
        <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
          💰 Dépense
        </Typography>
        {!isCreate && <TextInput source="expense.id" readOnly />}
        <ExpenseForm isCreate={isCreate} isCreateForm={isCreateForm} souce={'expense.'} />
      </div>
    </>
  )
}
