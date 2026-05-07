import React from 'react'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { appBarStyles } from '../style/components'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'
import { useThemeMode } from '../style/ThemeContext'

export const AppBar = () => {
  const { mode, toggleMode } = useThemeMode()

  return (
    <RAAppBar sx={appBarStyles.appBar}>
      <TitlePortal />
      <Box sx={{ flex: 1 }} />
      <Box sx={appBarStyles.container}>
        <IconButton onClick={toggleMode} color="inherit" sx={{ mr: 1 }}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <>
          <CompanySelector />
          <JobSelector />
        </>
      </Box>
    </RAAppBar>
  )
}

export default AppBar
