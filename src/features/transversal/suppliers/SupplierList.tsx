import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const SupplierFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function SupplierList() {
  return (
    <List resource="suppliers" filters={SupplierFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'siret', 'email']}>
        <TextField source="name" label="Nom" />
        <TextField source="siret" label="SIRET" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
