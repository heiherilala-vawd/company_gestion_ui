import React from 'react'
import { GenericSelector } from '../../../generic/GenericSelector.tsx'
import { useJob } from './JobContext.tsx'
import { getMiddleUrlDynamicCompanyResource } from '../../../config/dynamicResources.ts'

interface JobSelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  companyId?: string
}

export const JobSelector: React.FC<JobSelectorProps> = ({ ...props }) => {
  const endpoint = getMiddleUrlDynamicCompanyResource('jobs')

  return (
    <GenericSelector
      entityType="job"
      apiEndpoint={endpoint}
      label="Job"
      labelPrefix="Job: "
      {...props}
      useContext={useJob}
    />
  )
}
