import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: IncomeProvider, useEntity: useIncome } = createGenericContext({
  storageKey: 'currentIncomeId',
  entityName: 'income',
})
