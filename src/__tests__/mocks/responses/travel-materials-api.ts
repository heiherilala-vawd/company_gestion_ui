import { TravelMaterials, CrupdateTravelMaterials, CrupdateExpenseMoney } from '../../../gen-ts/src'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { material1Mock } from './materials-api.ts'
import { expense1Mock } from './expenses-api.ts'
import { user1Mock } from './users-api.ts'

const crupdateExpenseMoneyMock: CrupdateExpenseMoney = {
  id: expense1Mock.id,
  amount: expense1Mock.amount,
  description: expense1Mock.description,
  job_id: expense1Mock.job?.id,
  comment: expense1Mock.comment,
}

export const travelMaterials1Mock: TravelMaterials = {
  id: 'tm1_id',
  travel: {
    id: travelExpense1Mock.id,
    expense: crupdateExpenseMoneyMock,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  material: {
    id: material1Mock.id,
    name: material1Mock.name,
    description: material1Mock.description,
    unit: material1Mock.unit,
    comment: material1Mock.comment,
  },
  quantity: 10,
  quantity_received: 8,
  comment: 'Cement bags for construction',
  created_at: '2022-02-11T10:00:00Z',
  updated_at: '2022-02-15T14:00:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

export const travelMaterials2Mock: TravelMaterials = {
  id: 'tm2_id',
  travel: {
    id: travelExpense1Mock.id,
    expense: crupdateExpenseMoneyMock,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  material: {
    id: material1Mock.id,
    name: material1Mock.name,
    description: material1Mock.description,
    unit: material1Mock.unit,
    comment: material1Mock.comment,
  },
  quantity: 20,
  quantity_received: 20,
  comment: 'Full delivery received',
  created_at: '2022-03-21T11:00:00Z',
  updated_at: '2022-03-21T11:00:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

export const travelMaterialsMock: TravelMaterials[] = [travelMaterials1Mock, travelMaterials2Mock]

export const crupdateTravelMaterialsMock: CrupdateTravelMaterials[] = [
  {
    id: 'tm1_id',
    travel_id: travelExpense1Mock.id,
    material: material1Mock.id,
    quantity: 15,
    quantity_received: 10,
    comment: 'Updated delivery',
  },
  {
    id: 'tm3_id',
    travel_id: travelExpense1Mock.id,
    material: material1Mock.id,
    quantity: 30,
    quantity_received: 0,
    comment: 'New material shipment',
  },
]

export const createOrUpdateTravelMaterials = (
  travelMaterials: CrupdateTravelMaterials[],
): TravelMaterials[] => {
  return travelMaterials.map((tm) => ({
    ...tm,
    id: `newId`,
    travel: {
      id: tm.travel_id || travelExpense1Mock.id,
      expense: crupdateExpenseMoneyMock,
      departure_location: travelExpense1Mock.departure_location,
      arrival_location: travelExpense1Mock.arrival_location,
      departure_date: travelExpense1Mock.departure_date,
      arrival_date: travelExpense1Mock.arrival_date,
    },
    material: {
      id: typeof tm.material === 'string' ? tm.material : material1Mock.id,
      name: material1Mock.name,
      description: material1Mock.description,
      unit: material1Mock.unit,
      comment: material1Mock.comment,
    },
    created_at: tm.id ? travelMaterials1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: {
      id: user1Mock.id,
      role: user1Mock.role,
      first_name: user1Mock.first_name,
      last_name: user1Mock.last_name,
      sex: user1Mock.sex,
      email: user1Mock.email,
    },
    updated_by: {
      id: user1Mock.id,
      role: user1Mock.role,
      first_name: user1Mock.first_name,
      last_name: user1Mock.last_name,
      sex: user1Mock.sex,
      email: user1Mock.email,
    },
  }))
}
