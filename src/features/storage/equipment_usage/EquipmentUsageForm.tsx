import { TextInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function EquipmentUsageForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

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
      <ReferenceInput source="equipment_id" reference="equipment" label="Équipement">
        <SelectInput optionText="name" data-testid="input-equipment_id" />
      </ReferenceInput>
      <ReferenceInput
        source="job_id"
        reference="jobs"
        label="Travail"
        perPage={100}
        sort={{ field: 'name', order: 'ASC' }}
      >
        <SelectInput
          optionText={(choice: any) => choice?.description || ''}
          data-testid="input-job_id"
        />
      </ReferenceInput>
      <TextInput source="start_time" label="Début" data-testid="input-start_time" />
      <TextInput source="end_time" label="Fin" data-testid="input-end_time" />
    </>
  )
}
