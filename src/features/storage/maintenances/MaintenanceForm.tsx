import { TextInput, ReferenceInput, SelectInput, useGetList } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ExpenseForm from '../../money/expenses/ExpenseForm.tsx'
import { Typography } from '@mui/material'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

export default function MaintenanceForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch } = useFormContext()
  const equipmentId = watch('equipment_id')
  const expenseAmount = watch('expense.amount')

  const { data: equipmentList = [] } = useGetList('equipment', {
    pagination: { page: 1, perPage: 100 },
  })
  const equipmentName = equipmentId
    ? equipmentList.find((e: any) => e.id === equipmentId)?.name
    : undefined

  const generatedDesc = useMemo(() => {
    const parts = [`Maintenance de l'équipement ${equipmentName || '?'}`]
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [equipmentName, expenseAmount])

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <ReferenceInput source="equipment_id" reference="equipment" label="Équipement">
        <SelectInput optionText="name" data-testid="input-equipment_id" />
      </ReferenceInput>
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
