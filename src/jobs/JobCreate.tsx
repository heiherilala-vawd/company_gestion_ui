import { Create, SimpleForm, TextInput, DateInput, SelectInput, required } from 'react-admin'
import generateId from '../utili/utils.tsx'

export default function JobCreate() {
  return (
    <Create transform={(data) => ({ ...data, id: generateId() })}>
      <SimpleForm>
        <TextInput source="id" disabled defaultValue={generateId()} />
        <TextInput source="company_id" label="ID Entreprise" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <DateInput
          source="contract_signature_date"
          label="Date signature contrat"
          defaultValue={new Date()}
        />
        <DateInput source="start_date" label="Date début" defaultValue={new Date()} />
        <DateInput source="end_date" label="Date fin" />
        <SelectInput
          source="status"
          label="Statut"
          choices={[
            { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'COMPLETED', name: 'Terminé' },
          ]}
          defaultValue="PENDING_SIGNATURE"
        />
      </SimpleForm>
    </Create>
  )
}
