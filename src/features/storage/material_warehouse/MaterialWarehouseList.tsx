import { List, SearchInput, EditButton, NumberField, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaterialWarehouseFilters = [<SearchInput source="q" alwaysOn key="q" />]

export default function MaterialWarehouseList() {
  return (
    <List resource="material_warehouse" filters={MaterialWarehouseFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['material.name', 'warehouse.name', 'quantity']}>
        <FunctionField label="Matériau" render={(record) => record.material?.name || ''} />
        <FunctionField label="Entrepôt" render={(record) => record.warehouse?.name || ''} />
        <NumberField source="quantity" label="Quantité" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
