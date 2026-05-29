import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TimelineIcon from '@mui/icons-material/Timeline'
import BuildIcon from '@mui/icons-material/Build'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'

const items = [
  {
    label: 'Achat',
    icon: ShoppingCartIcon,
    to: '/purchases?isEquipment=true',
    color: 'earth' as const,
    desc: 'Acheter',
  },
  {
    label: 'Utilisation',
    icon: TimelineIcon,
    to: '/equipment_usage',
    color: 'earth' as const,
    desc: 'Utiliser',
  },
  {
    label: 'Retour',
    icon: BuildIcon,
    to: '/equipment',
    color: 'earth' as const,
    desc: 'Rendre',
  },
  {
    label: 'Déplacement',
    icon: LocalShippingIcon,
    to: '/travel_equipment',
    color: 'earth' as const,
    desc: 'Déplacer',
  },
  {
    label: 'Maintenance',
    icon: BuildCircleIcon,
    to: '/maintenances',
    color: 'earth' as const,
    desc: 'Entretenir',
  },
]

export default function EquipmentPage() {
  return <SectionHub title="Actions Équipement" items={items} />
}
