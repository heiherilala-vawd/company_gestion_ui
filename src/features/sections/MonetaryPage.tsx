import { Box } from '@mui/material'
import { SectionHub } from '../../generic/SectionHub'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import PaidIcon from '@mui/icons-material/Paid'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DashboardIcon from '@mui/icons-material/Dashboard'

const activityItems = [
  {
    label: 'Acheter',
    icon: ShoppingCartIcon,
    to: '/purchase_operation?mode=full',
    color: 'sapphire' as const,
    desc: 'Achat équipement / matériau',
  },
  {
    label: 'Déplacer',
    icon: LocalShippingIcon,
    to: '/travel_operation?mode=full',
    color: 'emerald' as const,
    desc: 'Transport équipement / matériau',
  },
  {
    label: 'Dépense ponctuelle',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    color: 'rose' as const,
    desc: 'Nouvelle dépense',
  },
  {
    label: "Entrée d'argent",
    icon: PaidIcon,
    to: '/incomes_activity',
    color: 'amber' as const,
    desc: 'Revenu / Emprunt',
  },
  {
    label: 'Charge fixe',
    icon: ReceiptLongIcon,
    to: '/fixed_costs/create',
    color: 'violet' as const,
    desc: 'Créer une charge fixe',
  },
]

const validationItems = [
  {
    label: "Validation entrée d'argent",
    icon: CurrencyExchangeIcon,
    to: '/employer_payments_activity',
    color: 'teal' as const,
    desc: 'Valider paiement',
  },
]

const reportItems = [
  {
    label: 'Rapport',
    icon: AssessmentIcon,
    to: '/yearly-report',
    color: 'violet' as const,
    desc: 'Rapport annuel',
  },
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    to: '/monetary-dashboard',
    color: 'sapphire' as const,
    desc: "Vue d'ensemble",
  },
]

export default function MonetaryPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <SectionHub title="Activité" items={activityItems} />
      <SectionHub title="Validation" items={validationItems} />
      <SectionHub title="Rapport" items={reportItems} />
    </Box>
  )
}
