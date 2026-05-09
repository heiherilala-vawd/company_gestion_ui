import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function OtherExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
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
