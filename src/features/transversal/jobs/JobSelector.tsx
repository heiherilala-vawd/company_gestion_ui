// components/JobSelector.tsx
import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { useJob } from './JobContext.tsx'

interface JobSelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  companyId?: string // Pour filtrer les jobs par company
}

export const JobSelector: React.FC<JobSelectorProps> = ({ companyId, ...props }) => {
  const endpoint = companyId ? `/companies/${companyId}/jobs` : '/jobs'

  return (
    <GenericSelector
      entityType="job"
      apiEndpoint={endpoint}
      label="Job"
      {...props}
      useContext={useJob}
    />
  )
}
