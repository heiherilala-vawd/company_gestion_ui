export const leaveConfig1Mock = {
  id: 'lc1_id',
  company_id: 'comp1_id',
  hire_date: new Date('2020-03-01'),
  contract_type: 'CDI',
  vacation_days_per_month: 2.5,
  weekly_hours: 35,
  end_date: null,
  comment: null,
}

export const leaveConfig2Mock = {
  id: 'lc2_id',
  company_id: 'comp1_id',
  hire_date: new Date('2023-06-15'),
  contract_type: 'CDD',
  vacation_days_per_month: 2.0,
  weekly_hours: 20,
  end_date: new Date('2024-06-15'),
  comment: 'Contrat à temps partiel',
}

export const leaveConfigsMock = [leaveConfig1Mock, leaveConfig2Mock]

export const crupdateLeaveConfigsMock = [
  {
    id: 'lc1_id',
    company_id: 'comp1_id',
    hire_date: new Date('2020-03-01'),
    contract_type: 'CDI',
    vacation_days_per_month: 3.0,
    weekly_hours: 35,
  },
  {
    id: 'lc3_id',
    company_id: 'comp1_id',
    hire_date: new Date('2024-01-01'),
    contract_type: 'FREELANCE',
    vacation_days_per_month: 0,
    weekly_hours: 10,
  },
]

export const createOrUpdateLeaveConfigs = (configs: any[]) =>
  configs.map((c: any) => ({ ...c, id: c.id || 'newId' }))
