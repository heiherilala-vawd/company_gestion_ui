export interface CashTransaction {
  id?: string
  cash_account_id?: string
  amount?: number
  transaction_date?: any
  description?: string
  type?: string
}

export const cashTransaction1Mock: CashTransaction = {
  id: 'ct1_id',
  cash_account_id: 'ca1_id',
  amount: -500,
  transaction_date: '2025-06-03' as any,
  description: 'Achat fournitures bureau',
  type: 'DEBIT',
}

export const cashTransaction2Mock: CashTransaction = {
  id: 'ct2_id',
  cash_account_id: 'ca1_id',
  amount: 2000,
  transaction_date: '2025-06-05' as any,
  description: 'Dépôt client travaux A',
  type: 'CREDIT',
}

export const cashTransactionsMock: CashTransaction[] = [cashTransaction1Mock, cashTransaction2Mock]

export const crupdateCashTransactionsMock: CashTransaction[] = [
  {
    id: 'ct1_id',
    cash_account_id: 'ca1_id',
    amount: -450,
    transaction_date: '2025-06-03' as any,
    description: 'Achat fournitures bureau - corrigé',
    type: 'DEBIT',
  },
  {
    id: 'ct3_id',
    cash_account_id: 'ca2_id',
    amount: -150,
    transaction_date: '2025-06-10' as any,
    description: 'Carburant travaux',
    type: 'DEBIT',
  },
]

export const createOrUpdateCashTransactions = (
  transactions: CashTransaction[],
): CashTransaction[] => {
  return transactions.map((t) => ({
    ...t,
    id: t.id || 'new_ct_id',
  }))
}
