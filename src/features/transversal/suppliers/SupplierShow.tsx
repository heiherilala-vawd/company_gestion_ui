import { DateField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin'

export default function SupplierShow() {
  return (
    <Show title="Détails fournisseur">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="company_registration_number" label="N° d'enregistrement" />
        <TextField source="email" label="Email" />
        <TextField source="address" label="Adresse" />
        <TextField source="phone" label="Téléphone" />
        <TextField source="contact_name" label="Nom du contact" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
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
