import { required, TextInput, BooleanInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function LeaveTypeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <TextInput source="description" label="Description" data-testid="input-description" />
      <BooleanInput source="paid" label="Payé" defaultValue={true} data-testid="input-paid" />
      <BooleanInput
        source="deduct_from_balance"
        label="Déduire du solde"
        defaultValue={true}
        data-testid="input-deduct"
      />
      <TextInput
        source="color"
        label="Couleur (#hex)"
        defaultValue="#4CAF50"
        data-testid="input-color"
      />
      <NumberInput
        source="days_per_year"
        label="Jours par an"
        defaultValue={30}
        data-testid="input-days"
      />
    </>
  )
}
