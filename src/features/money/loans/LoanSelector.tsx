import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { getMiddleUrlDynamicJobResource } from '../../../config/dynamicResources.ts'
import { useLoan } from './LoanContext.tsx'

interface LoanSelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  companyId?: string
}

export const LoanSelector: React.FC<LoanSelectorProps> = ({ ...props }) => {
  const endpoint = getMiddleUrlDynamicJobResource('loans')

  return (
    <GenericSelector
      entityType="loan"
      apiEndpoint={endpoint}
      label="loan"
      labelPrefix="Loan: "
      {...props}
      useContext={useLoan}
    />
  )
}
