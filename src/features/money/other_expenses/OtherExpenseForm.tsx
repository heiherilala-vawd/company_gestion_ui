import { TextInput, useGetList } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import { renderOtherExpenseTypeSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

export default function OtherExpenseForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch } = useFormContext()
  const otherExpenseTypeId = watch('other_expense_type_id')
  const expenseAmount = watch('expense.amount')

  const { data: expenseTypes = [] } = useGetList('other_expense_types', {
    pagination: { page: 1, perPage: 100 },
  })
  const typeName = otherExpenseTypeId
    ? expenseTypes.find((t: any) => t.id === otherExpenseTypeId)?.name
    : undefined

  const generatedDesc = useMemo(() => {
    const parts = [`Autre dépense - ${typeName || '?'}`]
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [typeName, expenseAmount])

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      {renderOtherExpenseTypeSelect('other_expense_type_id', "Type d'autre dépense")}
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
