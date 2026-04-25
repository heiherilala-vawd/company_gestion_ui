// components/CompanySelector.tsx - Version simplifiée
import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { useCompany } from './CompanyContext.tsx'

interface CompanySelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
}

export const CompanySelector: React.FC<CompanySelectorProps> = (props) => {
  return (
    <GenericSelector
      entityType="company"
      apiEndpoint="/companies"
      label="Company"
      labelPrefix="Company: "
      {...props}
      useContext={useCompany}
    />
  )
}
