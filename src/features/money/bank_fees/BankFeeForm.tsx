import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import { Typography } from '@mui/material'
import React from 'react'

export default function BankFeeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="bank_name" label="Nom de la banque" data-testid="input-bank_name" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
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
