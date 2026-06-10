import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import InventoryIcon from '@mui/icons-material/Inventory'
import { canAccessResource } from '../auth/authProvider'
import { alpha } from '@mui/material/styles'
import { accentGradients } from '../style/themeConfig'

export const buttonThemes = {
  sapphire: {
    gradient: accentGradients.sapphire,
    glow: `0 4px 14px ${alpha('#3B82F6', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#3B82F6', 0.35)}`,
  },
  emerald: {
    gradient: accentGradients.emerald,
    glow: `0 4px 14px ${alpha('#10B981', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#10B981', 0.35)}`,
  },
  amber: {
    gradient: accentGradients.amber,
    glow: `0 4px 14px ${alpha('#F59E0B', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#F59E0B', 0.35)}`,
  },
  rose: {
    gradient: accentGradients.rose,
    glow: `0 4px 14px ${alpha('#F43F5E', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#F43F5E', 0.35)}`,
  },
  violet: {
    gradient: accentGradients.violet,
    glow: `0 4px 14px ${alpha('#8B5CF6', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#8B5CF6', 0.35)}`,
  },
  teal: {
    gradient: accentGradients.teal,
    glow: `0 4px 14px ${alpha('#14B8A6', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#14B8A6', 0.35)}`,
  },
  cyan: {
    gradient: accentGradients.cyan,
    glow: `0 4px 14px ${alpha('#06B6D4', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#06B6D4', 0.35)}`,
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
    color: 'sapphire',
    checkResources: ['purchases', 'expenses'],
  },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    desc: 'Déplacer',
    color: 'emerald',
    checkResources: ['travel_expenses', 'equipment'],
  },
  {
    label: 'Revenus / Emprunts',
    icon: PaidIcon,
    to: '/incomes_activity',
    desc: 'Recevoir',
    color: 'amber',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Dépenses',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    desc: 'Payer',
    color: 'rose',
    checkResources: ['bank_fees', 'employee_payments', 'other_expenses'],
  },
]

export const validationButtons: HomeButton[] = [
  {
    label: 'Valider paiement / Retourner emprunt',
    icon: CurrencyExchangeIcon,
    to: '/employer_payments_activity',
    desc: 'Reçu\nretourné',
    color: 'violet',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
    desc: 'Réception',
    color: 'teal',
    checkResources: ['material_warehouse', 'equipment'],
  },
]

export const getVisibleQuickActions = () =>
  quickActionButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))

export const getVisibleValidationButtons = () =>
  validationButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))
