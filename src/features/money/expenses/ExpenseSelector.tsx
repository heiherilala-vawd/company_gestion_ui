import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { getMiddleUrlDynamicJobResource } from '../../../config/dynamicResources.ts'
import { useExpense } from './ExpenseContext.tsx'
interface ExpenseSelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  companyId?: string
}

export const ExpenseSelector: React.FC<ExpenseSelectorProps> = ({ ...props }) => {
  const endpoint = getMiddleUrlDynamicJobResource('expenses')

  return (
    <GenericSelector
      entityType="expense"
      apiEndpoint={endpoint}
      label="expense"
      labelPrefix="expense: "
      {...props}
      useContext={useExpense}
    />
  )
}
