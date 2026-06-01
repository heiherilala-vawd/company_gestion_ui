import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DashboardIcon from '@mui/icons-material/Dashboard'

const items = [
  {
    label: 'Acheter du matériau',
    icon: ShoppingCartIcon,
    to: '/purchases_material_activity',
    color: 'forest' as const,
    desc: 'Acheter',
  },
  {
    label: 'Consommer un matériau',
    icon: DeleteSweepIcon,
    to: '/material_consumption_activity',
    color: 'forest' as const,
    desc: 'Consommer',
  },
  {
    label: 'Retourner les restes',
    icon: Inventory2Icon,
    to: '/material_return_activity',
    color: 'forest' as const,
    desc: 'Retourner stock',
  },
  {
    label: 'Déplacer des matériaux',
    icon: LocalShippingIcon,
    to: '/travel_material_activity',
    color: 'forest' as const,
    desc: 'Déplacer',
  },
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    to: '/material-dashboard',
    color: 'forest' as const,
    desc: "Vue d'ensemble",
  },
]

export default function StockPage() {
  return <SectionHub title="Actions Stock" items={items} />
}
