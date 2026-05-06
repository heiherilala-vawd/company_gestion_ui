import React from 'react'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7, NotificationsNone } from '@mui/icons-material'
import { appBarStyles } from '../style/components'
import { useThemeMode } from '../style/ThemeContext'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'

export const AppBar = () => {
  const { mode, toggleMode } = useThemeMode()

  return (
    <RAAppBar
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
            : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
        borderBottom: (theme) =>
          theme.palette.mode === 'light'
            ? '1px solid rgba(0,0,0,0.04)'
            : '1px solid rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        backgroundImage: 'none',
        borderRadius: { xs: 0, md: 0 },
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <TitlePortal />
      <Box sx={{ flex: 1 }} />
      <Box sx={appBarStyles.container}>
        <>
          <CompanySelector />
          <JobSelector />
        </>
        <Tooltip title={mode === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}>
          <IconButton
            onClick={toggleMode}
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
              borderRadius: 2,
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
              borderRadius: 2,
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <NotificationsNone />
          </IconButton>
        </Tooltip>
      </Box>
    </RAAppBar>
  )
}

export default AppBar
