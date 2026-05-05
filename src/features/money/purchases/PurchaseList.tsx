import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  NumberField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
} from 'react-admin'

const PurchaseFilters = [
  <SearchInput source="supplier" alwaysOn />,
  <TextInput source="equipment" label="Équipement" />,
  <TextInput source="material" label="Matériau" />,
]

export default function PurchaseList() {
  return (
    <List resource="purchases" filters={PurchaseFilters} perPage={25}>
      <Datagrid rowClick="show">
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="material.name" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <BooleanField source="is_equipment" label="Est équipement" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
