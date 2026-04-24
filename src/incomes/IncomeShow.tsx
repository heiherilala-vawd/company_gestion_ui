import { Show, SimpleShowLayout, TextField, NumberField, DateField } from 'react-admin'

export default function IncomeShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="source_organization" label="Organisation source" />
        <TextField source="invoice_reference" label="Référence facture" />
        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="job_id" label="ID Chantier" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </SimpleShowLayout>
    </Show>
  )
}
