import { required, email, TextInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderLeaveConfigSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function UserForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
        data-testid="input-email"
      />
      <TextInput
        source="first_name"
        label="Prénom"
        validate={[required()]}
        data-testid="input-first_name"
      />
      <TextInput
        source="last_name"
        label="Nom"
        validate={[required()]}
        data-testid="input-last_name"
      />
      <SelectInput
        source="sex"
        label="Sexe"
        choices={[
          { id: 'M', name: 'Homme' },
          { id: 'F', name: 'Femme' },
        ]}
        validate={[required()]}
        data-testid="input-sex"
      />
      <ReferenceArrayInput source="company_ids" reference="companies" label="Entreprises">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <CollapsibleOptionalFields>
        {renderLeaveConfigSelect('leave_config_id', 'Configuration congés')}
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
