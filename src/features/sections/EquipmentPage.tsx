import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TimelineIcon from '@mui/icons-material/Timeline'
import BuildIcon from '@mui/icons-material/Build'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import DashboardIcon from '@mui/icons-material/Dashboard'

const items = [
  {
    label: 'Acheter un équipement',
    icon: ShoppingCartIcon,
    to: '/purchases_equipment_activity',
    color: 'earth' as const,
    desc: 'Acheter',
  },
  {
    label: 'Utiliser un équipement',
    icon: TimelineIcon,
    to: '/equipment_usage_activity',
    color: 'earth' as const,
    desc: 'Utiliser',
  },
  {
    label: 'Retourner un équipement',
    icon: BuildIcon,
    to: '/equipment_return_activity',
    color: 'earth' as const,
    desc: 'Rendre',
  },
  {
    label: 'Déplacer des équipements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    color: 'earth' as const,
    desc: 'Déplacer',
  },
  {
    label: 'Faire une maintenance',
    icon: BuildCircleIcon,
    to: '/maintenance_activity',
    color: 'earth' as const,
    desc: 'Entretenir',
  },
  {
    label: 'Planifier maintenance',
    icon: ScheduleIcon,
    to: '/scheduled_maintenance_activity',
    color: 'earth' as const,
    desc: 'Planifier',
  },
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    to: '/equipment-dashboard',
    color: 'earth' as const,
    desc: "Vue d'ensemble",
  },
]

export default function EquipmentPage() {
  return <SectionHub title="Actions Équipement" items={items} />
}
