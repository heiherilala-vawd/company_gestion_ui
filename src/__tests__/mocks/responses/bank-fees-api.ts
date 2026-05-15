import { BankFee, CrupdateBankFee } from '../../../gen-ts/src'
import { expense1Mock } from './expenses-api.ts'
import { toCrupdateExpenseMoneyMapper } from '../../support/mappers.ts'

export const bankFee1Mock: BankFee = {
  id: 'bf1_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  bank_name: 'BNP Paribas',
  description: 'Monthly account maintenance fee',
}

export const bankFee2Mock: BankFee = {
  id: 'bf2_id',
  expense: toCrupdateExpenseMoneyMapper(expense1Mock),
  bank_name: 'Société Générale',
  description: 'International transfer fee',
}

export const bankFeesMock: BankFee[] = [bankFee1Mock, bankFee2Mock]

export const crupdateBankFeesMock: CrupdateBankFee[] = [
  {
    id: 'bf1_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    bank_name: 'BNP Paribas',
    description: 'Updated monthly maintenance fee',
  },
  {
    id: 'bf3_id',
    expense: toCrupdateExpenseMoneyMapper(expense1Mock),
    bank_name: 'Crédit Agricole',
    description: 'New bank fee for account opening',
  },
]

export const createOrUpdateBankFees = (bankFees: CrupdateBankFee[]): BankFee[] => {
  return bankFees.map((bf) => ({
    ...bf,
    id: `newId`,
    expense: {
      id: bf.expense?.id || expense1Mock?.id,
      amount: expense1Mock.amount,
      description: expense1Mock.description,
      job_id: expense1Mock.job?.id,
      comment: expense1Mock.comment,
    },
  }))
}
