import { Purchase, CrupdatePurchase } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'
import { equipment1Mock } from './equipment-api.ts'
import { material1Mock } from './materials-api.ts'
import { user1Mock } from './users-api.ts'

export const purchase1Mock: Purchase = {
  id: 'pur1_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  supplier: 'EquipCo Ltd',
  equipment: {
    id: equipment1Mock.id,
    name: equipment1Mock.name,
    description: equipment1Mock.description,
    warehouse_id: equipment1Mock.warehouse.id,
    floor_number: equipment1Mock.floor_number,
    storage_number: equipment1Mock.storage_number,
    comment: equipment1Mock.comment,
  },
  material: {
    id: material1Mock.id,
    name: material1Mock.name,
    description: material1Mock.description,
    unit: material1Mock.unit,
    comment: material1Mock.comment,
  },
  quantity: 2,
  is_equipment: true,
}

export const purchase2Mock: Purchase = {
  id: 'pur2_id',
  expense: {
    id: expense1Mock.id,
    amount: expense1Mock.amount,
    description: expense1Mock.description,
    job_id: expense1Mock.job.id,
    comment: expense1Mock.comment,
  },
  supplier: 'MaterialSupplier Inc',
  equipment: {
    id: equipment1Mock.id,
    name: equipment1Mock.name,
    description: equipment1Mock.description,
    warehouse_id: equipment1Mock.warehouse.id,
    floor_number: equipment1Mock.floor_number,
    storage_number: equipment1Mock.storage_number,
    comment: equipment1Mock.comment,
  },
  material: {
    id: material1Mock.id,
    name: material1Mock.name,
    description: material1Mock.description,
    unit: material1Mock.unit,
    comment: material1Mock.comment,
  },
  quantity: 50,
  is_equipment: false,
}

export const purchasesMock: Purchase[] = [purchase1Mock, purchase2Mock]

export const crupdatePurchasesMock: CrupdatePurchase[] = [
  {
    id: 'pur1_id',
    expense_id: expense1Mock.id,
    supplier: 'EquipCo Ltd Updated',
    equipment: equipment1Mock.id,
    material: material1Mock.id,
    quantity: 3,
    is_equipment: true,
  },
  {
    id: 'pur3_id',
    expense_id: expense1Mock.id,
    supplier: 'New Supplier SA',
    equipment: equipment1Mock.id,
    material: material1Mock.id,
    quantity: 100,
    is_equipment: false,
  },
]

export const createOrUpdatePurchases = (purchases: CrupdatePurchase[]): Purchase[] => {
  return purchases.map((pur) => ({
    ...pur,
    id: `newId`,
    expense: {
      id: pur.expense?.id || expense1Mock.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job.id,
      comment: expense1Mock.comment,
    },
    equipment: {
      id: `newId`,
      name: equipment1Mock.name,
      description: equipment1Mock.description,
      warehouse_id: equipment1Mock.warehouse.id,
      floor_number: equipment1Mock.floor_number,
      storage_number: equipment1Mock.storage_number,
      comment: equipment1Mock.comment,
    },
    material: {
      id: `newId`,
      name: material1Mock.name,
      description: material1Mock.description,
      unit: material1Mock.unit,
      comment: material1Mock.comment,
    },
    created_at: new Date().toISOString(),
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
