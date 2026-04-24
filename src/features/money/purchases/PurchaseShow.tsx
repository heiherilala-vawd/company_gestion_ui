import { Show, SimpleShowLayout, TextField, NumberField, BooleanField } from 'react-admin'

export default function PurchaseShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="supplier" label="Fournisseur" />
        <TextField source="equipment" label="Équipement" />
        <TextField source="material" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <BooleanField source="is_equipment" label="Est équipement" />
      </SimpleShowLayout>
    </Show>
  )
}
