import { Show, SimpleShowLayout, TextField, DateField, SelectField } from 'react-admin'

export default function JobShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="company_id" label="ID Entreprise" />
        <TextField source="description" label="Description" />
        <DateField source="contract_signature_date" label="Date signature contrat" />
        <DateField source="start_date" label="Date début" />
        <DateField source="end_date" label="Date fin" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'COMPLETED', name: 'Terminé' },
          ]}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </SimpleShowLayout>
    </Show>
  )
}
