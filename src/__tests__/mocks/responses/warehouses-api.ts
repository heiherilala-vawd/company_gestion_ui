import { Warehouse, CrupdateWarehouse } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { job1Mock, job2Mock } from './jobs-api.ts'
import { toCrupdateJobMapper, toAuditUserMapper } from '../../support/mappers.ts'

export const warehouse1Mock: Warehouse = {
  id: 'wh1_id',
  name: 'Main Warehouse',
  description: 'Primary storage facility for BTP materials',
  job: toCrupdateJobMapper(job1Mock),
  comment: 'Main warehouse',
  created_at: '2022-01-15T08:00:00Z',
  updated_at: '2022-03-01T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const warehouse2Mock: Warehouse = {
  id: 'wh2_id',
  name: 'Secondary Storage',
  description: 'Overflow storage for hotel renovation materials',
  job: toCrupdateJobMapper(job2Mock),
  comment: 'Secondary warehouse',
  created_at: '2022-03-20T09:00:00Z',
  updated_at: '2022-04-15T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const warehousesMock: Warehouse[] = [warehouse1Mock, warehouse2Mock]

export const crupdateWarehousesMock: CrupdateWarehouse[] = [
  {
    id: 'wh1_id',
    name: 'Main Warehouse Updated',
    description: 'Updated primary storage facility',
    job_id: job1Mock?.id,
    comment: 'Updated warehouse info',
  },
  {
    id: 'wh3_id',
    name: 'New Storage Site',
    description: 'Additional storage for new project',
    job_id: job2Mock?.id,
    comment: 'New warehouse creation',
  },
]

export const createOrUpdateWarehouses = (warehouses: CrupdateWarehouse[]): Warehouse[] => {
  return warehouses.map((warehouse) => ({
    ...warehouse,
    id: `newId`,
    job: {
      id: warehouse.job_id || job1Mock?.id,
      company_id: warehouse.job_id === job2Mock.id ? job2Mock.company.id : job1Mock.company?.id,
      description: warehouse.job_id === job2Mock.id ? job2Mock.description : job1Mock.description,
      contract_signature_date:
        warehouse.job_id === job2Mock.id
          ? job2Mock.contract_signature_date
          : job1Mock.contract_signature_date,
      start_date: warehouse.job_id === job2Mock.id ? job2Mock.start_date : job1Mock.start_date,
      end_date: warehouse.job_id === job2Mock.id ? job2Mock.end_date : job1Mock.end_date,
      status: warehouse.job_id === job2Mock.id ? job2Mock.status : job1Mock.status,
      comment: warehouse.job_id === job2Mock.id ? job2Mock.comment : job1Mock.comment,
    },
    created_at: warehouse.id ? warehouse1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
