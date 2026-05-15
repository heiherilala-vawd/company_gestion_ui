import { TravelPeople, CrupdateTravelPeople } from '../../../gen-ts/src'
import { user2Mock } from './users-api.ts'
import { travelExpense1Mock } from './travel-expenses-api.ts'
import { user1Mock } from './users-api.ts'
import { warehouse1Mock, warehouse2Mock } from './warehouses-api.ts'
import { expense1Mock } from './expenses-api.ts'
import {
  toCrupdateExpenseMoneyMapper,
  toCrupdateTravelExpenseMapper,
  toAuditUserMapper,
} from '../../support/mappers.ts'

export const travelPeople1Mock: TravelPeople = {
  id: 'tp1_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  arrival_location: warehouse1Mock,
  arrival_date: '2022-08-09T08:00:00Z',
  user: user1Mock,
  comment: 'Site supervisor travel',
  created_at: '2022-02-09T08:00:00Z',
  updated_at: '2022-02-09T08:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelPeople2Mock: TravelPeople = {
  id: 'tp2_id',
  travel: toCrupdateTravelExpenseMapper(travelExpense1Mock),
  arrival_location: warehouse2Mock,
  arrival_date: '2022-09-09T08:00:00Z',
  user: user2Mock,
  comment: 'Worker travel to site',
  created_at: '2022-03-20T07:00:00Z',
  updated_at: '2022-03-20T07:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const travelPeoplesMock: TravelPeople[] = [travelPeople1Mock, travelPeople2Mock]

export const crupdateTravelPeopleMock: CrupdateTravelPeople[] = [
  {
    id: 'tp1_id',
    travel_id: travelExpense1Mock?.id,
    user_id: user2Mock?.id,
    comment: 'Updated travel assignment',
  },
  {
    id: 'tp3_id',
    travel_id: travelExpense1Mock?.id,
    user_id: user2Mock?.id,
    comment: 'New travel assignment',
  },
]

export const createOrUpdateTravelPeoples = (
  travelPeoples: CrupdateTravelPeople[],
): TravelPeople[] => {
  return travelPeoples.map((tp) => ({
    ...tp,
    id: `newId`,
    travel: {
      id: tp.travel_id || travelExpense1Mock?.id,
      expense: toCrupdateExpenseMoneyMapper(expense1Mock),
      departure_location: travelExpense1Mock.departure_location,
      arrival_location: travelExpense1Mock.arrival_location,
      departure_date: travelExpense1Mock.departure_date,
      arrival_date: travelExpense1Mock.arrival_date,
    },
    user: user2Mock,
    created_at: tp.id ? travelPeople1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
