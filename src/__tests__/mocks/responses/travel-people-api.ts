import { TravelPeople, CrupdateTravelPeople } from '../../../gen-ts/src'
import { user2Mock } from './users-api.ts'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { user1Mock } from './users-api.ts'

export const travelPeople1Mock: TravelPeople = {
  id: 'tp1_id',
  travel: {
    id: travelExpense1Mock.id,
    expense_id: travelExpense1Mock.expense.id,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  user: user2Mock,
  comment: 'Site supervisor travel',
  created_at: '2022-02-09T08:00:00Z',
  updated_at: '2022-02-09T08:00:00Z',
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

export const travelPeople2Mock: TravelPeople = {
  id: 'tp2_id',
  travel: {
    id: travelExpense1Mock.id,
    expense_id: travelExpense1Mock.expense.id,
    departure_location: travelExpense1Mock.departure_location,
    arrival_location: travelExpense1Mock.arrival_location,
    departure_date: travelExpense1Mock.departure_date,
    arrival_date: travelExpense1Mock.arrival_date,
  },
  user: user2Mock,
  comment: 'Worker travel to site',
  created_at: '2022-03-20T07:00:00Z',
  updated_at: '2022-03-20T07:00:00Z',
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

export const travelPeopleMock: TravelPeople[] = [travelPeople1Mock, travelPeople2Mock]

export const crupdateTravelPeopleMock: CrupdateTravelPeople[] = [
  {
    id: 'tp1_id',
    travel_id: travelExpense1Mock.id,
    user_id: user2Mock.id,
    comment: 'Updated travel assignment',
  },
  {
    id: 'tp3_id',
    travel_id: travelExpense1Mock.id,
    user_id: user2Mock.id,
    comment: 'New travel assignment',
  },
]
