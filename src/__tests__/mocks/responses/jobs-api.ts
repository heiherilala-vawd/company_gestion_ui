import { Job, CrupdateJob, JobStatus } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { company1Mock, company2Mock } from './companies-api.ts'

export const job1Mock: Job = {
  id: 'job1_id',
  company: {
    id: company1Mock.id,
    name: company1Mock.name,
    rib: company1Mock.rib,
    description: company1Mock.description,
    company_type: company1Mock.company_type,
    comment: company1Mock.comment,
  },
  description: 'Construction of Building A',
  contract_signature_date: '2022-01-10',
  start_date: '2022-02-01',
  end_date: '2022-12-31',
  status: 'IN_PROGRESS' as JobStatus,
  comment: 'Main construction project',
  created_at: '2022-01-05T08:00:00Z',
  updated_at: '2022-03-15T10:30:00Z',
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

export const job2Mock: Job = {
  id: 'job2_id',
  company: {
    id: company2Mock.id,
    name: company2Mock.name,
    rib: company2Mock.rib,
    description: company2Mock.description,
    company_type: company2Mock.company_type,
    comment: company2Mock.comment,
  },
  description: 'Hotel Renovation',
  contract_signature_date: '2022-03-15',
  start_date: '2022-04-01',
  end_date: '2022-09-30',
  status: 'PENDING_SIGNATURE' as JobStatus,
  comment: 'Hotel renovation project',
  created_at: '2022-03-10T09:00:00Z',
  updated_at: '2022-03-10T09:00:00Z',
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

export const job3Mock: Job = {
  id: 'job3_id',
  company: {
    id: company1Mock.id,
    name: company1Mock.name,
    rib: company1Mock.rib,
    description: company1Mock.description,
    company_type: company1Mock.company_type,
    comment: company1Mock.comment,
  },
  description: 'Small Repair Work',
  contract_signature_date: '2022-05-01',
  start_date: '2022-05-15',
  end_date: '2022-06-15',
  status: 'COMPLETED' as JobStatus,
  comment: 'Quick repair job',
  created_at: '2022-04-25T11:00:00Z',
  updated_at: '2022-06-20T15:00:00Z',
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

export const jobsMock: Job[] = [job1Mock, job2Mock, job3Mock]

export const crupdateJobsMock: CrupdateJob[] = [
  {
    id: 'job1_id',
    company_id: company1Mock.id,
    description: 'Construction of Building A - Updated',
    contract_signature_date: '2022-01-10',
    start_date: '2022-02-01',
    end_date: '2022-12-31',
    status: 'IN_PROGRESS' as JobStatus,
    comment: 'Updated project details',
  },
  {
    id: 'job4_id',
    company_id: company2Mock.id,
    description: 'New Landscaping Project',
    contract_signature_date: '2022-07-01',
    start_date: '2022-08-01',
    end_date: '2022-10-31',
    status: 'PENDING_SIGNATURE' as JobStatus,
    comment: 'New project creation',
  },
]

export const createOrUpdateJobs = (jobs: CrupdateJob[]): Job[] => {
  return jobs.map((job) => ({
    ...job,
    id: `newId`,
    company: {
      id: `newId`,
      name: job.company_id === company2Mock.id ? company2Mock.name : company1Mock.name,
      rib: job.company_id === company2Mock.id ? company2Mock.rib : company1Mock.rib,
      description:
        job.company_id === company2Mock.id ? company2Mock.description : company1Mock.description,
      company_type:
        job.company_id === company2Mock.id ? company2Mock.company_type : company1Mock.company_type,
      comment: job.company_id === company2Mock.id ? company2Mock.comment : company1Mock.comment,
    },
    created_at: job.id ? job1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
  }))
}
