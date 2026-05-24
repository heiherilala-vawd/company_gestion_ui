import { List, NumberField, DateField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const ReceiptFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function ReceiptList() {
  return (
    <List resource="receipts" filters={ReceiptFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['payment_date', 'amount']}>
        <DateField source="payment_date" label="Date paiement" />
        <NumberField source="amount" label="Montant" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
