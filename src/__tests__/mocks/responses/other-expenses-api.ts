import { OtherExpense, CrupdateOtherExpense } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'
import { toCrupdateExpenseMoneyMapper } from '../../support/mappers.ts'
import { otherExpenseType1Mock } from './other-expense-type-api.ts'

export const otherExpense1Mock: OtherExpense = {
  id: 'oe1_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  other_expense_type: otherExpenseType1Mock,
  description: 'Office supplies',
}

export const otherExpense2Mock: OtherExpense = {
  id: 'oe2_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  other_expense_type: otherExpenseType1Mock,
  description: 'Cleaning services',
}

export const otherExpensesMock: OtherExpense[] = [otherExpense1Mock, otherExpense2Mock]

export const crupdateOtherExpensesMock: CrupdateOtherExpense[] = [
  {
    id: 'oe1_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    other_expense_type_id: 'oet1_id',
    description: 'Updated office supplies',
  },
  {
    id: 'oe3_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    other_expense_type_id: 'oet2_id',
    description: 'New miscellaneous expense',
  },
]

export const createOrUpdateOtherExpenses = (
  otherExpenses: CrupdateOtherExpense[],
): OtherExpense[] => {
  return otherExpenses.map((oe) => ({
    ...oe,
    id: `newId`,
    expense: {
      id: oe.expense?.id || expense1Mock?.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job?.id,
      comment: expense1Mock.comment,
    },
    other_expense_type: otherExpenseType1Mock,
  }))
}
