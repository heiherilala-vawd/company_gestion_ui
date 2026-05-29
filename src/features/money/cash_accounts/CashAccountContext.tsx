import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: CashAccountProvider, useEntity: useCashAccount } = createGenericContext({
  storageKey: 'currentCashAccountId',
  entityName: 'cashAccount',
})
