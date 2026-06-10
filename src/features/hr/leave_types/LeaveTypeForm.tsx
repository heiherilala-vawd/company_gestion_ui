import { required, TextInput, BooleanInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function LeaveTypeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <BooleanInput source="paid" label="Payé" defaultValue={true} data-testid="input-paid" />
      <BooleanInput
        source="deduct_from_balance"
        label="Déduire du solde"
        defaultValue={true}
        data-testid="input-deduct"
      />
      <NumberInput
        source="days_per_year"
        label="Jours par an"
        defaultValue={30}
        data-testid="input-days"
      />
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <TextInput source="description" label="Description" data-testid="input-description" />
        <TextInput
          source="color"
          label="Couleur (#hex)"
          defaultValue="#4CAF50"
          data-testid="input-color"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
