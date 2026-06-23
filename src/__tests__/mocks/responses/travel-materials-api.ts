import { TravelMaterials, CrupdateTravelMaterials } from '../../../gen-ts/src'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { material1Mock } from './materials-api.ts'
import { expense1Mock } from './expenses-api.ts'
import { user1Mock } from './users-api.ts'
import { container1Mock, container2Mock } from './travel-containers-api.ts'
import {
  toCrupdateExpenseMoneyMapper,
  toCrupdateMaterialMapper,
  toCrupdateTravelExpenseMapper,
  toAuditUserMapper,
} from '../../support/mappers.ts'

export const travelMaterials1Mock: TravelMaterials = {
  id: 'tm1_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  material: toCrupdateMaterialMapper(material1Mock),
  quantity: 10,
  quantity_received: 8,
  quantity_lost: 0,
  comment: 'Cement bags for construction',
  container: container1Mock,
  created_at: '2022-02-11T10:00:00Z',
  updated_at: '2022-02-15T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelMaterials2Mock: TravelMaterials = {
  id: 'tm2_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  material: toCrupdateMaterialMapper(material1Mock),
  quantity: 20,
  quantity_received: 20,
  comment: 'Full delivery received',
  container: container2Mock,
  created_at: '2022-03-21T11:00:00Z',
  updated_at: '2022-03-21T11:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelMaterials3Mock: TravelMaterials = {
  id: 'tm3_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  material: toCrupdateMaterialMapper(material1Mock),
  quantity: 15,
  quantity_received: 0,
  quantity_lost: 0,
  comment: 'Extra bricks in red crate',
  container: container2Mock,
  created_at: '2022-04-01T08:00:00Z',
  updated_at: '2022-04-01T08:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelMaterialsMock: TravelMaterials[] = [
  travelMaterials1Mock,
  travelMaterials2Mock,
  travelMaterials3Mock,
]

export const crupdateTravelMaterialsMock: CrupdateTravelMaterials[] = [
  {
    id: 'tm1_id',
    travel_id: travelExpense1Mock?.id,
    material: material1Mock?.id,
    quantity: 15,
    quantity_received: 10,
    comment: 'Updated delivery',
  },
  {
    id: 'tm3_id',
    travel_id: travelExpense1Mock?.id,
    material: material1Mock?.id,
    quantity: 30,
    quantity_received: 0,
    comment: 'New material shipment',
  },
]

export const notArrivedTravelMaterialsMock: TravelMaterials[] = [
  travelMaterials1Mock,
  travelMaterials3Mock,
]

export const confirmMaterialArrivals = (
  confirmations: Array<{
    id: string
    quantity_received?: number
    quantity_lost?: number
    arrival_location?: string | null
  }>,
): TravelMaterials[] => {
  return confirmations.map((c) => {
    const original = travelMaterialsMock.find((tm) => tm.id === c.id) || travelMaterials1Mock
    return {
      ...original,
      quantity_received: c.quantity_received ?? original.quantity_received,
      quantity_lost: c.quantity_lost ?? original.quantity_lost ?? 0,
      updated_at: new Date().toISOString(),
    }
  })
}

export const createOrUpdateTravelMaterials = (
  travelMaterials: CrupdateTravelMaterials[],
): TravelMaterials[] => {
  return travelMaterials.map((tm) => ({
    ...tm,
    id: `newId`,
    travel: {
      id: tm.travel_id || travelExpense1Mock?.id,
      expense: toCrupdateExpenseMoneyMapper(expense1Mock),
      departure_location: travelExpense1Mock.departure_location,
      arrival_location: travelExpense1Mock.arrival_location,
      departure_date: travelExpense1Mock.departure_date,
      arrival_date: travelExpense1Mock.arrival_date,
    },
    material: toCrupdateMaterialMapper(material1Mock),
    created_at: tm.id ? travelMaterials1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
