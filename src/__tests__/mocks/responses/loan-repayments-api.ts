export const loanRepayment1Mock = {
  id: 'lr1_id',
  loan_id: 'loan1_id',
  amount: 5000,
  payment_date: new Date('2024-03-01'),
  principal_portion: 4000,
  interest_portion: 1000,
}

export const loanRepayment2Mock = {
  id: 'lr2_id',
  loan_id: 'loan1_id',
  amount: 5000,
  payment_date: new Date('2024-04-01'),
  principal_portion: 4100,
  interest_portion: 900,
}

export const loanRepaymentsMock = [loanRepayment1Mock, loanRepayment2Mock]

export const crupdateLoanRepaymentsMock = [
  {
    id: 'lr1_id',
    loan_id: 'loan1_id',
    amount: 5500,
    payment_date: new Date('2024-03-01'),
  },
  {
    id: 'lr3_id',
    loan_id: 'loan1_id',
    amount: 5000,
    payment_date: new Date('2024-05-01'),
  },
]

export const createOrUpdateLoanRepayments = (repayments: any[]) =>
  repayments.map((r: any) => ({ ...r, id: r.id || 'newId' }))
