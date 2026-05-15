import { IncomeMoney, CrupdateIncomeMoney, IncomeType } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { job1Mock } from './jobs-api.ts'
import { toCrupdateJobMapper, toAuditUserMapper } from '../../support/mappers.ts'

export const incomesType1: IncomeType = {
  id: 'inctype1_id',
  name: 'incomeType1 name',
  description: 'IncomeType1 description',
}

export const incomesType2: IncomeType = {
  id: 'inctype1_id',
  name: 'incomeType1 name',
  description: 'IncomeType1 description',
}

export const incomesTypes: IncomeType[] = [incomesType1, incomesType2]

export const income1Mock: IncomeMoney = {
  id: 'inc1_id',
  amount: 100,
  description: 'Payment for Building A phase 1',
  comment: 'First payment received',
  source_organization: 'Client Corp',
  invoice_reference: 'INV-2022-001',
  job: toCrupdateJobMapper(job1Mock),
  created_at: '2022-03-01T08:00:00Z',
  updated_at: '2022-03-01T08:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
  income_type: incomesType1,
}

export const income2Mock: IncomeMoney = {
  id: 'inc2_id',
  amount: 150,
  description: 'Payment for Building A phase 2',
  comment: 'Second payment received',
  source_organization: 'Client Corp',
  invoice_reference: 'INV-2022-002',
  job: toCrupdateJobMapper(job1Mock),
  created_at: '2022-05-15T10:00:00Z',
  updated_at: '2022-05-15T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
  income_type: incomesType1,
}

export const incomesMock: IncomeMoney[] = [income1Mock, income2Mock]

export const crupdateIncomesMock: CrupdateIncomeMoney[] = [
  {
    id: 'inc1_id',
    amount: 110,
    description: 'Updated payment for Building A phase 1',
    job_id: job1Mock?.id,
    source_organization: 'Client Corp Updated',
    invoice_reference: 'INV-2022-001-R',
    comment: 'Updated income',
  },
  {
    id: 'inc3_id',
    amount: 50,
    description: 'New advance payment',
    job_id: job1Mock?.id,
    source_organization: 'New Client Ltd',
    invoice_reference: 'INV-2022-003',
    comment: 'New income creation',
  },
]

export const createOrUpdateIncomes = (incomes: CrupdateIncomeMoney[]): IncomeMoney[] => {
  return incomes.map((inc) => ({
    ...inc,
    id: `newId`,
    job: {
      id: inc.job_id || job1Mock?.id,
      company_id: job1Mock.company?.id,
      description: job1Mock.description,
      contract_signature_date: job1Mock.contract_signature_date,
      start_date: job1Mock.start_date,
      end_date: job1Mock.end_date,
      status: job1Mock.status,
      comment: job1Mock.comment,
    },
    created_at: inc.id ? income1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
