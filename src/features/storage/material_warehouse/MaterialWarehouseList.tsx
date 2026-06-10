import {
  List,
  SearchInput,
  EditButton,
  NumberField,
  FunctionField,
  ReferenceInput,
  SelectInput,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaterialWarehouseFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <ReferenceInput source="material_id" reference="materials" perPage={100} key="material_id">
    <SelectInput
      optionText={(record: any) => `${record.name} / ${record.unit || ''}`}
      label="Matériau"
    />
  </ReferenceInput>,
  <ReferenceInput source="warehouse_id" reference="warehouses" perPage={100} key="warehouse_id">
    <SelectInput optionText="name" label="Entrepôt" />
  </ReferenceInput>,
]

export default function MaterialWarehouseList() {
  return (
    <List resource="material_warehouse" filters={MaterialWarehouseFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['material.name', 'warehouse.name', 'quantity']}>
        <FunctionField
          source="material_id"
          label="Matériau"
          render={(record) => record.material?.name || ''}
        />
        <FunctionField
          source="warehouse_id"
          label="Entrepôt"
          render={(record) => record.warehouse?.name || ''}
        />
        <NumberField source="quantity" label="Quantité" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
