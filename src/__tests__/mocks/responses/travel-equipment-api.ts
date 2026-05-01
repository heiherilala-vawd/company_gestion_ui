import { TravelEquipment, CrupdateTravelEquipment, TransportStatus } from '../../../gen-ts/src'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { equipment1Mock } from './equipment-api.ts'
import { user1Mock } from './users-api.ts'

export const travelEquipment1Mock: TravelEquipment = {
  id: 'teq1_id',
  travel: {
    id: travelExpense1Mock.id,
    expense_id: travelExpense1Mock.expense.id,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  equipment: {
    id: equipment1Mock.id,
    name: equipment1Mock.name,
    description: equipment1Mock.description,
    warehouse_id: equipment1Mock.warehouse.id,
    floor_number: equipment1Mock.floor_number,
    storage_number: equipment1Mock.storage_number,
    comment: equipment1Mock.comment,
  },
  quantity: 1,
  status: 'IN_PROGRESS' as TransportStatus,
  comment: 'Excavator transport to site',
  created_at: '2022-02-11T09:00:00Z',
  updated_at: '2022-02-12T14:00:00Z',
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

export const travelEquipment2Mock: TravelEquipment = {
  id: 'teq2_id',
  travel: {
    id: travelExpense1Mock.id,
    expense_id: travelExpense1Mock.expense.id,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  equipment: {
    id: equipment1Mock.id,
    name: equipment1Mock.name,
    description: equipment1Mock.description,
    warehouse_id: equipment1Mock.warehouse.id,
    floor_number: equipment1Mock.floor_number,
    storage_number: equipment1Mock.storage_number,
    comment: equipment1Mock.comment,
  },
  quantity: 2,
  status: 'ARRIVED' as TransportStatus,
  comment: 'Equipment arrived safely',
  created_at: '2022-03-22T10:00:00Z',
  updated_at: '2022-03-22T10:00:00Z',
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

export const travelEquipmentMock: TravelEquipment[] = [travelEquipment1Mock, travelEquipment2Mock]

export const crupdateTravelEquipmentMock: CrupdateTravelEquipment[] = [
  {
    id: 'teq1_id',
    travel_id: travelExpense1Mock.id,
    equipment: equipment1Mock.id,
    quantity: 1,
    status: 'ARRIVED' as TransportStatus,
    comment: 'Equipment arrived',
  },
  {
    id: 'teq3_id',
    travel_id: travelExpense1Mock.id,
    equipment: equipment1Mock.id,
    quantity: 3,
    status: 'IN_PROGRESS' as TransportStatus,
    comment: 'New equipment transport',
  },
]
