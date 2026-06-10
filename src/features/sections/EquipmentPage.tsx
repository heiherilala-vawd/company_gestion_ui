import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TimelineIcon from '@mui/icons-material/Timeline'
import BuildIcon from '@mui/icons-material/Build'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

const items = [
  {
    label: 'Véhicules',
    icon: DirectionsCarIcon,
    to: '/voitures',
    color: 'sapphire' as const,
    desc: 'Gérer',
  },
  {
    label: 'Acheter un équipement',
    icon: ShoppingCartIcon,
    to: '/purchases_equipment_activity',
    color: 'sapphire' as const,
    desc: 'Acheter',
  },
  {
    label: 'Utiliser un équipement',
    icon: TimelineIcon,
    to: '/equipment_usage_activity',
    color: 'emerald' as const,
    desc: 'Utiliser',
  },
  {
    label: 'Retourner un équipement',
    icon: BuildIcon,
    to: '/equipment_return_activity',
    color: 'amber' as const,
    desc: 'Rendre',
  },
  {
    label: 'Déplacer des équipements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    color: 'teal' as const,
    desc: 'Déplacer',
  },
  {
    label: 'Faire une maintenance',
    icon: BuildCircleIcon,
    to: '/maintenance_activity',
    color: 'violet' as const,
    desc: 'Entretenir',
  },
  {
    label: 'Planifier maintenance',
    icon: ScheduleIcon,
    to: '/scheduled_maintenance_activity',
    color: 'rose' as const,
    desc: 'Planifier',
  },
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    to: '/equipment-dashboard',
    color: 'sapphire' as const,
    desc: "Vue d'ensemble",
  },
]

export default function EquipmentPage() {
  return <SectionHub title="Actions Équipement" items={items} />
}
