import { useState, useEffect } from 'react'
import {
  TextInput,
  ReferenceInput,
  SelectInput,
  DateTimeInput,
  FormDataConsumer,
} from 'react-admin'
import { useFormContext, useWatch } from 'react-hook-form'
import { InputAdornment, IconButton } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function EquipmentUsageForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()
  const jobId = localStorage.getItem('currentJobId')
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null)
  const [showAllWarehouses, setShowAllWarehouses] = useState(false)
  const { setValue } = useFormContext()
  const warehouseId = useWatch({ name: 'warehouse_id' })

  useEffect(() => {
    if (warehouseId) {
      setValue('source_location', warehouseId)
    }
  }, [warehouseId, setValue])

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
          <ReferenceInput
            source="equipment_id"
            reference="equipment"
            label="Équipement"
            filter={{ warehouse_id: selectedWarehouse }}
            perPage={100}
          >
            <SelectInput optionText="name" data-testid="input-equipment_id" />
          </ReferenceInput>
          <DateTimeInput source="start_time" label="Début" data-testid="input-start_time" />
          <ReferenceInput source="used_by" reference="users" label="Utilisé par">
            <SelectInput
              optionText={(r: any) => `${r.first_name} ${r.last_name}`}
              data-testid="input-used_by"
            />
          </ReferenceInput>
          <CollapsibleOptionalFields>
            <FormDataConsumer>
              {({ formData }) => (
                <ReferenceInput
                  source="source_location"
                  reference="warehouses"
                  label="Emplacement source"
                  filter={formData?.job_id ? { job_id: formData.job_id } : undefined}
                >
                  <SelectInput optionText="name" data-testid="input-source_location" />
                </ReferenceInput>
              )}
            </FormDataConsumer>
            <SelectInput
              source="usage_status"
              label="Statut"
              defaultValue="IN_USE"
              choices={[
                { id: 'IN_USE', name: 'En cours' },
                { id: 'BROKEN', name: 'En panne' },
                { id: 'RETURNED', name: 'Retourné' },
                { id: 'LOST', name: 'Perdu' },
              ]}
              data-testid="input-usage_status"
            />
            <DateTimeInput source="end_time" label="Fin" data-testid="input-end_time" />
            <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
          </CollapsibleOptionalFields>
        </>
      )}
    </>
  )
}
