import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const items = [
  {
    label: 'Achat',
    icon: ShoppingCartIcon,
    to: '/purchases_activity',
    color: 'earth' as const,
    desc: 'Acheter équipement',
  },
  {
    label: 'Déplacement',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    color: 'earth' as const,
    desc: 'Déplacer',
  },
]

export default function EquipmentPage() {
  return <SectionHub title="Actions Équipement" items={items} />
}
