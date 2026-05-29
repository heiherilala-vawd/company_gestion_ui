export const equipmentUsage1Mock = {
  id: 'eu1_id',
  equipment_id: 'eq1_id',
  job_id: 'job1_id',
  start_time: '2024-06-01T08:00:00Z',
  end_time: '2024-06-01T17:00:00Z',
}

export const equipmentUsage2Mock = {
  id: 'eu2_id',
  equipment_id: 'eq2_id',
  job_id: 'job1_id',
  start_time: '2024-06-02T09:00:00Z',
  end_time: '2024-06-02T16:00:00Z',
}

export const equipmentUsagesMock = [equipmentUsage1Mock, equipmentUsage2Mock]

export const crupdateEquipmentUsagesMock = [
  {
    id: 'eu1_id',
    equipment_id: 'eq1_id',
    job_id: 'job1_id',
    start_time: '2024-06-01T08:00:00Z',
    end_time: '2024-06-01T18:00:00Z',
  },
  {
    id: 'eu3_id',
    equipment_id: 'eq1_id',
    job_id: 'job1_id',
    start_time: '2024-06-05T08:00:00Z',
    end_time: '2024-06-05T17:00:00Z',
  },
]

export const createOrUpdateEquipmentUsages = (usages: any[]) =>
  usages.map((u: any) => ({ ...u, id: u.id || 'newId' }))
