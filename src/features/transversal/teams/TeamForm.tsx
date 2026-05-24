import { TextInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function TeamForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <ReferenceInput source="leader_id" reference="users" label="Responsable">
        <SelectInput
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          data-testid="input-leader_id"
        />
      </ReferenceInput>
      <ReferenceInput source="member_ids" reference="users" label="Membres">
        <SelectInput
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          multiple
          data-testid="input-member_ids"
        />
      </ReferenceInput>
    </>
  )
}
