import { SectionHub } from '../../generic/SectionHub'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PaymentsIcon from '@mui/icons-material/Payments'
import GroupIcon from '@mui/icons-material/Group'
import WorkIcon from '@mui/icons-material/Work'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import DashboardIcon from '@mui/icons-material/Dashboard'

const items = [
  {
    label: 'Tâche',
    icon: AssignmentIcon,
    to: '/tasks/create',
    color: 'sapphire' as const,
    desc: 'Assigner tâche',
  },
  {
    label: 'Paiement',
    icon: PaymentsIcon,
    to: '/employee_payment_activity',
    color: 'emerald' as const,
    desc: 'Payer employé',
  },
  {
    label: 'Équipe',
    icon: GroupIcon,
    to: '/teams',
    color: 'violet' as const,
    desc: 'Gérer équipe',
  },
  {
    label: 'Travail',
    icon: WorkIcon,
    to: '/job_assignment_activity',
    color: 'amber' as const,
    desc: 'Assigner travail',
  },
  {
    label: 'Déplacement',
    icon: FlightTakeoffIcon,
    to: '/travel_people_activity',
    color: 'teal' as const,
    desc: 'Transport personnel',
  },
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    to: '/hr-dashboard',
    color: 'sapphire' as const,
    desc: "Vue d'ensemble",
  },
]

export default function RHPage() {
  return <SectionHub title="Actions RH" items={items} />
}
