import React from 'react'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box } from '@mui/material'
import { appBarStyles } from '../style/components'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'

export const AppBar = () => {
  return (
    <RAAppBar sx={appBarStyles.appBar}>
      <TitlePortal />
      <Box sx={{ flex: 1 }} />
      <Box sx={appBarStyles.container}>
        <>
          <CompanySelector />
          <JobSelector />
        </>
      </Box>
    </RAAppBar>
  )
}

export default AppBar
