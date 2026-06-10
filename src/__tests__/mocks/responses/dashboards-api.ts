export const materialDashboardSummaryMock = {
  total_materials: 50,
  total_stock_value: 75000,
  total_consumption_cost_ytd: 15000,
  expiring_soon_count: 3,
}

export const materialDashboardBreakdownMock = {
  top5_stock_value: [
    { name: 'Cement', value: 25000 },
    { name: 'Bricks', value: 18000 },
    { name: 'Steel', value: 12000 },
    { name: 'Wood', value: 10000 },
    { name: 'Paint', value: 5000 },
  ],
  top5_consumption_cost: [
    { name: 'Cement', value: 8000 },
    { name: 'Paint', value: 3000 },
    { name: 'Bricks', value: 2000 },
    { name: 'Steel', value: 1500 },
    { name: 'Wood', value: 500 },
  ],
  stock_by_warehouse: [
    { name: 'Main Warehouse', value: 45000 },
    { name: 'Secondary Storage', value: 30000 },
  ],
}

export const materialDashboardExpiringMock = [
  {
    id: 'mat1_id',
    name: 'Ciment spécial',
    quantity: 100,
    unit: 'kg',
    expiration_date: '2026-07-15',
  },
  {
    id: 'mat2_id',
    name: 'Peinture acrylique',
    quantity: 20,
    unit: 'L',
    expiration_date: '2026-08-01',
  },
  {
    id: 'mat3_id',
    name: 'Adhésif industriel',
    quantity: 50,
    unit: 'L',
    expiration_date: '2026-06-30',
  },
]

export const equipmentDashboardSummaryMock = {
  total_equipment: 25,
  available_count: 15,
  in_use_count: 8,
  under_maintenance_count: 2,
}

export const equipmentDashboardBreakdownMock = {
  by_category: [
    { name: 'Heavy Machinery', value: 8 },
    { name: 'Power Tools', value: 10 },
    { name: 'Safety Equipment', value: 5 },
    { name: 'Transport', value: 2 },
  ],
  by_status: [
    { name: 'Available', value: 15 },
    { name: 'In Use', value: 8 },
    { name: 'Under Maintenance', value: 2 },
  ],
  usage_by_job: [
    { name: 'Construction of Building A', value: 5 },
    { name: 'Hotel Renovation', value: 3 },
  ],
}

export const hrDashboardSummaryMock = {
  total_employees: 30,
  active_employees: 28,
  total_payroll_ytd: 450000,
  pending_leaves: 4,
}

export const hrDashboardBreakdownMock = {
  by_department: [
    { name: 'Construction', value: 15 },
    { name: 'Administration', value: 10 },
    { name: 'Engineering', value: 5 },
  ],
  by_leave_type: [
    { name: 'Congé payé', value: 10 },
    { name: 'Congé maladie', value: 3 },
    { name: 'Congé sans solde', value: 1 },
  ],
  by_payroll_type: [
    { name: 'Mensuel', value: 20 },
    { name: 'Journalier', value: 8 },
  ],
  by_job: [
    { name: 'Construction of Building A', value: 18 },
    { name: 'Hotel Renovation', value: 10 },
  ],
}

export const monetaryDashboardSummaryMock = {
  total_revenue_ytd: 500000,
  total_expenses_ytd: 350000,
  net_profit_ytd: 150000,
  cashflow_ytd: 120000,
}

export const monetaryDashboardBreakdownMock = {
  expenses_by_type: [
    { name: 'Achats', value: 150000 },
    { name: 'Salaires', value: 120000 },
    { name: 'Frais fixes', value: 50000 },
    { name: 'Autres', value: 30000 },
  ],
  revenue_by_job: [
    { name: 'Construction of Building A', value: 300000 },
    { name: 'Hotel Renovation', value: 200000 },
  ],
  profitability_by_job: [
    { name: 'Construction of Building A', value: 100000 },
    { name: 'Hotel Renovation', value: 50000 },
  ],
}

export const monetaryTimeSeriesMock = [
  { date: '2026-01-01', value: 50000, cumulative: 50000 },
  { date: '2026-02-01', value: 55000, cumulative: 105000 },
  { date: '2026-03-01', value: 48000, cumulative: 153000 },
  { date: '2026-04-01', value: 60000, cumulative: 213000 },
  { date: '2026-05-01', value: 52000, cumulative: 265000 },
  { date: '2026-06-01', value: 58000, cumulative: 323000 },
]
