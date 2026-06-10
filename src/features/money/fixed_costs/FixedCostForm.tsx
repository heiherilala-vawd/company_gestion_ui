import { TextInput, NumberInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function FixedCostForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <NumberInput
        source="amount"
        label="Montant mensuel"
        helperText="Ce montant sera appliqué chaque mois"
        data-testid="input-amount"
      />
      <DateInput
        source="start_date"
        label="Date début"
        defaultValue={new Date().toISOString().split('T')[0]}
        data-testid="input-start_date"
      />
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          data-testid="input-description"
        />
        <DateInput source="end_date" label="Date fin" data-testid="input-end_date" />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
