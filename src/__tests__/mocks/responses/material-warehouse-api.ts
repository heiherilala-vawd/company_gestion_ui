import { warehouse1Mock, warehouse2Mock } from './warehouses-api.ts'
import { material1Mock, material2Mock } from './materials-api.ts'

export const materialWarehouse1Mock = {
  id: 'mw1_id',
  material: { id: material1Mock.id, name: material1Mock.name, unit: material1Mock.unit },
  warehouse: { id: warehouse1Mock.id, name: warehouse1Mock.name },
  quantity: 50,
  not_arrived: true,
  created_at: '2024-01-10T08:00:00Z',
}

export const materialWarehouse2Mock = {
  id: 'mw2_id',
  material: { id: material2Mock.id, name: material2Mock.name, unit: material2Mock.unit },
  warehouse: { id: warehouse2Mock.id, name: warehouse2Mock.name },
  quantity: 100,
  not_arrived: true,
  created_at: '2024-02-15T09:00:00Z',
}

export const materialWarehousesMock = [materialWarehouse1Mock, materialWarehouse2Mock]
