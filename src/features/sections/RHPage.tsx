import { SectionHub } from '../../generic/SectionHub'
import PaymentsIcon from '@mui/icons-material/Payments'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const items = [
  {
    label: 'Paiement',
    icon: PaymentsIcon,
    to: '/employer_payments_activity',
    color: 'moss' as const,
    desc: 'Payer employé',
  },
  {
    label: 'Déplacement',
    icon: FlightTakeoffIcon,
    to: '/travel_equipment_activity',
    color: 'moss' as const,
    desc: 'Transport personnel',
  },
]

export default function RHPage() {
  return <SectionHub title="Actions RH" items={items} />
}
