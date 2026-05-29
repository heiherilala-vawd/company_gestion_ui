export const cashAccount1Mock = {
  id: 'ca1_id',
  name: 'Caisse principale',
  balance: 5000,
  description: 'Caisse pour dépenses courantes',
}

export const cashAccount2Mock = {
  id: 'ca2_id',
  name: 'Caisse travaux',
  balance: 2500,
  description: 'Caisse dédiée aux travaux',
}

export const cashAccountsMock = [cashAccount1Mock, cashAccount2Mock]

export const crupdateCashAccountsMock = [
  {
    id: 'ca1_id',
    name: 'Caisse principale - Mis à jour',
    balance: 6000,
    description: 'Caisse pour dépenses courantes mise à jour',
  },
  {
    id: 'ca3_id',
    name: 'Nouvelle caisse',
    balance: 1000,
    description: 'Nouvelle caisse',
  },
]

export const createOrUpdateCashAccounts = (accounts: any[]) =>
  accounts.map((a: any) => ({ ...a, id: a.id || 'newId' }))
