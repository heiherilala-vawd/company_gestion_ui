import {
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function TeamForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <ReferenceArrayInput source="member_ids" reference="users" label="Membres">
        <AutocompleteArrayInput
          fullWidth
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          data-testid="input-member_ids"
        />
      </ReferenceArrayInput>
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <ReferenceInput source="leader_id" reference="users" label="Responsable">
          <SelectInput
            optionText={(record) => `${record.first_name} ${record.last_name}`}
            data-testid="input-leader_id"
          />
        </ReferenceInput>
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
