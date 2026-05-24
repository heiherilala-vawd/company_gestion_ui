import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import InventoryIcon from '@mui/icons-material/Inventory'

const items = [
  {
    label: 'Achat',
    icon: ShoppingCartIcon,
    to: '/purchases_activity',
    color: 'forest' as const,
    desc: 'Acheter',
  },
  {
    label: 'Déplacement',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    color: 'forest' as const,
    desc: 'Déplacer',
  },
  {
    label: 'Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
    color: 'forest' as const,
    desc: 'Valider réception',
  },
]

export default function StockPage() {
  return <SectionHub title="Actions Stock" items={items} />
}
