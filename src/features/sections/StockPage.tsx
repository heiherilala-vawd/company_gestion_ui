import { SectionHub } from '../../generic/SectionHub'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const items = [
  { label: 'Entrepôts', icon: WarehouseIcon, to: '/warehouses', color: 'forest' as const },
  { label: 'Matériaux', icon: CategoryIcon, to: '/materials', color: 'forest' as const },
  {
    label: 'Matériaux dépl.',
    icon: CategoryIcon,
    to: '/travel_materials',
    color: 'forest' as const,
  },
  {
    label: 'Achats',
    icon: ShoppingCartIcon,
    to: '/purchases?isMaterial=true',
    color: 'forest' as const,
  },
]

export default function StockPage() {
  return <SectionHub title="Stock" items={items} />
}
