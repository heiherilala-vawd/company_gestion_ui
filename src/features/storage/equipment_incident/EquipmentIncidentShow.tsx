import { Show, SimpleShowLayout, TextField, DateField, FunctionField } from 'react-admin'

export default function EquipmentIncidentShow() {
  return (
    <Show title="Détails incident équipement">
      <SimpleShowLayout>
        <TextField source="id" />
        <FunctionField
          label="Type d'incident"
          render={(record: any) => (record.incident_type === 'DAMAGED' ? 'Endommagé' : 'Perdu')}
        />
        <TextField source="equipment_id" label="Équipement ID" />
        <TextField source="user_id" label="Utilisateur ID" />
        <TextField source="travel_id" label="Voyage ID" />
        <TextField source="location" label="Lieu" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record: any) =>
            record.created_by
              ? `${record.created_by.first_name} ${record.created_by.last_name}`
              : ''
          }
        />
        <FunctionField
          label="Modifié par"
          render={(record: any) =>
            record.updated_by
              ? `${record.updated_by.first_name} ${record.updated_by.last_name}`
              : ''
          }
        />
        <TextField source="comment" label="Commentaire" />
      </SimpleShowLayout>
    </Show>
  )
}
