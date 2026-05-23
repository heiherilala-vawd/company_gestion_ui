import { useSidebarState } from 'react-admin'
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
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

const sectionColors: Record<string, string> = {
  Général: '#6CA568',
  RH: '#A78BFA',
  Stock: '#4ADE80',
  Équipement: '#FBBF24',
  Monétaire: '#F87171',
}

const SectionHeader = ({ label }: { label: string }) => (
  <Box sx={menuStyles.sectionHeader}>
    <Box
      sx={{
        ...menuStyles.sectionDot,
        backgroundColor: sectionColors[label] || '#6CA568',
      }}
    />
    <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 600 }}>
      {label}
    </Typography>
  </Box>
)

const MenuRoot = () => {
  const [sidebarOpen] = useSidebarState()

  if (!sidebarOpen) return null

  const generalItems: ResourceItem[] = [
    { name: 'home', label: 'Accueil', icon: HomeIcon, to: '/', testId: 'menu-accueil' },
    { name: 'jobs', label: 'Chantiers', icon: WorkIcon, to: '/jobs', testId: 'menu-jobs' },
    {
      name: 'companies',
      label: 'Entreprises',
      icon: BusinessIcon,
      to: '/companies',
      testId: 'menu-companies',
    },
  ]

  const rhItems: ResourceItem[] = [
    { name: 'users', label: 'Utilisateurs', icon: PeopleIcon, to: '/users', testId: 'menu-users' },
    {
      name: 'employer_payments',
      label: 'Salaires',
      icon: PaymentsIcon,
      to: '/employee_payments',
      testId: 'menu-employee-payments',
      resource: 'employee_payments',
    },
    {
      name: 'travel_people',
      label: 'Personnel',
      icon: PeopleAltIcon,
      to: '/travel_people',
      testId: 'menu-travel-peoples',
    },
    {
      name: 'leaves',
      label: 'Congés',
      icon: CalendarMonthIcon,
      to: '/leaves',
      testId: 'menu-leaves',
    },
  ]

  const stockItems: ResourceItem[] = [
    {
      name: 'warehouses',
      label: 'Entrepôts',
      icon: WarehouseIcon,
      to: '/warehouses',
      testId: 'menu-warehouses',
    },
    {
      name: 'materials',
      label: 'Matériaux',
      icon: CategoryIcon,
      to: '/materials',
      testId: 'menu-materials',
    },
    {
      name: 'travel_materials',
      label: 'Matériaux dépl.',
      icon: CategoryIcon,
      to: '/travel_materials',
      testId: 'menu-travel-materials',
    },
    {
      name: 'purchases',
      label: 'Achats',
      icon: ShoppingCartIcon,
      to: '/purchases?isMaterial=true',
      testId: 'menu-purchases',
    },
  ]

  const equipmentItems: ResourceItem[] = [
    {
      name: 'equipment',
      label: 'Équipements',
      icon: BuildIcon,
      to: '/equipment',
      testId: 'menu-equipments',
    },
    {
      name: 'travel_equipment',
      label: 'Équipement dépl.',
      icon: BuildIcon,
      to: '/travel_equipment',
      testId: 'menu-travel-equipments',
    },
    {
      name: 'purchases',
      label: 'Achats',
      icon: ShoppingCartIcon,
      to: '/purchases?isEquipment=true',
      testId: 'menu-purchases',
    },
  ]

  const monetaryItems: ResourceItem[] = [
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
      name: 'incomes',
      label: 'Revenus',
      icon: PaidIcon,
      to: '/incomes',
      testId: 'menu-incomes',
    },
    {
      name: 'purchases',
      label: 'Achats',
      icon: ShoppingCartIcon,
      to: '/purchases',
      testId: 'menu-purchases',
    },
  ]

  const renderItems = (items: ResourceItem[]) =>
    items
      .filter((item) => {
        const resource = item.resource || item.name
        return canAccessResource(resource, 'list')
      })
      .map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          sx={menuStyles.listItem}
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
          GestPro
        </Typography>
        <Typography variant="caption" sx={menuStyles.appSubtitle}>
          Gestion d&apos;entreprise
        </Typography>
      </Box>

      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(generalItems)}
      </List>

      <SectionHeader label="RH" />
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(rhItems)}
      </List>

      <SectionHeader label="Stock" />
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(stockItems)}
      </List>

      <SectionHeader label="Équipement" />
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(equipmentItems)}
      </List>

      <SectionHeader label="Monétaire" />
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(monetaryItems)}
      </List>
    </Box>
  )
}

export { MenuRoot as Menu }
export default MenuRoot
