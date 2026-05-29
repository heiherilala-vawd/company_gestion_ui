import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import { renderOtherExpenseTypeSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import React from 'react'

export default function OtherExpenseForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={id}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      {renderOtherExpenseTypeSelect('other_expense_type_id', "Type d'autre dépense")}
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
        <ExpenseForm
          isCreate={isCreate}
          isCreateForm={isCreateForm}
          souce={'expense.'}
          description={
            'expence of ' +
            OtherExpenseForm.name +
            ' from :' +
            new Date().toISOString() +
            '. And with id: ' +
            id
          }
        />
      </div>
    </>
  )
}
