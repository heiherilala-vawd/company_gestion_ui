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
import { themeColors } from '../style/theme'

interface ResourceItem {
  name: string
  label: string
  icon: React.ElementType
  to: string
  testId?: string
}

const MenuRoot = () => {
  const [openStorage, setOpenStorage] = useState(true)
  const [openExpenses, setOpenExpenses] = useState(true)
  const [sidebarOpen] = useSidebarState()

  if (!sidebarOpen) return null

  const transversalItems: ResourceItem[] = [
    { name: 'home', label: 'Accueil', icon: HomeIcon, to: '/' },
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
    items.map((item) => (
      <ListItemButton
        key={item.name}
        component={Link}
        to={item.to}
        sx={{
          ...(nested ? menuStyles.nested : menuStyles.item),
          borderRadius: 2,
          mx: 1,
          mb: 0.5,
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&.Mui-selected': {
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 90, 60, 0.15)',
            color: '#fff',
            backdropFilter: 'blur(4px)',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
          '&:hover': {
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 90, 60, 0.1)',
            transform: 'translateX(4px)',
          },
        }}
        data-testid={item.testId}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: 'inherit',
          }}
        >
          <item.icon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        />
      </ListItemButton>
    ))

  return (
    <Box
      sx={{
        height: '100%',
        background: (theme: Theme) =>
          theme.palette.mode === 'light'
            ? themeColors.sidebarGradient
            : themeColors.sidebarDarkGradient,
        borderRadius: { xs: 0, md: '0 16px 16px 0' },
        p: 2,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
        },
      }}
      data-testid="menu-item-home"
    >
      <Box
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '-0.025em',
          }}
        >
          Test Admin
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.75rem',
          }}
        >
          Gestion d&apos;entreprise
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          ...menuStyles.section,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.6875rem',
          fontWeight: 600,
        }}
      >
        PRINCIPAL
      </Typography>
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(transversalItems)}
      </List>

      <Typography
        variant="caption"
        sx={{
          ...menuStyles.section,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.6875rem',
          fontWeight: 600,
        }}
      >
        STOCKAGE
      </Typography>
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(storageMain)}
      </List>

      <ListItemButton
        onClick={() => setOpenStorage(!openStorage)}
        sx={{
          ...menuStyles.item,
          borderRadius: 2,
          mx: 1,
          mb: 0.5,
          color: '#fff',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 90, 60, 0.1)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
          <PeopleAltIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Personnel & Déplacements"
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        />
        {openStorage ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStorage} timeout="auto" unmountOnExit>
        <List component="nav" dense disablePadding>
          {renderItems(storageSub, true)}
        </List>
      </Collapse>

      <Typography
        variant="caption"
        sx={{
          ...menuStyles.section,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.6875rem',
          fontWeight: 600,
        }}
      >
        FINANCES
      </Typography>

      <ListItemButton
        onClick={() => setOpenExpenses(!openExpenses)}
        sx={{
          ...menuStyles.item,
          borderRadius: 2,
          mx: 1,
          mb: 0.5,
          color: '#fff',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 90, 60, 0.1)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
          <MoneyOffIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="Dépenses"
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        />
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
