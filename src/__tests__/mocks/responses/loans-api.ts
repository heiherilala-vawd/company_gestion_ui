import { Loan, CrupdateLoan, CrupdateLoanRepayment } from '../../../gen-ts/src'
import { job1Mock } from './jobs-api.ts'
import { user1Mock } from './users-api.ts'
import { toCrupdateJobMapper, toAuditUserMapper } from '../../support/mappers.ts'

export const loan1Mock: Loan = {
  id: 'loan1_id',
  lender: 'Banque Populaire',
  amount: 50000,
  interest_rate: 1200,
  start_date: '2024-01-15T08:00:00Z' as any,
  description: 'Prêt pour achat de matériel',
  status: 'ACTIVE' as any,
  remaining_amount: 35000,
  job: toCrupdateJobMapper(job1Mock),
  created_at: '2024-01-15T08:00:00Z' as any,
  updated_at: '2024-03-01T10:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const loan2Mock: Loan = {
  id: 'loan2_id',
  lender: 'Crédit Mutuel',
  amount: 25000,
  interest_rate: 800,
  start_date: '2023-06-01T08:00:00Z' as any,
  description: 'Prêt pour trésorerie',
  status: 'DEFAULTED' as any,
  remaining_amount: 25000,
  job: toCrupdateJobMapper(job1Mock),
  created_at: '2023-06-01T08:00:00Z' as any,
  updated_at: '2024-01-10T08:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const loan3Mock: Loan = {
  id: 'loan3_id',
  lender: 'Société Générale',
  amount: 100000,
  interest_rate: 1500,
  start_date: '2024-02-01T08:00:00Z' as any,
  description: 'Prêt pour investissement',
  status: 'ACTIVE' as any,
  remaining_amount: 100000,
  job: toCrupdateJobMapper(job1Mock),
  created_at: '2024-02-01T08:00:00Z' as any,
  updated_at: '2024-02-01T08:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const loansActiveMock: Loan[] = [loan1Mock, loan3Mock]
export const loansDefaultedMock: Loan[] = [loan2Mock]

export const crupdateLoanMock: CrupdateLoan[] = [
  {
    id: 'loan_new_id',
    lender: 'Nouveau Prêteur',
    amount: 30000,
    interest_rate: 1000,
    start_date: new Date(),
    description: 'Nouveau prêt',
  },
]

export const createOrUpdateLoans = (loans: CrupdateLoan[]): Loan[] => {
  return loans.map((l) => ({
    ...l,
    id: l.id || 'new_loan_id',
    status: 'ACTIVE' as any,
    remaining_amount: l.amount,
    job: toCrupdateJobMapper(job1Mock),
    created_at: new Date() as any,
    updated_at: new Date() as any,
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
    repayments: [],
  }))
}

export const crupdateLoanRepaymentMock: CrupdateLoanRepayment[] = [
  {
    id: 'repay_new_id',
    amount: 5000,
    loan_id: 'loan1_id',
    comment: 'Remboursement test',
  },
]
