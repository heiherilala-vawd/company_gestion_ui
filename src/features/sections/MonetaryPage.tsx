import { SectionHub } from '../../generic/SectionHub'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import PaidIcon from '@mui/icons-material/Paid'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HistoryIcon from '@mui/icons-material/History'

const items = [
  {
    label: 'Dépense',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    color: 'bark' as const,
    desc: 'Nouvelle dépense',
  },
  {
    label: 'Revenu',
    icon: PaidIcon,
    to: '/incomes_activity',
    color: 'bark' as const,
    desc: 'Nouveau revenu',
  },
  {
    label: 'Paiement',
    icon: CurrencyExchangeIcon,
    to: '/employer_payments_activity',
    color: 'bark' as const,
    desc: 'Valider paiement',
  },
  {
    label: 'Rapport',
    icon: AssessmentIcon,
    to: '/yearly-report',
    color: 'bark' as const,
    desc: 'Rapport annuel',
  },
  {
    label: 'Historique',
    icon: HistoryIcon,
    to: '/history',
    color: 'bark' as const,
    desc: 'Voir historique',
  },
]

export default function MonetaryPage() {
  return <SectionHub title="Actions Monétaire" items={items} />
}
