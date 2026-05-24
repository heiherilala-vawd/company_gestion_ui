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
import AssignmentIcon from '@mui/icons-material/Assignment'
import ScheduleIcon from '@mui/icons-material/Schedule'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import TimelineIcon from '@mui/icons-material/Timeline'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CachedIcon from '@mui/icons-material/Cached'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HistoryIcon from '@mui/icons-material/History'
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
  Société: '#60A5FA',
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

const SubSectionHeader = ({ label }: { label: string }) => (
  <Typography
    variant="caption"
    sx={{
      display: 'block',
      color: 'text.disabled',
      fontSize: '0.6rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      py: 0.4,
      px: 2.5,
      mt: 0.5,
      textTransform: 'uppercase' as const,
    }}
  >
    {label}
  </Typography>
)

const MenuRoot = () => {
  const [sidebarOpen] = useSidebarState()

  if (!sidebarOpen) return null

  const generalItems: ResourceItem[] = [
    { name: 'home', label: 'Accueil', icon: HomeIcon, to: '/', testId: 'menu-accueil' },
  ]

  const companyItems: ResourceItem[] = [
    {
      name: 'companies',
      label: 'Entreprises',
      icon: BusinessIcon,
      to: '/companies',
      testId: 'menu-companies',
    },
    {
      name: 'company-hub',
      label: 'Tableau de bord',
      icon: BusinessIcon,
      to: '/company',
      testId: 'menu-company-hub',
    },
    { name: 'jobs', label: 'Travaux', icon: WorkIcon, to: '/jobs', testId: 'menu-jobs' },
    {
      name: 'tasks',
      label: 'Tâches',
      icon: AssignmentIcon,
      to: '/tasks',
      testId: 'menu-tasks',
    },
    {
      name: 'task_schedules',
      label: 'Planification',
      icon: ScheduleIcon,
      to: '/task_schedules',
      testId: 'menu-task-schedules',
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
      label: 'Transport personnel',
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
    {
      name: 'leave_balances',
      label: 'Soldes congés',
      icon: EventBusyIcon,
      to: '/leave_balances',
      testId: 'menu-leave-balances',
    },
    {
      name: 'employees_without_leave',
      label: 'Sans congé',
      icon: PersonOffIcon,
      to: '/employees_without_leave',
      testId: 'menu-employees-without-leave',
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
    {
      name: 'material_warehouse',
      label: 'Stock',
      icon: Inventory2Icon,
      to: '/material_warehouse',
      testId: 'menu-stock',
    },
    {
      name: 'material_consumption',
      label: 'Conso. matériaux',
      icon: DeleteSweepIcon,
      to: '/material_consumption',
      testId: 'menu-material-consumption',
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
    {
      name: 'equipment_usage',
      label: 'Utilisation',
      icon: TimelineIcon,
      to: '/equipment_usage',
      testId: 'menu-equipment-usage',
    },
    {
      name: 'maintenances',
      label: 'Maintenance',
      icon: BuildCircleIcon,
      to: '/maintenances',
      testId: 'menu-maintenances',
    },
  ]

  const monetaryInItems: ResourceItem[] = [
    {
      name: 'incomes',
      label: 'Revenus',
      icon: PaidIcon,
      to: '/incomes',
      testId: 'menu-incomes',
    },
    {
      name: 'receipts',
      label: 'Reçus',
      icon: ReceiptIcon,
      to: '/receipts',
      testId: 'menu-receipts',
    },
    {
      name: 'loans',
      label: 'Emprunts',
      icon: CreditCardIcon,
      to: '/loans',
      testId: 'menu-loans',
    },
  ]

  const monetaryOutPonctuelItems: ResourceItem[] = [
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
      name: 'other_expenses',
      label: 'Autres dépenses',
      icon: MoneyOffIcon,
      to: '/other_expenses',
      testId: 'menu-other-expenses',
    },
    {
      name: 'loan_repayments',
      label: 'Remb. emprunts',
      icon: CurrencyExchangeIcon,
      to: '/loan_repayments',
      testId: 'menu-loan-repayments',
    },
  ]

  const monetaryOutContinueItems: ResourceItem[] = [
    {
      name: 'bank_fees',
      label: 'Frais bancaire',
      icon: AccountBalanceIcon,
      to: '/bank_fees',
      testId: 'menu-bank-fees',
    },
    {
      name: 'fixed_costs',
      label: 'Charges fixes',
      icon: ReceiptLongIcon,
      to: '/fixed_costs',
      testId: 'menu-fixed-costs',
    },
    {
      name: 'budget_lines',
      label: 'Budgets',
      icon: AccountBalanceWalletIcon,
      to: '/budget_lines',
      testId: 'menu-budgets',
    },
  ]

  const monetaryOtherItems: ResourceItem[] = [
    {
      name: 'cash_accounts',
      label: 'Comptes caisse',
      icon: AccountBalanceIcon,
      to: '/cash_accounts',
      testId: 'menu-cash-accounts',
    },
    {
      name: 'cash_transactions',
      label: 'Trans. caisse',
      icon: CachedIcon,
      to: '/cash_transactions',
      testId: 'menu-cash-transactions',
    },
    {
      name: 'yearly-report',
      label: 'Rapport annuel',
      icon: AssessmentIcon,
      to: '/yearly-report',
      testId: 'menu-yearly-report',
    },
    {
      name: 'history',
      label: 'Historique',
      icon: HistoryIcon,
      to: '/history',
      testId: 'menu-history',
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

      <SectionHeader label="Société" />
      <List component="nav" dense sx={{ mb: 1 }}>
        {renderItems(companyItems)}
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
        <SubSectionHeader label="Entrées" />
        {renderItems(monetaryInItems)}
        <SubSectionHeader label="Sorties ponctuelles" />
        {renderItems(monetaryOutPonctuelItems)}
        <SubSectionHeader label="Sorties continues" />
        {renderItems(monetaryOutContinueItems)}
        <SubSectionHeader label="Trésorerie" />
        {renderItems(monetaryOtherItems)}
      </List>
    </Box>
  )
}

export { MenuRoot as Menu }
export default MenuRoot
