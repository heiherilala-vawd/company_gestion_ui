import { List, TextField, SearchInput, EditButton, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaterialConsumptionFilters = [<SearchInput source="q" alwaysOn />]

export default function MaterialConsumptionList() {
  return (
    <List resource="material_consumption" filters={MaterialConsumptionFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['material_id', 'quantity']}>
        <TextField source="material_id" label="Matériau" />
        <TextField source="warehouse_id" label="Entrepôt" />
        <NumberField source="quantity" label="Quantité" />
        <TextField source="consumption_date" label="Date consommation" />
        <TextField source="job_id" label="Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
