import { required, TextInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function MaterialForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <SelectInput
        source="unit"
        label="Unité"
        choices={[
          { id: 'SAC', name: 'Sac' },
          { id: 'L', name: 'Litre' },
          { id: 'KG', name: 'Kilogramme' },
          { id: 'M2', name: 'Mètre carré' },
          { id: 'M3', name: 'Mètre cube' },
          { id: 'KIT', name: 'Kit' },
          { id: 'POT', name: 'Pot' },
          { id: 'PNL', name: 'Pannel' },
          { id: 'FEU', name: 'Feuille' },
          { id: 'BAR', name: 'Barre' },
          { id: 'T', name: 'Tonne' },
          { id: 'M', name: 'Mètre' },
          { id: 'FFT', name: 'Forfait' },
          { id: 'U', name: 'Unité' },
        ]}
        data-testid="input-unit"
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
          rows={3}
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
