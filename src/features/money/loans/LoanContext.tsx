import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: LoanProvider, useEntity: useLoan } = createGenericContext({
  storageKey: 'currentLoanId',
  entityName: 'loan',
})
