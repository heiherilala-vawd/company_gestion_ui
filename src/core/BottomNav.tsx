import { useNavigate, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import BusinessIcon from '@mui/icons-material/Business'
import BadgeIcon from '@mui/icons-material/Badge'
import InventoryIcon from '@mui/icons-material/Inventory'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol'
import { bottomNavStyles } from '../style/components'

const navItems = [
  { label: 'Accueil', icon: HomeIcon, to: '/' },
  { label: 'Société', icon: BusinessIcon, to: '/company' },
  { label: 'RH', icon: BadgeIcon, to: '/rh' },
  { label: 'Stock', icon: InventoryIcon, to: '/stock' },
  { label: 'Équipement', icon: PrecisionManufacturingIcon, to: '/equipment-hub' },
  { label: 'Monétaire', icon: EuroSymbolIcon, to: '/monetary' },
]

function getActiveIndex(pathname: string): number {
  if (pathname === '/' || pathname === '/home') return 0
  if (pathname.startsWith('/company')) return 1
  if (pathname.startsWith('/rh')) return 2
  if (pathname.startsWith('/stock')) return 3
  if (pathname.startsWith('/equipment-hub')) return 4
  if (pathname.startsWith('/monetary')) return 5
  return -1
}

export const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const value = getActiveIndex(location.pathname)

  return (
    <Paper sx={bottomNavStyles.paper} elevation={4}>
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
