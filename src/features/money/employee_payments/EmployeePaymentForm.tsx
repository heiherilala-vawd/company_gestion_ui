import { TextInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderUserSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
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
      {renderUserSelect('employee_id', 'Employé')}
      <TextInput
        source="payment_description"
        label="Description du paiement"
        multiline
        data-testid="input-payment_description"
      />
      <SelectInput
        source="payment_type"
        label="Type de paiement"
        choices={[
          { id: 'ADVANCE', name: 'Avance' },
          { id: 'MONTHLY', name: 'Mensuel' },
          { id: 'OTHER', name: 'Autre' },
        ]}
        defaultValue="MONTHLY"
        data-testid="input-payment_type"
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
            EmployeePaymentForm.name +
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
