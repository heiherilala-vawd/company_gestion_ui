import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const items = [
  {
    label: 'Achat',
    icon: ShoppingCartIcon,
    to: '/purchases?isMaterial=true',
    color: 'forest' as const,
    desc: 'Acheter',
  },
  {
    label: 'Consommation',
    icon: DeleteSweepIcon,
    to: '/material_consumption',
    color: 'forest' as const,
    desc: 'Consommer',
  },
  {
    label: 'Retour',
    icon: Inventory2Icon,
    to: '/material_warehouse',
    color: 'forest' as const,
    desc: 'Retourner stock',
  },
  {
    label: 'Rebut',
    icon: DeleteForeverIcon,
    to: '/material_warehouse',
    color: 'forest' as const,
    desc: 'Délasser',
  },
]

export default function StockPage() {
  return <SectionHub title="Actions Stock" items={items} />
}
