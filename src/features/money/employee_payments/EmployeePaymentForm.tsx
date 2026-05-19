import { useState, useEffect } from 'react'
import { TextInput, SelectInput, BooleanInput, useGetList } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import generateId from '../../../utili/utils.tsx'
import { renderUserSelect, renderEquipeSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import {
  Typography,
  Box,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch, setValue } = useFormContext()
  const isForTeam = watch('is_for_team')
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const { data: users = [] } = useGetList('users', {
    pagination: { page: 1, perPage: 100 },
  })

  useEffect(() => {
    const existingIds = watch('user_ids') || []
    if (!isCreate && existingIds.length > 0) {
      setSelectedEmployees(existingIds)
      setShowPaymentForm(true)
    }
  }, [])

  const handleToggle = (userId: string) => {
    const currentIndex = selectedEmployees.indexOf(userId)
    const newSelected = [...selectedEmployees]
    if (currentIndex === -1) {
      newSelected.push(userId)
    } else {
      newSelected.splice(currentIndex, 1)
    }
    setSelectedEmployees(newSelected)
    setValue('user_ids', newSelected)
  }

  const handlePayer = () => {
    if (selectedEmployees.length > 0) {
      setShowPaymentForm(true)
    }
  }

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
        renderEquipeSelect('team_id', 'Équipe')
      ) : !showPaymentForm ? (
        <>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
            Sélectionner les employés
          </Typography>
          <List dense data-testid="employee-list">
            {users.map((user: any) => (
              <ListItem
                key={user.id}
                button
                onClick={() => handleToggle(user.id)}
                data-testid={`employee-item-${user.id}`}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedEmployees.indexOf(user.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`${user.last_name} ${user.first_name}`} />
              </ListItem>
            ))}
          </List>
          {selectedEmployees.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayer}
              sx={{ mt: 2 }}
              data-testid="payer-button"
            >
              Payer ({selectedEmployees.length})
            </Button>
          )}
        </>
      ) : null}
      {(showPaymentForm || isForTeam) && (
        <>
          {!isForTeam && selectedEmployees.length > 0 && (
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
              Paiement pour :{' '}
              {selectedEmployees
                .map((uid: string) => {
                  const u = users.find((u: any) => u.id === uid)
                  return u ? `${u.last_name} ${u.first_name}` : ''
                })
                .join(', ')}
            </Typography>
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
              Dépense
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
      )}
    </>
  )
}
