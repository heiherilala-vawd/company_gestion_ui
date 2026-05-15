import { TravelEquipment, CrupdateTravelEquipment, TransportStatus } from '../../../gen-ts/src'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { equipment1Mock, equipment2Mock } from './equipment-api.ts'
import { user1Mock } from './users-api.ts'
import {
  toCrupdateEquipmentMapper,
  toCrupdateTravelExpenseMapper,
  toAuditUserMapper,
} from '../../support/mappers.ts'

export const travelEquipment1Mock: TravelEquipment = {
  id: 'teq1_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  equipment: toCrupdateEquipmentMapper(equipment1Mock),
  quantity: 1,
  status: 'IN_PROGRESS' as TransportStatus,
  comment: 'Excavator transport to site',
  created_at: '2022-02-11T09:00:00Z',
  updated_at: '2022-02-12T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelEquipment2Mock: TravelEquipment = {
  id: 'teq2_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  equipment: toCrupdateEquipmentMapper(equipment2Mock),
  quantity: 2,
  status: 'ARRIVED' as TransportStatus,
  comment: 'Equipment arrived safely',
  created_at: '2022-03-22T10:00:00Z',
  updated_at: '2022-03-22T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelEquipmentMock: TravelEquipment[] = [travelEquipment1Mock, travelEquipment2Mock]
export const travelEquipmentsMock: TravelEquipment[] = [travelEquipment1Mock, travelEquipment2Mock]

export const crupdateTravelEquipmentMock: CrupdateTravelEquipment[] = [
  {
    id: 'teq1_id',
    travel_id: travelExpense1Mock?.id,
    equipment: equipment1Mock?.id,
    quantity: 1,
    status: 'ARRIVED' as TransportStatus,
    comment: 'Equipment arrived',
  },
  {
    id: 'teq3_id',
    travel_id: travelExpense1Mock?.id,
    equipment: equipment1Mock?.id,
    quantity: 3,
    status: 'IN_PROGRESS' as TransportStatus,
    comment: 'New equipment transport',
  },
]

export const createOrUpdateTravelEquipments = (
  travelEquipments: CrupdateTravelEquipment[],
): TravelEquipment[] => {
  return travelEquipments.map((te) => ({
    ...te,
    id: `newId`,
    travel: {
      ...toCrupdateTravelExpenseMapper(travelExpense1Mock),
      id: te.travel_id || travelExpense1Mock?.id,
    },
    equipment: {
      ...toCrupdateEquipmentMapper(equipment1Mock),
      id: typeof te.equipment === 'string' ? te.equipment : equipment1Mock?.id,
    },
    created_at: te.id ? travelEquipment1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
