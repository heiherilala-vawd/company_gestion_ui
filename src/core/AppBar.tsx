import React from 'react'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box, IconButton, Tooltip, alpha } from '@mui/material'
import { Brightness4, Brightness7, NotificationsNone } from '@mui/icons-material'
import { appBarStyles } from '../style/components'
import { useThemeMode } from '../style/ThemeContext'
import { colors, borderRadius as br, transitions, getShadow } from '../style/themeConfig'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'

export const AppBar = () => {
  const { mode, toggleMode } = useThemeMode()
  const isDark = mode === 'dark'

  return (
    <RAAppBar
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: (theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
        borderBottom: (theme) =>
          theme.palette.mode === 'light'
            ? `1px solid ${colors.light.divider}`
            : `1px solid ${colors.dark.divider}`,
        backdropFilter: 'blur(12px)',
        backgroundImage: 'none',
        borderRadius: { xs: 0, md: 0 },
        transition: transitions.default,
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
                theme.palette.mode === 'light'
                  ? 'rgba(255, 90, 60, 0.04)'
                  : 'rgba(255, 90, 60, 0.08)',
              borderRadius: br.xs,
              transition: transitions.default,
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 90, 60, 0.08)'
                    : 'rgba(255, 90, 60, 0.12)',
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
                theme.palette.mode === 'light'
                  ? 'rgba(255, 90, 60, 0.04)'
                  : 'rgba(255, 90, 60, 0.08)',
              borderRadius: br.xs,
              transition: transitions.default,
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 90, 60, 0.08)'
                    : 'rgba(255, 90, 60, 0.12)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <NotificationsNone />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? alpha(colors.primary.main, 0.04)
                  : alpha(colors.primary.main, 0.08),
              borderRadius: br.xs,
              transition: transitions.default,
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? alpha(colors.primary.main, 0.08)
                    : alpha(colors.primary.main, 0.12),
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
