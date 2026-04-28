import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: TravelExpenseProvider, useEntity: useTravelExpense } =
  createGenericContext({
    storageKey: 'currentTravelExpenseId',
    entityName: 'travelExpense',
  })
