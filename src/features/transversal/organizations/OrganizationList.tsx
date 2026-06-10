import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const OrganizationFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function OrganizationList() {
  return (
    <List resource="organizations" filters={OrganizationFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'email', 'contact_name']}>
        <TextField source="name" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <TextField source="contact_name" label="Contact" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
