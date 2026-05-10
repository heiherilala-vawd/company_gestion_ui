import { TextInput, DateTimeInput } from 'react-admin'
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
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderWarehouseSelect('departure_location_id', 'Lieu de départ')}
      {renderWarehouseSelect('arrival_location_id', "Lieu d'arrivée")}
      <DateTimeInput
        source="departure_date"
        label="Date de départ"
        defaultValue={new Date().toISOString()}
        data-testid="input-departure_date"
      />
      <DateTimeInput
        source="arrival_date"
        label="Date d'arrivée"
        defaultValue={new Date().toISOString()}
        data-testid="input-arrival_date"
      />
      <div data-testid="input-expense-form" style={{ width: '100%' }}>
        <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
          💰 Dépense
        </Typography>
        {!isCreate && <TextInput source="expense_id" readOnly />}
        <ExpenseForm isCreate={isCreate} isCreateForm={isCreateForm} souce={'expense.'} />
      </div>
    </>
  )
}
