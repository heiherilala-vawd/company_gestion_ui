import { useState, useEffect, useMemo } from 'react'
import { TextInput, SelectInput, BooleanInput, useGetList } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import generateId from '../../../utili/utils.tsx'
import { renderEquipeSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import {
  Typography,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
} from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch, setValue } = useFormContext()
  const isForTeam = watch('is_for_team')
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: users = [] } = useGetList('users', {
    pagination: { page: 1, perPage: 100 },
  })

  const filteredUsers = useMemo(
    () =>
      users.filter((user: any) => {
        const fullName = `${user.last_name ?? ''} ${user.first_name ?? ''}`.toLowerCase()
        return fullName.includes(searchTerm.toLowerCase())
      }),
    [users, searchTerm],
  )

  useEffect(() => {
    const existingIds = watch('user_ids') || []
    if (!isCreate && existingIds.length > 0) {
      setSelectedEmployees(existingIds)
      setShowPaymentForm(true)
    }
  }, [isCreate, watch])

  const paymentType = watch('payment_type')
  const expenseAmount = watch('expense.amount')
  const teamId = watch('team_id')
  const userIds = watch('user_ids') || []

  const { data: teams = [] } = useGetList('teams', {
    pagination: { page: 1, perPage: 100 },
  })
  const teamName = teamId ? teams.find((t: any) => t.id === teamId)?.name : undefined

  const paymentTypeLabel =
    paymentType === 'ADVANCE'
      ? 'Avance'
      : paymentType === 'MONTHLY'
        ? 'Mensuel'
        : paymentType === 'OTHER'
          ? 'Autre'
          : paymentType || '?'

  const employeeNames = userIds
    .map((uid: string) => {
      const u = users.find((u: any) => u.id === uid)
      return u ? `${u.first_name} ${u.last_name}` : ''
    })
    .filter(Boolean)
    .join(', ')

  const generatedDesc = useMemo(() => {
    const target = isForTeam && teamName ? `équipe ${teamName}` : `employés ${employeeNames || '?'}`
    const parts = [`Paiement ${target} - ${paymentTypeLabel}`]
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [isForTeam, teamName, employeeNames, paymentTypeLabel, expenseAmount])

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
        <TextInput source="id" defaultValue={id} sx={{ display: 'none' }} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
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
          <TextField
            label="Rechercher un employé"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 1, width: '100%' }}
            data-testid="input-search-employee"
          />
          <List dense data-testid="employee-list">
            {filteredUsers.map((user: any) => (
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
          <CollapsibleOptionalFields>
            <TextInput
              source="payment_description"
              label="Description du paiement"
              multiline
              data-testid="input-payment_description"
            />
          </CollapsibleOptionalFields>
          <div data-testid="input-expense-form" style={{ width: '100%' }}>
            <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
              Dépense
            </Typography>
            {!isCreate && <TextInput source="expense.id" sx={{ display: 'none' }} />}
            <ExpenseForm
              isCreate={isCreate}
              isCreateForm={isCreateForm}
              souce={'expense.'}
              description={generatedDesc}
            />
          </div>
        </>
      )}
    </>
  )
}
