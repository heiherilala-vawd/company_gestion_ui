import { Company, CrupdateCompany, CompanyType } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'

export const company1Mock: Company = {
  id: 'comp1_id',
  name: 'Construction BTP Lyon',
  rib: 'FR76 3000 4000 1234 5678 9012 345',
  description: 'Main construction company for BTP projects',
  company_type: 'BTP' as CompanyType,
  comment: 'Primary company',
  created_at: '2021-01-20T10:00:00Z',
  updated_at: '2022-07-01T09:30:00Z',
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

export const company2Mock: Company = {
  id: 'comp2_id',
  name: 'Hôtellerie Paris',
  rib: 'FR76 3000 4000 9876 5432 1098 765',
  description: 'Hotel management company',
  company_type: 'HOTEL' as CompanyType,
  comment: 'Secondary company',
  created_at: '2021-02-15T11:00:00Z',
  updated_at: '2022-06-15T14:00:00Z',
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

export const companiesMock: Company[] = [company1Mock, company2Mock]

export const crupdateCompaniesMock: CrupdateCompany[] = [
  {
    id: 'comp1_id',
    name: 'Construction BTP Lyon Updated',
    rib: 'FR76 3000 4000 1234 5678 9012 345',
    description: 'Updated main construction company',
    company_type: 'BTP' as CompanyType,
    comment: 'Updated company info',
  },
  {
    id: 'comp3_id',
    name: 'New Retail Company',
    rib: 'FR76 3000 4000 5555 6666 7777 888',
    description: 'New company for retail operations',
    company_type: 'BTP' as CompanyType,
    comment: 'New company creation',
  },
]
