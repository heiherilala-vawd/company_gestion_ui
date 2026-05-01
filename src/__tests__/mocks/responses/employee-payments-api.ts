import { EmployeePayment, CrupdateEmployeePayment, PaymentType } from '../../../gen-ts/src'
import { user1Mock, user2Mock } from './users-api.ts'
import { expense1Mock } from './expenses-api.ts'

export const employeePayment1Mock: EmployeePayment = {
  id: 'ep1_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  employee: user2Mock,
  payment_description: 'January salary advance',
  payment_type: 'ADVANCE' as PaymentType,
}

export const employeePayment2Mock: EmployeePayment = {
  id: 'ep2_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  employee: user2Mock,
  payment_description: 'Monthly salary payment',
  payment_type: 'MONTHLY' as PaymentType,
}

export const employeePaymentsMock: EmployeePayment[] = [employeePayment1Mock, employeePayment2Mock]

export const crupdateEmployeePaymentsMock: CrupdateEmployeePayment[] = [
  {
    id: 'ep1_id',
    expense_id: expense1Mock.id,
    employee_id: user2Mock.id,
    payment_description: 'Updated January advance',
    payment_type: 'ADVANCE' as PaymentType,
  },
  {
    id: 'ep3_id',
    expense_id: expense1Mock.id,
    employee_id: user2Mock.id,
    payment_description: 'Bonus payment',
    payment_type: 'OTHER' as PaymentType,
  },
]
