import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  SelectField,
  FunctionField,
} from 'react-admin'

export default function JobShow() {
  return (
    <Show title="Détails travail">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="company.name" label="Nom Entreprise" />
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
        <TextField source="comment" label="Commentaire" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        {/* Nom complet du modificateur */}
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
      </SimpleShowLayout>
    </Show>
  )
}
