import { Box } from '@mui/material'
import { SectionHub } from '../../generic/SectionHub'
import BusinessIcon from '@mui/icons-material/Business'
import WorkIcon from '@mui/icons-material/Work'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ScheduleIcon from '@mui/icons-material/Schedule'
import HistoryIcon from '@mui/icons-material/History'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import CategoryIcon from '@mui/icons-material/Category'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'

const mainItems = [
  {
    label: 'Entreprises',
    icon: BusinessIcon,
    to: '/companies',
    color: 'forest' as const,
    desc: 'Configurations',
  },
  {
    label: 'Travaux',
    icon: WorkIcon,
    to: '/jobs',
    color: 'earth' as const,
    desc: 'Structure',
  },
  {
    label: 'Tâches',
    icon: AssignmentIcon,
    to: '/tasks',
    color: 'clay' as const,
    desc: 'Planification',
  },
  {
    label: 'Planification tâche',
    icon: ScheduleIcon,
    to: '/task_schedules',
    color: 'bark' as const,
    desc: 'Échéancier',
  },
  {
    label: 'Historique',
    icon: HistoryIcon,
    to: '/history',
    color: 'bark' as const,
    desc: 'Voir historique',
  },
]

const configItems = [
  {
    label: 'Fournisseurs',
    icon: LocalShippingIcon,
    to: '/suppliers',
    color: 'forest' as const,
    desc: 'Gérer fournisseurs',
  },
  {
    label: 'Bons de commande',
    icon: DescriptionIcon,
    to: '/purchase_orders',
    color: 'earth' as const,
    desc: 'Gérer commandes',
  },
  {
    label: 'Départements',
    icon: AccountTreeIcon,
    to: '/departments',
    color: 'clay' as const,
    desc: 'Organigramme',
  },
  {
    label: 'Types de revenus',
    icon: CategoryIcon,
    to: '/income_types',
    color: 'bark' as const,
    desc: 'Configurer',
  },
  {
    label: "Types d'autres dépenses",
    icon: MoneyOffIcon,
    to: '/other_expense_types',
    color: 'bark' as const,
    desc: 'Configurer',
  },
]

export default function CompanyPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <SectionHub title="Société" items={mainItems} />
      <SectionHub title="Configuration" items={configItems} />
    </Box>
  )
}
