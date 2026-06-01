import { material1Mock } from './materials-api'
import { user1Mock } from './users-api'
import { job1Mock } from './jobs-api'
import { supplier1Mock } from './suppliers-api'
import { toAuditUserMapper } from '../../support/mappers'

export const purchaseOrder1Mock = {
  id: 'po1_id',
  supplier_id: 'sup1_id',
  supplier: { id: 'sup1_id', name: 'Fournitures BTP SARL' },
  order_date: '2026-05-25',
  status: 'PENDING',
  total_amount: 5000,
  job_id: 'job1_id',
  job: { id: 'job1_id', description: 'Construction of Building A' },
  comment: 'Première commande',
  lines: [
    {
      id: 'pol1_id',
      material_id: 'mat1_id',
      material: { id: 'mat1_id', name: 'Cement' },
      quantity: 10,
      unit_price: 500,
    },
  ],
  created_at: '2026-05-25T08:00:00Z',
  updated_at: '2026-05-25T08:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const purchaseOrder2Mock = {
  id: 'po2_id',
  supplier_id: 'sup2_id',
  supplier: { id: 'sup2_id', name: 'Matériaux Modernes SAS' },
  order_date: '2026-06-01',
  status: 'VALIDATED',
  total_amount: 12000,
  job_id: 'job1_id',
  job: { id: 'job1_id', description: 'Construction of Building A' },
  comment: 'Seconde commande',
  lines: [
    {
      id: 'pol2_id',
      material_id: 'mat1_id',
      material: { id: 'mat1_id', name: 'Cement' },
      quantity: 50,
      unit_price: 240,
    },
  ],
  created_at: '2026-06-01T09:00:00Z',
  updated_at: '2026-06-02T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const purchaseOrdersMock = [purchaseOrder1Mock, purchaseOrder2Mock]

export const crupdatePurchaseOrdersMock = [
  {
    id: 'po1_id',
    supplier_id: 'sup1_id',
    order_date: '2026-05-25',
    status: 'DELIVERED',
    total_amount: 5500,
    job_id: 'job1_id',
    comment: 'Commande livrée',
    lines: [
      { purchase_order_id: 'po1_id', material_id: 'mat1_id', quantity: 10, unit_price: 550 },
    ],
  },
  {
    id: 'po3_id',
    supplier_id: 'sup2_id',
    order_date: '2026-06-15',
    status: 'PENDING',
    total_amount: 3000,
    job_id: 'job1_id',
    comment: 'Nouvelle commande',
    lines: [
      { purchase_order_id: 'po3_id', material_id: 'mat1_id', quantity: 5, unit_price: 600 },
    ],
  },
]

export const createOrUpdatePurchaseOrders = (orders: any[]) =>
  orders.map((po: any) => ({
    ...po,
    id: po.id || 'newPoId',
    supplier: { id: po.supplier_id || 'sup1_id', name: 'Fournitures BTP SARL' },
    job: { id: po.job_id || 'job1_id', description: 'Construction of Building A' },
    lines: (po.lines || []).map((line: any) => ({
      ...line,
      id: line.id || 'newPolId',
      material: { id: line.material_id || 'mat1_id', name: 'Cement' },
    })),
    created_at: '2026-06-01T08:00:00Z',
    updated_at: '2026-06-01T08:00:00Z',
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
