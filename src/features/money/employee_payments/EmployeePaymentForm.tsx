import { useState } from 'react'
import { TextInput, SelectInput, BooleanInput, useGetList } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import generateId from '../../../utili/utils.tsx'
import { renderUserSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography, Box } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch, setValue } = useFormContext()
  const isForTeam = watch('is_for_team')

  const { data: teams = [] } = useGetList('teams', {
    pagination: { page: 1, perPage: 100 },
  })

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
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <BooleanInput
        source="is_for_team"
        label="Paiement pour une équipe"
        defaultValue={false}
        data-testid="input-is_for_team"
      />
      {isForTeam ? (
        <Box data-testid="input-team_id" sx={{ width: '100%' }}>
          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
            Équipe
          </Typography>
          <select
            data-testid="team-select"
            onChange={(e) => setValue('team_id', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '0.875rem',
              borderRadius: '4px',
              border: '1px solid #bdbdbd',
              background: '#fff',
            }}
          >
            <option value="">Sélectionner une équipe</option>
            {teams.map((team: any) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </Box>
      ) : (
        renderUserSelect('employee_id', 'Employé')
      )}
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
