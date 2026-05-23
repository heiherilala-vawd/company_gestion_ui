import { SectionHub } from '../../generic/SectionHub'
import BuildIcon from '@mui/icons-material/Build'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const items = [
  { label: 'Équipements', icon: BuildIcon, to: '/equipment', color: 'earth' as const },
  { label: 'Équipement dépl.', icon: BuildIcon, to: '/travel_equipment', color: 'earth' as const },
  {
    label: 'Achats',
    icon: ShoppingCartIcon,
    to: '/purchases?isEquipment=true',
    color: 'earth' as const,
  },
]

export default function EquipmentPage() {
  return <SectionHub title="Équipement" items={items} />
}
