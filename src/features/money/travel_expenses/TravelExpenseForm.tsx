import { TextInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderWarehouseSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function TravelExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderWarehouseSelect('departure_location_id', 'Lieu de départ')}
      {renderWarehouseSelect('arrival_location_id', "Lieu d'arrivée")}
      <DateInput
        source="departure_date"
        label="Date de départ"
        data-testid="input-departure_date"
      />
      <DateInput source="arrival_date" label="Date d'arrivée" data-testid="input-arrival_date" />
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
