import { useState } from 'react'
import { useSidebarState } from 'react-admin'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
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
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import GroupIcon from '@mui/icons-material/Group'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { menuStyles, pausedFeature, pausedBadge } from '../style/components'
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
  Général: '#6366F1',
  Société: '#3B82F6',
  RH: '#8B5CF6',
  Stock: '#10B981',
  Équipement: '#F59E0B',
  'Base de déplacement': '#F43F5E',
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

const SubSectionHeader = ({
  label,
  open,
  onClick,
}: {
  label: string
  open?: boolean
  onClick?: () => void
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: onClick ? 'pointer' : 'default',
      color: 'text.disabled',
      fontSize: '0.6rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      py: 0.4,
      px: 2.5,
      mt: 0.5,
      textTransform: 'uppercase' as const,
      '&:hover': onClick ? { color: 'text.primary' } : undefined,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
      }}
    >
      {label}
    </Typography>
    {onClick &&
      (open ? <ExpandLess sx={{ fontSize: 14 }} /> : <ExpandMore sx={{ fontSize: 14 }} />)}
  </Box>
)

const MenuRoot = () => {
  const [sidebarOpen] = useSidebarState()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Entrées: false,
    'Sorties ponctuelles': false,
    'Sorties continues': false,
    Trésorerie: false,
  })

  const toggleSection = (section: string) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

  const PAUSED_RESOURCES = new Set<string>([
    'departments',
    'receipts',
    'loan_repayments',
    'budget_lines',
    'cash_accounts',
    'cash_transactions',
  ])

  if (!sidebarOpen) return null

  const renderItems = (items: ResourceItem[]) =>
    items
      .filter((item) => {
        const resource = item.resource || item.name
        return canAccessResource(resource, 'list')
      })
      .map((item) => {
        const resource = item.resource || item.name
        const isPaused = PAUSED_RESOURCES.has(resource)

        return (
          <ListItemButton
            key={item.name}
            component={isPaused ? 'div' : Link}
            to={isPaused ? undefined : item.to}
            sx={{
              ...menuStyles.listItem,
              ...(isPaused ? pausedFeature : {}),
              cursor: isPaused ? 'default' : 'pointer',
            }}
            data-testid={item.testId}
            disableRipple={isPaused}
          >
            <ListItemIcon sx={menuStyles.listItemIcon}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  component="span"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8 }}
                >
                  {item.label}
                  {isPaused && (
                    <Box component="span" sx={pausedBadge}>
                      Bientôt
                    </Box>
                  )}
                </Box>
              }
              primaryTypographyProps={menuStyles.listItemText}
            />
          </ListItemButton>
        )
      })

  const userRole = localStorage.getItem('user_role')
  if (userRole === 'EMPLOYEE') {
    const employeeItems: ResourceItem[] = [
      {
        name: 'employee_payments',
        label: 'Salaire',
        icon: PaymentsIcon,
        to: '/employee_payments',
        testId: 'menu-employee-payments',
      },
      {
        name: 'travel_people',
        label: 'Transport personnel',
        icon: PeopleAltIcon,
        to: '/travel_people',
        testId: 'menu-travel-peoples',
      },
      { name: 'tasks', label: 'Tâche', icon: AssignmentIcon, to: '/tasks', testId: 'menu-tasks' },
      {
        name: 'equipment_usage',
        label: 'Utilisation équipement',
        icon: TimelineIcon,
        to: '/equipment_usage',
        testId: 'menu-equipment-usage',
      },
    ]

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
          {renderItems(employeeItems)}
        </List>
      </Box>
    )
  }

  const generalItems: ResourceItem[] = [
    { name: 'home', label: 'Accueil', icon: HomeIcon, to: '/home', testId: 'menu-accueil' },
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
      name: 'histories',
      label: 'Historique',
      icon: HistoryIcon,
      to: '/histories',
      testId: 'menu-histories',
    },
    {
      name: 'suppliers',
      label: 'Fournisseurs',
      icon: LocalShippingIcon,
      to: '/suppliers',
      testId: 'menu-suppliers',
    },
    {
      name: 'purchase_orders',
      label: 'Bons de commande',
      icon: DescriptionIcon,
      to: '/purchase_orders',
      testId: 'menu-purchase-orders',
    },
    {
      name: 'organizations',
      label: 'Organisations',
      icon: BusinessIcon,
      to: '/organizations',
      testId: 'menu-organizations',
      resource: 'organizations',
    },
    {
      name: 'departments',
      label: 'Départements',
      icon: AccountTreeIcon,
      to: '/departments',
      testId: 'menu-departments',
    },
    {
      name: 'income_types',
      label: 'Types de revenus',
      icon: CategoryIcon,
      to: '/income_types',
      testId: 'menu-income-types',
    },
    {
      name: 'other_expense_types',
      label: "Types d'autres dépenses",
      icon: MoneyOffIcon,
      to: '/other_expense_types',
      testId: 'menu-other-expense-types',
    },
    {
      name: 'leave_configs',
      label: 'Configuration congés',
      icon: EventBusyIcon,
      to: '/leave_configs',
      testId: 'menu-leave-configs',
    },
    {
      name: 'leave_types',
      label: 'Types de congés',
      icon: CalendarMonthIcon,
      to: '/leave_types',
      testId: 'menu-leave-types',
    },
  ]

  const rhItems: ResourceItem[] = [
    {
      name: 'tasks',
      label: 'Tâches',
      icon: AssignmentIcon,
      to: '/tasks',
      testId: 'menu-tasks',
    },
    {
      name: 'task_schedules',
      label: 'Planification de tâches',
      icon: ScheduleIcon,
      to: '/task_schedules',
      testId: 'menu-task-schedules',
    },
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
      name: 'teams',
      label: 'Équipes',
      icon: GroupIcon,
      to: '/teams',
      testId: 'menu-teams',
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
      label: 'Jour de congés',
      icon: EventBusyIcon,
      to: '/leave_balances',
      testId: 'menu-leave-balances',
    },
    {
      name: 'hr-dashboard',
      label: 'Dashboard RH',
      icon: DashboardIcon,
      to: '/hr-dashboard',
      testId: 'menu-hr-dashboard',
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
    {
      name: 'material-dashboard',
      label: 'Dashboard stock',
      icon: DashboardIcon,
      to: '/material-dashboard',
      testId: 'menu-material-dashboard',
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
    {
      name: 'maintenance_schedules',
      label: 'Planification maintenance',
      icon: BuildCircleIcon,
      to: '/maintenance_schedules',
      testId: 'menu-maintenance-schedules',
    },
    {
      name: 'cras',
      label: 'Véhicules',
      icon: DirectionsCarIcon,
      to: '/cras',
      testId: 'menu-cras',
    },
    {
      name: 'equipment-dashboard',
      label: 'Dashboard équipement',
      icon: DashboardIcon,
      to: '/equipment-dashboard',
      testId: 'menu-equipment-dashboard',
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
      name: 'histories',
      label: 'Historique',
      icon: TimelineIcon,
      to: '/histories',
      testId: 'menu-history',
    },
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
  ]

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

      {userRole === 'WAREHOUSE_WORKER' ? (
        <>
          <SectionHeader label="Base de déplacement" />
          <List component="nav" dense sx={{ mb: 1 }}>
            {renderItems(
              monetaryOutPonctuelItems.map((item) =>
                item.name === 'expenses' ? { ...item, to: '/expenses_activity' } : item,
              ),
            )}
          </List>
        </>
      ) : (
        <>
          <SectionHeader label="Base de déplacement" />
          <List component="nav" dense sx={{ mb: 1 }}>
            <SubSectionHeader
              label="Entrées"
              open={openSections['Entrées']}
              onClick={() => toggleSection('Entrées')}
            />
            <Collapse in={openSections['Entrées']} timeout={200}>
              {renderItems(monetaryInItems)}
            </Collapse>
            <SubSectionHeader
              label="Sorties ponctuelles"
              open={openSections['Sorties ponctuelles']}
              onClick={() => toggleSection('Sorties ponctuelles')}
            />
            <Collapse in={openSections['Sorties ponctuelles']} timeout={200}>
              {renderItems(monetaryOutPonctuelItems)}
            </Collapse>
            <SubSectionHeader
              label="Sorties continues"
              open={openSections['Sorties continues']}
              onClick={() => toggleSection('Sorties continues')}
            />
            <Collapse in={openSections['Sorties continues']} timeout={200}>
              {renderItems(monetaryOutContinueItems)}
            </Collapse>
            <SubSectionHeader
              label="Trésorerie"
              open={openSections['Trésorerie']}
              onClick={() => toggleSection('Trésorerie')}
            />
            <Collapse in={openSections['Trésorerie']} timeout={200}>
              {renderItems(monetaryOtherItems)}
            </Collapse>
          </List>
        </>
      )}
    </Box>
  )
}

export { MenuRoot as Menu }
export default MenuRoot
