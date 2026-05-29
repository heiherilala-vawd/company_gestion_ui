import { SectionHub } from '../../generic/SectionHub'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PaymentsIcon from '@mui/icons-material/Payments'
import GroupIcon from '@mui/icons-material/Group'
import WorkIcon from '@mui/icons-material/Work'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const items = [
  {
    label: 'Tâche',
    icon: AssignmentIcon,
    to: '/tasks',
    color: 'moss' as const,
    desc: 'Assigner tâche',
  },
  {
    label: 'Paiement',
    icon: PaymentsIcon,
    to: '/employee_payments',
    color: 'moss' as const,
    desc: 'Payer employé',
  },
  {
    label: 'Équipe',
    icon: GroupIcon,
    to: '/teams',
    color: 'moss' as const,
    desc: 'Gérer équipe',
  },
  {
    label: 'Travail',
    icon: WorkIcon,
    to: '/jobs',
    color: 'moss' as const,
    desc: 'Assigner travail',
  },
  {
    label: 'Déplacement',
    icon: FlightTakeoffIcon,
    to: '/travel_people',
    color: 'moss' as const,
    desc: 'Transport personnel',
  },
]

export default function RHPage() {
  return <SectionHub title="Actions RH" items={items} />
}
