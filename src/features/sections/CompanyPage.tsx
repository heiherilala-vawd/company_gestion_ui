import { SectionHub } from '../../generic/SectionHub'
import BusinessIcon from '@mui/icons-material/Business'
import WorkIcon from '@mui/icons-material/Work'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ScheduleIcon from '@mui/icons-material/Schedule'

const items = [
  {
    label: 'Entreprises',
    icon: BusinessIcon,
    to: '/companies',
    color: 'forest' as const,
    desc: 'Configurations',
  },
  {
    label: 'Travaux',
    icon: WorkIcon,
    to: '/jobs',
    color: 'earth' as const,
    desc: 'Structure',
  },
  {
    label: 'Tâches',
    icon: AssignmentIcon,
    to: '/tasks',
    color: 'clay' as const,
    desc: 'Planification',
  },
  {
    label: 'Planification',
    icon: ScheduleIcon,
    to: '/task_schedules',
    color: 'bark' as const,
    desc: 'Échéancier',
  },
]

export default function CompanyPage() {
  return <SectionHub title="Société" items={items} />
}
