import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box, IconButton, Button, Tooltip, useMediaQuery } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import { appBarStyles } from '../style/components'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'
import { useThemeMode } from '../style/ThemeContext'
import { useTheme } from '@mui/material/styles'

export const AppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleMode } = useThemeMode()
  const prevPathRef = useRef(location.pathname)
  const prevPath = prevPathRef.current
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location])

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname.startsWith('/auth')
  const prevIsAuth =
    prevPath === '/login' || prevPath === '/register' || prevPath.startsWith('/auth')

  return (
    <RAAppBar sx={appBarStyles.appBar} data-testid={'menu-item-selector-home'}>
      <Tooltip title="Accueil">
        <IconButton onClick={() => navigate('/')} color="inherit" sx={appBarStyles.iconButton}>
          <HomeIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {!isAuthPage &&
        window.history.length > 1 &&
        !prevIsAuth &&
        (isMobile ? (
          <Tooltip title="Retour">
            <IconButton onClick={() => navigate(-1)} color="inherit" sx={appBarStyles.iconButton}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            color="inherit"
            size="small"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Retour
          </Button>
        ))}
      <TitlePortal />
      <Box sx={{ flex: 1 }} />
      <Box sx={appBarStyles.container}>
        <Tooltip title={mode === 'dark' ? 'Mode clair' : 'Mode sombre'}>
          <IconButton onClick={toggleMode} color="inherit" sx={appBarStyles.iconButton}>
            {mode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <CompanySelector />
        <JobSelector />
      </Box>
    </RAAppBar>
  )
}

export default AppBar
