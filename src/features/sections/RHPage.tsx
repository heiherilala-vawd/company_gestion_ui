import { SectionHub } from '../../generic/SectionHub'
import PeopleIcon from '@mui/icons-material/People'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PaymentsIcon from '@mui/icons-material/Payments'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

const items = [
  { label: 'Utilisateurs', icon: PeopleIcon, to: '/users', color: 'moss' as const },
  { label: 'Congés', icon: CalendarMonthIcon, to: '/leaves', color: 'moss' as const },
  { label: 'Salaires', icon: PaymentsIcon, to: '/employee_payments', color: 'moss' as const },
  { label: 'Personnel', icon: PeopleAltIcon, to: '/travel_people', color: 'moss' as const },
]

export default function RHPage() {
  return <SectionHub title="Ressources Humaines" items={items} />
}
