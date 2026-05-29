import { List, TextField, SearchInput, EditButton, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const BudgetLineFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function BudgetLineList() {
  return (
    <List resource="budget_lines" filters={BudgetLineFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['category', 'planned_amount']}>
        <TextField source="category" label="Catégorie" />
        <NumberField source="planned_amount" label="Montant prévu" />
        <NumberField source="actual_amount" label="Montant réel" />
        <TextField source="period_start" label="Début période" />
        <TextField source="period_end" label="Fin période" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
