import { Warehouse, CrupdateWarehouse } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { job1Mock, job2Mock } from './jobs-api.ts'

export const warehouse1Mock: Warehouse = {
  id: 'wh1_id',
  name: 'Main Warehouse',
  description: 'Primary storage facility for BTP materials',
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
  comment: 'Main warehouse',
  created_at: '2022-01-15T08:00:00Z',
  updated_at: '2022-03-01T10:00:00Z',
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

export const warehouse2Mock: Warehouse = {
  id: 'wh2_id',
  name: 'Secondary Storage',
  description: 'Overflow storage for hotel renovation materials',
  job: {
    id: job2Mock.id,
    company_id: job2Mock.company.id,
    description: job2Mock.description,
    contract_signature_date: job2Mock.contract_signature_date,
    start_date: job2Mock.start_date,
    end_date: job2Mock.end_date,
    status: job2Mock.status,
    comment: job2Mock.comment,
  },
  comment: 'Secondary warehouse',
  created_at: '2022-03-20T09:00:00Z',
  updated_at: '2022-04-15T14:00:00Z',
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

export const warehousesMock: Warehouse[] = [warehouse1Mock, warehouse2Mock]

export const crupdateWarehousesMock: CrupdateWarehouse[] = [
  {
    id: 'wh1_id',
    name: 'Main Warehouse Updated',
    description: 'Updated primary storage facility',
    job_id: job1Mock.id,
    comment: 'Updated warehouse info',
  },
  {
    id: 'wh3_id',
    name: 'New Storage Site',
    description: 'Additional storage for new project',
    job_id: job2Mock.id,
    comment: 'New warehouse creation',
  },
]
