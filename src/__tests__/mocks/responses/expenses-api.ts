import { ExpenseMoney, CrupdateExpenseMoney } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { job1Mock } from './jobs-api.ts'

export const expense1Mock: ExpenseMoney = {
  id: 'exp1_id',
  amount: 50000,
  description: 'Equipment purchase for Building A',
  comment: 'Initial equipment expense',
  job: {
    id: job1Mock.id,
    company_id: job1Mock.company.id,
    description: job1Mock.description,
    contract_signature_date: job1Mock.contract_signature_date,
    start_date: job1Mock.start_date,
    end_date: job1Mock.end_date,
    status: job1Mock.status,
    comment: job1Mock.comment,
  },
  created_at: '2022-02-10T08:00:00Z',
  updated_at: '2022-02-10T08:00:00Z',
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

export const expense2Mock: ExpenseMoney = {
  id: 'exp2_id',
  amount: 75000,
  description: 'Material transport costs',
  comment: 'Transportation expense',
  job: {
    id: job1Mock.id,
    company_id: job1Mock.company.id,
    description: job1Mock.description,
    contract_signature_date: job1Mock.contract_signature_date,
    start_date: job1Mock.start_date,
    end_date: job1Mock.end_date,
    status: job1Mock.status,
    comment: job1Mock.comment,
  },
  created_at: '2022-03-05T09:00:00Z',
  updated_at: '2022-03-05T09:00:00Z',
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

export const expensesMock: ExpenseMoney[] = [expense1Mock, expense2Mock]

export const crupdateExpensesMock: CrupdateExpenseMoney[] = [
  {
    id: 'exp1_id',
    amount: 55000,
    description: 'Updated equipment purchase',
    job_id: job1Mock.id,
    comment: 'Updated expense',
  },
  {
    id: 'exp3_id',
    amount: 30000,
    description: 'New administrative expense',
    job_id: job1Mock.id,
    comment: 'New expense creation',
  },
]
