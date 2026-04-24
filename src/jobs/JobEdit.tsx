import { Edit, SimpleForm, TextInput, DateInput, SelectInput, required } from 'react-admin'

export default function JobEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="company_id" label="ID Entreprise" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <DateInput source="contract_signature_date" label="Date signature contrat" />
        <DateInput source="start_date" label="Date début" />
        <DateInput source="end_date" label="Date fin" />
        <SelectInput
          source="status"
          label="Statut"
          choices={[
            { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'COMPLETED', name: 'Terminé' },
          ]}
        />
      </SimpleForm>
    </Edit>
  )
}
