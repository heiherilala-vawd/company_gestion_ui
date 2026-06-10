import { TextInput, NumberInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function BudgetLineForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="category" label="Catégorie" data-testid="input-category" />
      <NumberInput
        source="planned_amount"
        label="Montant prévu"
        data-testid="input-planned_amount"
      />
      <NumberInput source="actual_amount" label="Montant réel" data-testid="input-actual_amount" />
      <DateInput source="period_start" label="Début période" data-testid="input-period_start" />
      <DateInput source="period_end" label="Fin période" data-testid="input-period_end" />
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
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
