import { Show, SimpleShowLayout, TextField, NumberField, BooleanField } from 'react-admin'

export default function PurchaseShow() {
  return (
    <Show title="Détails achat">
      <SimpleShowLayout>
        <TextField source="id" />
        <NumberField
          source="expense.amount"
          label="Pris dépense"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job.description" label="Travail" />
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="material.name" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <BooleanField source="is_equipment" label="Est équipement" />
      </SimpleShowLayout>
    </Show>
  )
}
