export const incomeType1Mock = {
  id: 'inctype1_id',
  name: 'Vente service',
  description: 'Revenus liés à la vente de services',
}

export const incomeType2Mock = {
  id: 'inctype2_id',
  name: 'Vente matériel',
  description: 'Revenus liés à la vente de matériel',
}

export const incomeTypesMock = [incomeType1Mock, incomeType2Mock]

export const crupdateIncomeTypesMock = [
  {
    id: 'inctype1_id',
    name: 'Vente service - Mis à jour',
    description: 'Revenus liés à la vente de services mise à jour',
  },
  {
    id: 'inctype3_id',
    name: 'Nouveau type',
    description: 'Description nouveau type',
  },
]

export const createOrUpdateIncomeTypes = (types: any[]) =>
  types.map((t: any) => ({ ...t, id: t.id || 'newId' }))
