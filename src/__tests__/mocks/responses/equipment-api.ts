import { Equipment, CrupdateEquipment } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { warehouse1Mock } from './warehouses-api.ts'
import { toCrupdateWarehouseMapper, toAuditUserMapper } from '../../support/mappers.ts'

export const equipment1Mock: Equipment = {
  id: 'eq1_id',
  name: 'Excavator XL200',
  description: 'Heavy duty excavator for construction',
  warehouse: toCrupdateWarehouseMapper(warehouse1Mock),
  floor_number: 1,
  storage_number: 101,
  comment: 'Main excavator',
  est_en_panne: false,
  created_at: '2022-02-01T08:00:00Z',
  updated_at: '2022-05-15T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const equipment2Mock: Equipment = {
  id: 'eq2_id',
  name: 'Concrete Mixer',
  description: 'Portable concrete mixer',
  warehouse: toCrupdateWarehouseMapper(warehouse1Mock),
  floor_number: 2,
  storage_number: 205,
  comment: 'Concrete preparation',
  est_en_panne: false,
  created_at: '2022-02-15T09:00:00Z',
  updated_at: '2022-04-20T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const equipmentsMock: Equipment[] = [equipment1Mock, equipment2Mock]

export const crupdateEquipmentMock: CrupdateEquipment[] = [
  {
    id: 'eq1_id',
    name: 'Excavator XL200 Updated',
    description: 'Updated heavy duty excavator',
    warehouse_id: warehouse1Mock?.id,
    floor_number: 1,
    storage_number: 102,
    comment: 'Relocated equipment',
    est_en_panne: false,
  },
  {
    id: 'eq3_id',
    name: 'Bulldozer D6',
    description: 'New bulldozer for earthworks',
    warehouse_id: warehouse1Mock?.id,
    floor_number: 1,
    storage_number: 103,
    comment: 'New equipment addition',
    est_en_panne: false,
  },
]

export const maintenanceResponseMock = { success: true }

export const createOrUpdateEquipments = (equipment: CrupdateEquipment[]): Equipment[] => {
  return equipment.map((eq) => ({
    ...eq,
    id: `newId`,
    warehouse: {
      id: eq.warehouse_id || warehouse1Mock?.id,
      name: warehouse1Mock.name,
      description: warehouse1Mock.description,
      job_id: warehouse1Mock.job?.id,
      comment: warehouse1Mock.comment,
    },
    est_en_panne: eq.est_en_panne || false,
    created_at: eq.id ? equipment1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
