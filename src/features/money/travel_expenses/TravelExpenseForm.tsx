import { useState } from 'react'
import { TextInput, DateTimeInput, useGetList, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { InputAdornment, IconButton, Typography } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

function WarehouseLocationSelect({
  source,
  label,
  showAll,
  onToggle,
}: {
  source: string
  label: string
  showAll: boolean
  onToggle: () => void
}) {
  const jobId = localStorage.getItem('currentJobId')

  return (
    <ReferenceInput
      source={source}
      reference="warehouses"
      label={label}
      filter={!showAll && jobId ? { job_id: jobId } : undefined}
      perPage={100}
    >
      <SelectInput
        optionText="name"
        label={label}
        data-testid={'input-' + source}
        slotProps={
          jobId
            ? {
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        size="small"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          onToggle()
                        }}
                        color={showAll ? 'default' : 'primary'}
                        sx={{ p: 0.25 }}
                      >
                        <FilterAltIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }
            : undefined
        }
      />
    </ReferenceInput>
  )
}

export default function TravelExpenseForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const { watch } = useFormContext()
  const departureLocationId = watch('departure_location_id')
  const arrivalLocationId = watch('arrival_location_id')
  const expenseAmount = watch('expense.amount')
  const jobId = localStorage.getItem('currentJobId')
  const [showAllWarehouses, setShowAllWarehouses] = useState(false)

  const { data: warehouses = [] } = useGetList('warehouses', {
    pagination: { page: 1, perPage: 100 },
  })
  const departureName = departureLocationId
    ? warehouses.find((w: any) => w.id === departureLocationId)?.name
    : undefined
  const arrivalName = arrivalLocationId
    ? warehouses.find((w: any) => w.id === arrivalLocationId)?.name
    : undefined

  const generatedDesc = useMemo(() => {
    const parts = [`Dépense de voyage de ${departureName || '?'} à ${arrivalName || '?'}`]
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [departureName, arrivalName, expenseAmount])

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      {!showAllWarehouses && jobId && (
        <TextInput
          source="job_id"
          sx={{ display: 'none' }}
          defaultValue={jobId}
          data-testid="input-job_id"
        />
      )}
      <WarehouseLocationSelect
        source="departure_location_id"
        label="Lieu de départ"
        showAll={showAllWarehouses}
        onToggle={() => setShowAllWarehouses((prev) => !prev)}
      />
      <WarehouseLocationSelect
        source="arrival_location_id"
        label="Lieu d'arrivée"
        showAll={showAllWarehouses}
        onToggle={() => setShowAllWarehouses((prev) => !prev)}
      />
      <CollapsibleOptionalFields>
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
      </CollapsibleOptionalFields>
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
    </>
  )
}
