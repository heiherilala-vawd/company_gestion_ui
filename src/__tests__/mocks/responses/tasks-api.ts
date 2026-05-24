/* eslint-disable @typescript-eslint/no-explicit-any */
export const task1Mock = {
  id: 'task1_id',
  title: 'Finaliser rapport travaux A',
  description: 'Rédiger le rapport de fin de travaux pour le projet A',
  status: 'IN_PROGRESS' as const,
  priority: 'HIGH' as const,
  due_date: new Date('2024-06-15'),
}

export const task2Mock = {
  id: 'task2_id',
  title: 'Commander matériaux',
  description: 'Passer commande pour les matériaux des travaux B',
  status: 'TODO' as const,
  priority: 'MEDIUM' as const,
  due_date: new Date('2024-06-30'),
}

export const tasksMock = [task1Mock, task2Mock]

export const crupdateTasksMock = [
  {
    id: 'task1_id',
    title: 'Finaliser rapport travaux A - Mis à jour',
    description: 'Rédiger le rapport de fin de travaux',
    status: 'DONE' as const,
    priority: 'HIGH' as const,
    due_date: new Date('2024-06-20'),
  },
  {
    id: 'task3_id',
    title: 'Nouvelle tâche',
    description: 'Description nouvelle tâche',
    status: 'TODO' as const,
    priority: 'LOW' as const,
    due_date: new Date('2024-07-15'),
  },
]

export const createOrUpdateTasks = (tasks: any[]) =>
  tasks.map((t: any) => ({ ...t, id: t.id || 'newId' }))
