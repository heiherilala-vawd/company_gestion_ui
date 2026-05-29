export const leaveConfig1Mock = {
  id: 'lc1_id',
  hire_date: new Date('2020-03-01'),
  contract_type: 'CDI',
  vacation_days_per_month: 2.5,
}

export const leaveConfig2Mock = {
  id: 'lc2_id',
  hire_date: new Date('2023-06-15'),
  contract_type: 'CDD',
  vacation_days_per_month: 2.0,
}

export const leaveConfigsMock = [leaveConfig1Mock, leaveConfig2Mock]

export const crupdateLeaveConfigsMock = [
  {
    id: 'lc1_id',
    hire_date: new Date('2020-03-01'),
    contract_type: 'CDI',
    vacation_days_per_month: 3.0,
  },
  {
    id: 'lc3_id',
    hire_date: new Date('2024-01-01'),
    contract_type: 'FREELANCE',
    vacation_days_per_month: 0,
  },
]

export const createOrUpdateLeaveConfigs = (configs: any[]) =>
  configs.map((c: any) => ({ ...c, id: c.id || 'newId' }))
