import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import { Box, IconButton, Button, Tooltip } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import { appBarStyles } from '../style/components'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'
import { useThemeMode } from '../style/ThemeContext'

export const AppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleMode } = useThemeMode()
  const prevPathRef = useRef(location.pathname)
  const prevPath = prevPathRef.current

  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location])

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/auth')
  const prevIsAuth = prevPath === '/login' || prevPath.startsWith('/auth')

  return (
    <RAAppBar sx={appBarStyles.appBar}>
      <Tooltip title="Retour à l'accueil">
        <IconButton onClick={() => navigate('/')} color="inherit" sx={{ mr: 0.5 }}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
      {!isAuthPage && window.history.length > 1 && !prevIsAuth && (
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} color="inherit">
          Retour
        </Button>
      )}
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
