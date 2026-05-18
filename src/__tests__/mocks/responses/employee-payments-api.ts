import { EmployeePayment, CrupdateEmployeePayment, PaymentType } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'
import { user2Mock } from './users-api.ts'
import { toCrupdateExpenseMoneyMapper } from '../../support/mappers.ts'

export const employeePayment1Mock: EmployeePayment = {
  id: 'ep1_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  users: [user2Mock],
  is_for_team: false,
  payment_description: 'January salary advance',
  payment_type: 'ADVANCE' as PaymentType,
}

export const employeePayment2Mock: EmployeePayment = {
  id: 'ep2_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  users: [user2Mock],
  is_for_team: false,
  payment_description: 'Monthly salary payment',
  payment_type: 'MONTHLY' as PaymentType,
}

export const employeePaymentsMock: EmployeePayment[] = [employeePayment1Mock, employeePayment2Mock]

export const crupdateEmployeePaymentsMock: CrupdateEmployeePayment[] = [
  {
    id: 'ep1_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    user_ids: [user2Mock?.id || ''],
    is_for_team: false,
    payment_description: 'Updated January advance',
    payment_type: 'ADVANCE' as PaymentType,
  },
  {
    id: 'ep3_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    user_ids: [user2Mock?.id || ''],
    is_for_team: false,
    payment_description: 'Bonus payment',
    payment_type: 'OTHER' as PaymentType,
  },
]

export const createOrUpdateEmployeePayments = (
  employeePayments: CrupdateEmployeePayment[],
): EmployeePayment[] => {
  return employeePayments.map((ep) => ({
    ...ep,
    id: `newId`,
    expense: {
      id: ep.expense.id || expense1Mock?.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job?.id,
      comment: expense1Mock.comment,
    },
    users: [user2Mock],
  }))
}
