import {
  List,
  TextField,
  NumberField,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const PurchaseFilters = [
  <ReferenceInput source="supplier_id" reference="warehouses" perPage={100} alwaysOn>
    <SelectInput optionText="name" label="Fournisseur" />
  </ReferenceInput>,
  <BooleanInput source="is_equipment" label="Équipement" />,
]

export default function PurchaseList() {
  return (
    <List resource="purchases" filters={PurchaseFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['supplier.name', 'expense.amount', 'quantity']}>
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="expense.amount" label="Montant" />
        <NumberField source="quantity" label="Quantité" />
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="material.name" label="Matériau" />
        <EditButton />
        <DeleteButton />
      </ResponsiveDatagrid>
    </List>
  )
}
