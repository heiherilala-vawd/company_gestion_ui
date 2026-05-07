import React from 'react'
import BusinessIcon from '@mui/icons-material/Business'
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
      icon={<BusinessIcon fontSize="small" />}
      {...props}
      useContext={useCompany}
    />
  )
}
