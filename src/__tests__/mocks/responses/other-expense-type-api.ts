import { OtherExpenseType } from '../../../gen-ts/src'

export const otherExpenseType1Mock: OtherExpenseType = {
  id: 'oet1_id',
  name: 'Bureau',
  description: 'Fournitures de bureau',
  company_id: 'company1_id',
}

export const otherExpenseType2Mock: OtherExpenseType = {
  id: 'oet2_id',
  name: 'Nettoyage',
  description: 'Services de nettoyage',
  company_id: 'company1_id',
}

export const otherExpenseTypesMock: OtherExpenseType[] = [
  otherExpenseType1Mock,
  otherExpenseType2Mock,
]
