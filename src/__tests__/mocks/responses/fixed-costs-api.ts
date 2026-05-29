export const fixedCost1Mock = {
  id: 'fc1_id',
  name: 'Assurance',
  amount: 1500,
  description: 'Assurance annuelle responsabilité civile',
  start_date: new Date('2024-01-01'),
  end_date: new Date('2024-12-31'),
}

export const fixedCost2Mock = {
  id: 'fc2_id',
  name: 'Abonnement logiciel',
  amount: 200,
  description: 'Abonnement mensuel CRM',
  start_date: new Date('2024-01-01'),
  end_date: new Date('2024-12-31'),
}

export const fixedCostsMock = [fixedCost1Mock, fixedCost2Mock]

export const crupdateFixedCostsMock = [
  {
    id: 'fc1_id',
    name: 'Assurance - Mis à jour',
    amount: 1600,
    description: 'Assurance annuelle mise à jour',
    start_date: new Date('2024-01-01'),
    end_date: new Date('2024-12-31'),
  },
  {
    id: 'fc3_id',
    name: 'Nouveau coût fixe',
    amount: 500,
    description: 'Nouvel abonnement',
    start_date: new Date('2024-06-01'),
    end_date: new Date('2025-05-31'),
  },
]

export const createOrUpdateFixedCosts = (costs: any[]) =>
  costs.map((c: any) => ({ ...c, id: c.id || 'newId' }))
