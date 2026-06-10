import {
  List,
  TextField,
  SearchInput,
  EditButton,
  DateField,
  NumberField,
  SelectField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const PurchaseOrderFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function PurchaseOrderList() {
  return (
    <List resource="purchase_orders" filters={PurchaseOrderFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['order_date', 'status', 'total_amount']}>
        <DateField source="order_date" label="Date" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'PENDING', name: 'En attente' },
            { id: 'APPROVED', name: 'Approuvé' },
            { id: 'CANCELLED', name: 'Annulé' },
          ]}
        />
        <NumberField
          source="total_amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="job.description" label="Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
