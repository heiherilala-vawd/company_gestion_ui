import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import { canAccessResource } from '../auth/authProvider'
import { alpha } from '@mui/material/styles'
import { gradients } from '../style/themeConfig'

export const buttonThemes = {
  red: {
    gradient: gradients.error,
    glow: `0 4px 14px ${alpha('#E57A7A', 0.3)}`,
    hoverGlow: `0 8px 25px ${alpha('#E57A7A', 0.4)}`,
  },
  success: {
    gradient: gradients.success,
    glow: `0 4px 14px ${alpha('#6CA568', 0.3)}`,
    hoverGlow: `0 8px 25px ${alpha('#6CA568', 0.4)}`,
  },
  warning: {
    gradient: gradients.warning,
    glow: `0 4px 14px ${alpha('#E8B84B', 0.3)}`,
    hoverGlow: `0 8px 25px ${alpha('#E8B84B', 0.4)}`,
  },
} as const

export type ButtonColor = keyof typeof buttonThemes

interface HomeButton {
  label: string
  icon: React.ElementType
  to: string
  desc: string
  color: ButtonColor
  checkResources: string[]
}

export const quickActionButtons: HomeButton[] = [
  {
    label: 'Achats',
    icon: ShoppingCartIcon,
    to: '/purchases_activity',
    desc: 'Acheter',
    color: 'red',
    checkResources: ['purchases', 'expenses'],
  },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    desc: 'Déplacer',
    color: 'success',
    checkResources: ['travel_expenses', 'equipment'],
  },
  {
    label: 'Revenus / Emprunts',
    icon: PaidIcon,
    to: '/incomes_activity',
    desc: 'Recevoir',
    color: 'red',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Dépenses',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    desc: 'Payer',
    color: 'red',
    checkResources: ['bank_fees', 'employee_payments', 'other_expenses'],
  },
]

export const validationButtons: HomeButton[] = [
  {
    label: 'Valider paiement / Retourner emprunt',
    icon: CheckCircleIcon,
    to: '/employer_payments_activity',
    desc: 'Valider',
    color: 'warning',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
    desc: 'Réception',
    color: 'warning',
    checkResources: ['material_warehouse', 'equipment'],
  },
]

export const getVisibleQuickActions = () =>
  quickActionButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))

export const getVisibleValidationButtons = () =>
  validationButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))
