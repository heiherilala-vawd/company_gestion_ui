// components/ExpenseSelector.tsx
import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { useTravelExpense } from './TravelExpenseContext.tsx'
import { getMiddleUrlDynamicExpensesResource } from '../../../config/dynamicResources.ts'

interface TravelExpenseSelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  companyId?: string
}

export const TravelExpenseSelector: React.FC<TravelExpenseSelectorProps> = ({ ...props }) => {
  const endpoint = getMiddleUrlDynamicExpensesResource('travel_expenses')

  return (
    <GenericSelector
      entityType="TravelExpense"
      apiEndpoint={endpoint}
      label="TravelExpense"
      labelPrefix="TravelExpense: "
      {...props}
      useContext={useTravelExpense}
    />
  )
}
