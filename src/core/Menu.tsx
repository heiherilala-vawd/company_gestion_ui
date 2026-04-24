import { useState } from 'react'
import { useSidebarState } from 'react-admin'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import WorkIcon from '@mui/icons-material/Work'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import BuildIcon from '@mui/icons-material/Build'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import PaidIcon from '@mui/icons-material/Paid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'

interface ResourceItem {
  name: string
  label: string
  icon: React.ElementType
  to: string
}

interface ResourceGroup {
  title: string
  color: string
  items: ResourceItem[]
}

const MenuRoot = () => {
  const [openStorage, setOpenStorage] = useState(true)
  const [openExpenses, setOpenExpenses] = useState(true)
  const [sidebarOpen] = useSidebarState()

  if (!sidebarOpen) return null

  const handleClickStorage = () => setOpenStorage(!openStorage)
  const handleClickExpenses = () => setOpenExpenses(!openExpenses)

  const transversal: ResourceGroup = {
    title: '⚡ Transversal',
    color: 'primary.main',
    items: [
      { name: 'jobs', label: '📋 Jobs', icon: WorkIcon, to: '/jobs' },
      { name: 'companies', label: '🏢 Companies', icon: BusinessIcon, to: '/companies' },
      { name: 'users', label: '👥 Users', icon: PeopleIcon, to: '/users' },
    ],
  }

  const storageMain: ResourceItem[] = [
    { name: 'warehouses', label: '🏭 Warehouse', icon: WarehouseIcon, to: '/warehouses' },
    { name: 'equipment', label: '🔧 Equipments', icon: BuildIcon, to: '/equipment' },
    { name: 'materials', label: '📦 Materials', icon: CategoryIcon, to: '/materials' },
  ]

  const storageSub: ResourceItem[] = [
    { name: 'travel_people', label: '👷 Personnel', icon: PeopleAltIcon, to: '/travel_people' },
    {
      name: 'travel_materials',
      label: '🚚 Matériaux',
      icon: CategoryIcon,
      to: '/travel_materials',
    },
    { name: 'travel_equipment', label: '🚜 Équipement', icon: BuildIcon, to: '/travel_equipment' },
  ]

  const expenses: ResourceItem[] = [
    { name: 'expenses', label: '💸 Dépenses', icon: MoneyOffIcon, to: '/expenses' },
    {
      name: 'travel_expenses',
      label: '✈️ Déplacements',
      icon: FlightTakeoffIcon,
      to: '/travel_expenses',
    },
    { name: 'purchases', label: '🛒 Achats', icon: ShoppingCartIcon, to: '/purchases' },
    { name: 'bank_fees', label: '🏦 Frais banca', icon: AccountBalanceIcon, to: '/bank_fees' },
    { name: 'other_expenses', label: '📝 Autres', icon: MoneyOffIcon, to: '/other_expenses' },
    {
      name: 'employer_payments',
      label: '💰 Salaires',
      icon: PaymentsIcon,
      to: '/employer_payments',
    },
  ]

  const incomes: ResourceItem[] = [
    { name: 'incomes', label: '💵 Revenus', icon: PaidIcon, to: '/incomes' },
  ]

  return (
    <Box sx={{ padding: '10px 0' }}>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          padding: '8px 16px',
          color: 'primary.main',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {transversal.title}
      </Typography>
      <List component="nav" dense>
        {transversal.items.map((item) => (
          <ListItemButton key={item.name} component={Link} to={item.to} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ my: 1, mx: 2, borderBottom: '1px solid', borderColor: 'divider' }} />

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          padding: '8px 16px',
          color: 'warning.main',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        📦 Gestion de stockage
      </Typography>
      <List component="nav" dense>
        {storageMain.map((item) => (
          <ListItemButton key={item.name} component={Link} to={item.to} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <ListItemButton onClick={handleClickStorage} sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <PeopleAltIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="👥 Personnel & Déplacements" />
        {openStorage ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStorage} timeout="auto" unmountOnExit>
        <List component="nav" dense disablePadding>
          {storageSub.map((item) => (
            <ListItemButton key={item.name} component={Link} to={item.to} sx={{ pl: 4, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <Box sx={{ my: 1, mx: 2, borderBottom: '1px solid', borderColor: 'divider' }} />

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          padding: '8px 16px',
          color: 'success.main',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        💰 Gestion d&apos;argent
      </Typography>

      <ListItemButton onClick={handleClickExpenses} sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <MoneyOffIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="💸 Dépenses" />
        {openExpenses ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openExpenses} timeout="auto" unmountOnExit>
        <List component="nav" dense disablePadding>
          {expenses.map((item) => (
            <ListItemButton key={item.name} component={Link} to={item.to} sx={{ pl: 4, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <List component="nav" dense>
        {incomes.map((item) => (
          <ListItemButton key={item.name} component={Link} to={item.to} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default MenuRoot
