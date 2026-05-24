/* eslint-disable @typescript-eslint/no-explicit-any */
export const maintenance1Mock = {
  id: 'maint1_id',
  equipment_id: 'eq1_id',
  description: 'Révision annuelle excavatrice',
  expense: {
    amount: 2500,
    comment: 'Facture révision moteur',
  },
}

export const maintenance2Mock = {
  id: 'maint2_id',
  equipment_id: 'eq2_id',
  description: 'Remplacement courroie',
  expense: {
    amount: 800,
    comment: 'Remplacement courroie de transmission',
  },
}

export const maintenancesMock = [maintenance1Mock, maintenance2Mock]

export const crupdateMaintenancesMock = [
  {
    id: 'maint1_id',
    equipment_id: 'eq1_id',
    description: 'Révision annuelle - mise à jour',
    expense: {
      amount: 3000,
      comment: 'Facture révision complète',
    },
  },
  {
    id: 'maint3_id',
    equipment_id: 'eq1_id',
    description: 'Vidange huile',
    expense: {
      amount: 400,
      comment: 'Vidange moteur',
    },
  },
]

export const createOrUpdateMaintenances = (maintenances: any[]) =>
  maintenances.map((m: any) => ({ ...m, id: m.id || 'newId' }))
