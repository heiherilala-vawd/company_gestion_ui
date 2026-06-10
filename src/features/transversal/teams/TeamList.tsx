import { List, TextField, SearchInput, EditButton, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TeamFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function TeamList() {
  return (
    <List resource="teams" filters={TeamFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'leader']}>
        <TextField source="name" label="Nom" />
        <TextField source="leader.first_name" label="Responsable prénom" />
        <TextField source="leader.last_name" label="Responsable nom" />
        <FunctionField
          source="members"
          label="Membres"
          render={(record) =>
            record.members?.map((m: any) => `${m.first_name} ${m.last_name}`).join(', ') || ''
          }
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
