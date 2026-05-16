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
import HomeIcon from '@mui/icons-material/Home'
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
import { menuStyles } from '../style/components'
import { canAccessResource } from '../auth/authProvider'

interface ResourceItem {
  name: string
  label: string
  icon: React.ElementType
  to: string
  testId?: string
  resource?: string
}

const MenuRoot = () => {
  const [openStorage, setOpenStorage] = useState(true)
  const [openExpenses, setOpenExpenses] = useState(true)
  const [sidebarOpen] = useSidebarState()

  if (!sidebarOpen) return null

  const transversalItems: ResourceItem[] = [
    { name: 'home', label: 'Accueil', icon: HomeIcon, to: '/', testId: 'menu-accueil' },
    { name: 'jobs', label: 'Jobs', icon: WorkIcon, to: '/jobs', testId: 'menu-jobs' },
    {
      name: 'companies',
      label: 'Entreprises',
      icon: BusinessIcon,
      to: '/companies',
      testId: 'menu-companies',
    },
    { name: 'users', label: 'Utilisateurs', icon: PeopleIcon, to: '/users', testId: 'menu-users' },
  ]

  const storageMain: ResourceItem[] = [
    {
      name: 'warehouses',
      label: 'Entrepôts',
      icon: WarehouseIcon,
      to: '/warehouses',
      testId: 'menu-warehouses',
    },
    {
      name: 'equipment',
      label: 'Équipements',
      icon: BuildIcon,
      to: '/equipment',
      testId: 'menu-equipments',
    },
    {
      name: 'materials',
      label: 'Matériaux',
      icon: CategoryIcon,
      to: '/materials',
      testId: 'menu-materials',
    },
  ]

  const storageSub: ResourceItem[] = [
    {
      name: 'travel_people',
      label: 'Personnel',
      icon: PeopleAltIcon,
      to: '/travel_people',
      testId: 'menu-travel-peoples',
    },
    {
      name: 'travel_materials',
      label: 'Matériaux dépl.',
      icon: CategoryIcon,
      to: '/travel_materials',
      testId: 'menu-travel-materials',
    },
    {
      name: 'travel_equipment',
      label: 'Équipement dépl.',
      icon: BuildIcon,
      to: '/travel_equipment',
      testId: 'menu-travel-equipments',
    },
  ]

  const expenses: ResourceItem[] = [
    {
      name: 'expenses',
      label: 'Dépenses',
      icon: MoneyOffIcon,
      to: '/expenses',
      testId: 'menu-expenses',
    },
    {
      name: 'travel_expenses',
      label: 'Déplacements',
      icon: FlightTakeoffIcon,
      to: '/travel_expenses',
      testId: 'menu-travel-expenses',
    },
    {
      name: 'purchases',
      label: 'Achats',
      icon: ShoppingCartIcon,
      to: '/purchases',
      testId: 'menu-purchases',
    },
    {
      name: 'bank_fees',
      label: 'Frais bancaire',
      icon: AccountBalanceIcon,
      to: '/bank_fees',
      testId: 'menu-bank-fees',
    },
    {
      name: 'other_expenses',
      label: 'Autres dépenses',
      icon: MoneyOffIcon,
      to: '/other_expenses',
      testId: 'menu-other-expenses',
    },
    {
      name: 'employer_payments',
      label: 'Salaires',
      icon: PaymentsIcon,
      to: '/employee_payments',
      testId: 'menu-employee-payments',
      resource: 'employee_payments',
    },
  ]

  const incomes: ResourceItem[] = [
    {
      name: 'incomes',
      label: 'Revenus',
      icon: PaidIcon,
      to: '/incomes',
      testId: 'menu-incomes',
    },
  ]

  const renderItems = (items: ResourceItem[], nested = false) =>
    items
      .filter((item) => {
        if (item.name === 'home') return true
        const resource = item.resource || item.name
        return canAccessResource(resource, 'list')
      })
      .map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          sx={{
            ...(nested ? menuStyles.nested : menuStyles.listItem),
          }}
          data-testid={item.testId}
        >
          <ListItemIcon sx={menuStyles.listItemIcon}>
            <item.icon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item.label} primaryTypographyProps={menuStyles.listItemText} />
        </ListItemButton>
      ))

  return (
    <Box sx={menuStyles.container} data-testid="menu-item-home">
      <Box sx={menuStyles.headerBox}>
        <Typography variant="h6" sx={menuStyles.appTitle}>
          Test Admin
        </Typography>
        <Typography variant="caption" sx={menuStyles.appSubtitle}>
          Gestion d&apos;entreprise
        </Typography>
      </Box>

      <Box sx={menuStyles.sectionHeaderBlue}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#4285F4',
            flexShrink: 0,
          }}
        />
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, letterSpacing: '1.5px', fontSize: '0.75rem', color: 'inherit' }}
        >
          PRINCIPAL
        </Typography>
      </Box>
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(transversalItems)}
      </List>

      <Box sx={menuStyles.sectionHeaderGreen}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#34A853',
            flexShrink: 0,
          }}
        />
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, letterSpacing: '1.5px', fontSize: '0.75rem', color: 'inherit' }}
        >
          STOCKAGE
        </Typography>
      </Box>
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(storageMain)}
      </List>

      <ListItemButton
        onClick={() => setOpenStorage(!openStorage)}
        sx={menuStyles.collapsibleButton}
      >
        <ListItemIcon sx={menuStyles.listItemIcon}>
          <PeopleAltIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Déplacements" primaryTypographyProps={menuStyles.listItemText} />
        {openStorage ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStorage} timeout="auto" unmountOnExit>
        <List component="nav" dense disablePadding>
          {renderItems(storageSub, true)}
        </List>
      </Collapse>

      <Box sx={menuStyles.sectionHeaderRed}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#EA4335',
            flexShrink: 0,
          }}
        />
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, letterSpacing: '1.5px', fontSize: '0.75rem', color: 'inherit' }}
        >
          FINANCES
        </Typography>
      </Box>

      <ListItemButton
        onClick={() => setOpenExpenses(!openExpenses)}
        sx={menuStyles.collapsibleButton}
      >
        <ListItemIcon sx={menuStyles.listItemIcon}>
          <MoneyOffIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Dépenses" primaryTypographyProps={menuStyles.listItemText} />
        {openExpenses ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openExpenses} timeout="auto" unmountOnExit>
        <List component="nav" dense disablePadding>
          {renderItems(expenses, true)}
        </List>
      </Collapse>

      <List component="nav" dense>
        {renderItems(incomes)}
      </List>
    </Box>
  )
}

export { MenuRoot as Menu }
export default MenuRoot
