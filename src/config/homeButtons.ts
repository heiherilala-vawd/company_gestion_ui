import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import { canAccessResource } from '../auth/authProvider'
import { alpha } from '@mui/material/styles'
import { natureGradients } from '../style/themeConfig'

export const buttonThemes = {
  forest: {
    gradient: natureGradients.forest,
    glow: `0 4px 14px ${alpha('#2D5A27', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#2D5A27', 0.35)}`,
  },
  earth: {
    gradient: natureGradients.earth,
    glow: `0 4px 14px ${alpha('#8B6F47', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#8B6F47', 0.35)}`,
  },
  clay: {
    gradient: natureGradients.clay,
    glow: `0 4px 14px ${alpha('#B87D5B', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#B87D5B', 0.35)}`,
  },
  bark: {
    gradient: natureGradients.bark,
    glow: `0 4px 14px ${alpha('#6B4C3B', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#6B4C3B', 0.35)}`,
  },
  moss: {
    gradient: natureGradients.moss,
    glow: `0 4px 14px ${alpha('#5A7A4A', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#5A7A4A', 0.35)}`,
  },
  leaf: {
    gradient: natureGradients.leaf,
    glow: `0 4px 14px ${alpha('#7CB342', 0.25)}`,
    hoverGlow: `0 8px 25px ${alpha('#7CB342', 0.35)}`,
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
    color: 'forest',
    checkResources: ['purchases', 'expenses'],
  },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    desc: 'Déplacer',
    color: 'earth',
    checkResources: ['travel_expenses', 'equipment'],
  },
  {
    label: 'Revenus / Emprunts',
    icon: PaidIcon,
    to: '/incomes_activity',
    desc: 'Recevoir',
    color: 'clay',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Dépenses',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    desc: 'Payer',
    color: 'bark',
    checkResources: ['bank_fees', 'employee_payments', 'other_expenses'],
  },
]

export const validationButtons: HomeButton[] = [
  {
    label: 'Valider paiement / Retourner emprunt',
    icon: CheckCircleIcon,
    to: '/employer_payments_activity',
    desc: 'Valider',
    color: 'moss',
    checkResources: ['incomes', 'loans'],
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
    desc: 'Réception',
    color: 'leaf',
    checkResources: ['material_warehouse', 'equipment'],
  },
]

export const getVisibleQuickActions = () =>
  quickActionButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))

export const getVisibleValidationButtons = () =>
  validationButtons.filter((btn) => btn.checkResources.some((r) => canAccessResource(r, 'list')))
