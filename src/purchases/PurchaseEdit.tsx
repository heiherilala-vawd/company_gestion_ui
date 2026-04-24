import { Edit, SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin'

export default function PurchaseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="expense.id" label="Dépense id" />
        <TextInput source="supplier" label="Fournisseur" />
        <TextInput source="equipment" label="Équipement" />
        <TextInput source="material" label="Matériau" />
        <NumberInput source="quantity" label="Quantité" />
        <BooleanInput source="is_equipment" label="Est un équipement" />
      </SimpleForm>
    </Edit>
  )
}
