/* eslint-disable @typescript-eslint/no-explicit-any */
export const budgetLine1Mock = {
  id: 'bl1_id',
  category: 'Matériaux',
  planned_amount: 50000,
  actual_amount: 45000,
  period_start: new Date('2024-01-01'),
  period_end: new Date('2024-12-31'),
  description: 'Budget annuel matériaux construction',
}

export const budgetLine2Mock = {
  id: 'bl2_id',
  category: "Main-d'œuvre",
  planned_amount: 80000,
  actual_amount: 78000,
  period_start: new Date('2024-01-01'),
  period_end: new Date('2024-12-31'),
  description: "Budget annuel main-d'œuvre",
}

export const budgetLinesMock = [budgetLine1Mock, budgetLine2Mock]

export const crupdateBudgetLinesMock = [
  {
    id: 'bl1_id',
    category: 'Matériaux - Mis à jour',
    planned_amount: 55000,
    actual_amount: 50000,
    period_start: new Date('2024-01-01'),
    period_end: new Date('2024-12-31'),
    description: 'Budget matériaux mis à jour',
  },
  {
    id: 'bl3_id',
    name: 'Nouvelle ligne',
    category: 'Transport',
    planned_amount: 10000,
    actual_amount: 0,
    period_start: new Date('2024-06-01'),
    period_end: new Date('2024-12-31'),
    description: 'Budget transport second semestre',
  },
]

export const createOrUpdateBudgetLines = (lines: any[]) =>
  lines.map((l: any) => ({ ...l, id: l.id || 'newId' }))
