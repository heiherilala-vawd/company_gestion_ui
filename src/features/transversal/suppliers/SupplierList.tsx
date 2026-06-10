import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const SupplierFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function SupplierList() {
  return (
    <List resource="suppliers" filters={SupplierFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'company_registration_number', 'email']}>
        <TextField source="name" label="Nom" />
        <TextField source="company_registration_number" label="N° d'enregistrement" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
