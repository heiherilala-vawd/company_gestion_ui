import {
  DateField,
  FunctionField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
} from 'react-admin'

export default function PurchaseOrderShow() {
  return (
    <Show title="Détails bon de commande">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="supplier.name" label="Fournisseur" />
        <DateField source="order_date" label="Date commande" />
        <TextField source="status" label="Statut" />
        <NumberField source="total_amount" label="Montant total" />
        <TextField source="job.description" label="Travail" />
        <TextField source="comment" label="Commentaire" />
        <ArrayField source="lines" label="Lignes">
          <Datagrid bulkActionButtons={false}>
            <TextField source="material.name" label="Matériau" />
            <NumberField source="quantity" label="Quantité" />
            <NumberField source="unit_price" label="Prix unitaire" />
          </Datagrid>
        </ArrayField>
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
