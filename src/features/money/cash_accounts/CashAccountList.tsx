import { List, TextField, SearchInput, EditButton, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const CashAccountFilters = [<SearchInput source="q" alwaysOn />]

export default function CashAccountList() {
  return (
    <List resource="cash_accounts" filters={CashAccountFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'balance']}>
        <TextField source="name" label="Nom" />
        <NumberField source="balance" label="Solde" />
        <TextField source="description" label="Description" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
