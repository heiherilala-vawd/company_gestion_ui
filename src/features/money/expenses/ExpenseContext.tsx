import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: ExpenseProvider, useEntity: useExpense } = createGenericContext({
  storageKey: 'currentExpenseId',
  entityName: 'expense',
})
