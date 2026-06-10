import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import { Typography } from '@mui/material'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

export default function BankFeeForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch } = useFormContext()
  const bankName = watch('bank_name')
  const expenseAmount = watch('expense.amount')

  const generatedDesc = useMemo(() => {
    const parts = [`Frais bancaires ${bankName || '?'}`]
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [bankName, expenseAmount])

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="bank_name" label="Nom de la banque" data-testid="input-bank_name" />
      <div data-testid="input-expense-form" style={{ width: '100%' }}>
        <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
          💰 Dépense
        </Typography>
        {!isCreate && <TextInput source="expense.id" sx={{ display: 'none' }} />}
        <ExpenseForm
          isCreate={isCreate}
          isCreateForm={isCreateForm}
          souce={'expense.'}
          description={generatedDesc}
        />
      </div>
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          data-testid="input-description"
        />
      </CollapsibleOptionalFields>
    </>
  )
}
