import { List, TextField, SearchInput, EditButton, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const FixedCostFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function FixedCostList() {
  return (
    <List resource="fixed_costs" filters={FixedCostFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'amount']}>
        <TextField source="name" label="Nom" />
        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
