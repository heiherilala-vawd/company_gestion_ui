import { TravelExpense, CrupdateTravelExpense } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'
import { warehouse1Mock, warehouse2Mock } from './warehouses-api.ts'

export const travelExpense1Mock: TravelExpense = {
  id: 'te1_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  departure_location: warehouse1Mock,
  arrival_location: warehouse2Mock,
  departure_date: '2022-02-10T06:00:00Z',
  arrival_date: '2022-02-10T10:00:00Z',
}

export const travelExpense2Mock: TravelExpense = {
  id: 'te2_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  departure_location: warehouse1Mock,
  arrival_location: warehouse2Mock,
  departure_date: '2022-03-20T08:00:00Z',
  arrival_date: '2022-03-20T14:00:00Z',
}

export const travelExpensesMock: TravelExpense[] = [travelExpense1Mock, travelExpense2Mock]

export const crupdateTravelExpensesMock: CrupdateTravelExpense[] = [
  {
    id: 'te1_id',
    expense_id: expense1Mock.id,
    departure_location: warehouse1Mock,
    arrival_location: warehouse2Mock,
    departure_date: '2022-02-10T06:30:00Z',
    arrival_date: '2022-02-10T10:30:00Z',
  },
  {
    id: 'te3_id',
    expense_id: expense1Mock.id,
    departure_location: warehouse1Mock,
    arrival_location: warehouse2Mock,
    departure_date: '2022-04-15T09:00:00Z',
    arrival_date: '2022-04-15T11:00:00Z',
  },
]

export const createOrUpdateTravelExpenses = (
  travelExpenses: CrupdateTravelExpense[],
): TravelExpense[] => {
  return travelExpenses.map((te) => ({
    ...te,
    id: te.id || `te_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    expense: {
      id: te.expense?.id || expense1Mock.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job.id,
      comment: expense1Mock.comment,
    },
  }))
}

export const createOrUpdateTravelExpenses = (
  travelExpenses: CrupdateTravelExpense[],
): TravelExpense[] => {
  return travelExpenses.map((te) => ({
    ...te,
    id: `newId`,
    expense: {
      id: te.expense_id || expense1Mock.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job.id,
      comment: expense1Mock.comment,
    },
    created_at: te.id ? travelExpense1Mock.departure_date : new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}
