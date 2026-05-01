import { TravelExpense, CrupdateTravelExpense } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'

export const travelExpense1Mock: TravelExpense = {
  id: 'te1_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  departure_location: 'Lyon',
  arrival_location: 'Paris',
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
  departure_location: 'Paris',
  arrival_location: 'Marseille',
  departure_date: '2022-03-20T08:00:00Z',
  arrival_date: '2022-03-20T14:00:00Z',
}

export const travelExpensesMock: TravelExpense[] = [travelExpense1Mock, travelExpense2Mock]

export const crupdateTravelExpensesMock: CrupdateTravelExpense[] = [
  {
    id: 'te1_id',
    expense_id: expense1Mock.id,
    departure_location: 'Lyon',
    arrival_location: 'Paris',
    departure_date: '2022-02-10T06:30:00Z',
    arrival_date: '2022-02-10T10:30:00Z',
  },
  {
    id: 'te3_id',
    expense_id: expense1Mock.id,
    departure_location: 'Marseille',
    arrival_location: 'Nice',
    departure_date: '2022-04-15T09:00:00Z',
    arrival_date: '2022-04-15T11:00:00Z',
  },
]
