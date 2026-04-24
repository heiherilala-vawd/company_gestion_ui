import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin'

export default function WarehouseShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="ID Chantier" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </SimpleShowLayout>
    </Show>
  )
}
