export const receipt1Mock = {
  id: 'rec1_id',
  income_id: 'inc1_id',
  amount: 10000,
  payment_date: new Date('2024-02-15'),
}

export const receipt2Mock = {
  id: 'rec2_id',
  income_id: 'inc1_id',
  amount: 5000,
  payment_date: new Date('2024-03-15'),
}

export const receiptsMock = [receipt1Mock, receipt2Mock]

export const crupdateReceiptsMock = [
  {
    id: 'rec1_id',
    income_id: 'inc1_id',
    amount: 12000,
    payment_date: new Date('2024-02-15'),
  },
  {
    id: 'rec3_id',
    income_id: 'inc1_id',
    amount: 8000,
    payment_date: new Date('2024-04-15'),
  },
]

export const createOrUpdateReceipts = (receipts: any[]) =>
  receipts.map((r: any) => ({ ...r, id: r.id || 'newId' }))
