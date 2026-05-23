import { SectionHub } from '../../generic/SectionHub'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import PaidIcon from '@mui/icons-material/Paid'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const items = [
  { label: 'Dépenses', icon: MoneyOffIcon, to: '/expenses', color: 'bark' as const },
  { label: 'Revenus', icon: PaidIcon, to: '/incomes', color: 'bark' as const },
  { label: 'Achats', icon: ShoppingCartIcon, to: '/purchases', color: 'bark' as const },
  { label: 'Frais bancaire', icon: AccountBalanceIcon, to: '/bank_fees', color: 'bark' as const },
  {
    label: 'Déplacements',
    icon: FlightTakeoffIcon,
    to: '/travel_expenses',
    color: 'bark' as const,
  },
]

export default function MonetaryPage() {
  return <SectionHub title="Monétaire" items={items} />
}
