import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin'

export default function PurchaseCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="expense_id" label="Dépense" reference="expenses">
          <SelectInput source="description" optionText="description" />
        </ReferenceInput>
        <TextInput source="supplier" label="Fournisseur" />
        <TextInput source="equipment" label="Équipement" />
        <TextInput source="material" label="Matériau" />
        <NumberInput source="quantity" label="Quantité" />
        <BooleanInput source="is_equipment" label="Est un équipement" />
      </SimpleForm>
    </Create>
  )
}
