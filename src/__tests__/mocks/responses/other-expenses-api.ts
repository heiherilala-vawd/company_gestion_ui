import { OtherExpense, CrupdateOtherExpense } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'

export const otherExpense1Mock: OtherExpense = {
  id: 'oe1_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  description: 'Office supplies',
}

export const otherExpense2Mock: OtherExpense = {
  id: 'oe2_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  description: 'Cleaning services',
}

export const otherExpensesMock: OtherExpense[] = [otherExpense1Mock, otherExpense2Mock]

export const crupdateOtherExpensesMock: CrupdateOtherExpense[] = [
  {
    id: 'oe1_id',
    expense_id: expense1Mock.id,
    description: 'Updated office supplies',
  },
  {
    id: 'oe3_id',
    expense_id: expense1Mock.id,
    description: 'New miscellaneous expense',
  },
]
