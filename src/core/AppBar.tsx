import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppBar as RAAppBar, TitlePortal } from 'react-admin'
import {
  Box,
  IconButton,
  Button,
  Tooltip,
  useMediaQuery,
  Collapse,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import { appBarStyles } from '../style/components'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { JobSelector } from '../features/transversal/jobs/JobSelector'
import { useThemeMode } from '../style/ThemeContext'
import { useTheme } from '@mui/material/styles'
import NotificationBell from '../features/notifications/NotificationBell'

export const AppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleMode } = useThemeMode()
  const prevPathRef = useRef(location.pathname)
  const prevPath = prevPathRef.current
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showSelectors, setShowSelectors] = useState(false)
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null)
  const userEmail = localStorage.getItem('user_email') || 'Utilisateur'
  const userRole = localStorage.getItem('user_role')
  const isEmployee = userRole === 'EMPLOYEE'

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
    <>
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
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { color: 'primary.main' },
              }}
            >
              Retour
            </Button>
          ))}
        <TitlePortal />
        <Box sx={{ flex: 1 }} />
        <NotificationBell />
        <Tooltip title={userEmail}>
          <IconButton
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            color="inherit"
            sx={appBarStyles.iconButton}
            data-testid="profile-menu-button"
          >
            <AccountCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          data-testid="profile-dropdown"
        >
          <MenuItem
            onClick={() => {
              setProfileAnchor(null)
              navigate('/profile')
            }}
            data-testid="menu-profile"
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Mon profil
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchor(null)
              navigate('/profile/password')
            }}
            data-testid="menu-password-change"
          >
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            Changer le mot de passe
          </MenuItem>
        </Menu>
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
          {!isEmployee && isMobile ? (
            <Tooltip title={showSelectors ? 'Masquer les sélecteurs' : 'Afficher les sélecteurs'}>
              <IconButton
                onClick={() => setShowSelectors((prev) => !prev)}
                color="inherit"
                sx={appBarStyles.iconButton}
                data-testid="toggle-selectors"
              >
                {showSelectors ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          ) : !isEmployee ? (
            <>
              <CompanySelector />
              <JobSelector />
            </>
          ) : null}
        </Box>
      </RAAppBar>
      {!isEmployee && isMobile && (
        <Collapse in={showSelectors}>
          <Box sx={appBarStyles.expandedSection}>
            <CompanySelector />
            <JobSelector />
          </Box>
        </Collapse>
      )}
    </>
  )
}

export default AppBar
