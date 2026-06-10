import { useState } from 'react'
import {
  TextInput,
  NumberInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  useGetList,
} from 'react-admin'
import { InputAdornment, IconButton } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

function MaterialSelector({ warehouseId }: { warehouseId: string }) {
  const { data: stockEntries = [] } = useGetList('material_warehouse', {
    pagination: { page: 1, perPage: 400 },
    filter: { warehouse_id: warehouseId },
  })

  const choices = stockEntries
    .filter((entry: any) => entry.material?.id)
    .map((entry: any) => ({
      id: entry.material.id,
      name: `${entry.material.name} (stock: ${entry.quantity})`,
    }))

  return (
    <SelectInput
      source="material_id"
      label="Matériau"
      choices={choices}
      data-testid="input-material_id"
    />
  )
}

export default function MaterialConsumptionForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const jobId = localStorage.getItem('currentJobId')
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null)
  const [showAllWarehouses, setShowAllWarehouses] = useState(false)

  return (
    <>
      {isCreate && (
        <TextInput source="id" defaultValue={id} sx={{ display: 'none' }} data-testid="input-id" />
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
      <ReferenceInput
        source="warehouse_id"
        reference="warehouses"
        label="Entrepôt"
        filter={!showAllWarehouses && jobId ? { job_id: jobId } : undefined}
        perPage={100}
      >
        <SelectInput
          optionText="name"
          data-testid="input-warehouse_id"
          onChange={(e: any) => setSelectedWarehouse(e?.id || e?.target?.value || null)}
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
                            setShowAllWarehouses((prev) => !prev)
                            setSelectedWarehouse(null)
                          }}
                          color={showAllWarehouses ? 'default' : 'primary'}
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
      {selectedWarehouse && (
        <>
          <MaterialSelector warehouseId={selectedWarehouse} />
          <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
          <CollapsibleOptionalFields>
            <DateInput
              source="consumption_date"
              label="Date consommation"
              data-testid="input-consumption_date"
            />
            <SelectInput
              source="consumption_status"
              label="Statut"
              defaultValue="IN_PROGRESS"
              choices={[
                { id: 'COMPLETED', name: 'Terminé' },
                { id: 'IN_PROGRESS', name: 'En cours' },
                { id: 'CANCELLED', name: 'Annulé' },
              ]}
              data-testid="input-consumption_status"
            />
            <TextInput source="reason" label="Raison" multiline data-testid="input-reason" />
            <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
          </CollapsibleOptionalFields>
        </>
      )}
    </>
  )
}
