import { List, TextField, SearchInput, EditButton, DateField, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const PurchaseOrderFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function PurchaseOrderList() {
  return (
    <List resource="purchase_orders" filters={PurchaseOrderFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['order_date', 'status', 'total_amount']}>
        <DateField source="order_date" label="Date" />
        <TextField source="status" label="Statut" />
        <NumberField source="total_amount" label="Montant" />
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="job.description" label="Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
