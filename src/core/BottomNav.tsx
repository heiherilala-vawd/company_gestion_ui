import { useNavigate, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import BusinessIcon from '@mui/icons-material/Business'
import BadgeIcon from '@mui/icons-material/Badge'
import InventoryIcon from '@mui/icons-material/Inventory'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol'
import { bottomNavStyles } from '../style/components'

const allNavItems = [
  { label: 'Accueil', icon: HomeIcon, to: '/home' },
  { label: 'Société', icon: BusinessIcon, to: '/company' },
  { label: 'RH', icon: BadgeIcon, to: '/rh' },
  { label: 'Stock', icon: InventoryIcon, to: '/stock' },
  { label: 'Équipement', icon: PrecisionManufacturingIcon, to: '/equipment-hub' },
  { label: 'Base de déplacement', icon: EuroSymbolIcon, to: '/monetary' },
]

function getNavItems(): typeof allNavItems {
  const userRole = localStorage.getItem('user_role')
  if (userRole === 'WAREHOUSE_WORKER') {
    return allNavItems.filter(
      (item) => item.label !== 'Société' && item.label !== 'Base de déplacement',
    )
  }
  return allNavItems
}

function getActiveIndex(pathname: string, items: typeof allNavItems): number {
  if (pathname === '/' || pathname === '/home') {
    return items.findIndex((i) => i.to === '/')
  }
  for (let i = 0; i < items.length; i++) {
    if (pathname.startsWith(items[i].to) && items[i].to !== '/') {
      return i
    }
  }
  return -1
}

export const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navItems = getNavItems()
  const value = getActiveIndex(location.pathname, navItems)

  const userRole = localStorage.getItem('user_role')
  if (userRole === 'EMPLOYEE') return null

  return (
    <Paper sx={bottomNavStyles.paper} elevation={4} data-testid="bottom-nav">
      <BottomNavigation
        value={value === -1 ? false : value}
        onChange={(_, newValue) => navigate(navItems[newValue].to)}
        sx={bottomNavStyles.nav}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.to}
            label={item.label}
            icon={<item.icon />}
            sx={bottomNavStyles.action}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
