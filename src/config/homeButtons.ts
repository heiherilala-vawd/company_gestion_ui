import { gradients, borderRadius as br, transitions } from '../style/themeConfig'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import type { SxProps, Theme } from '@mui/material'
import { canAccessResource } from '../auth/authProvider'

export const buttonThemes = {
  red: {
    background: (mode: 'light' | 'dark') =>
      mode === 'light' ? gradients.secondary : gradients.secondaryDark,
    color: (mode: 'light' | 'dark') => (mode === 'light' ? '#fff' : '#1a1a2e'),
    boxShadow: (mode: 'light' | 'dark') =>
      mode === 'light' ? '0 4px 12px rgba(234, 67, 53, 0.25)' : '0 4px 12px rgba(234, 67, 53, 0.2)',
  },
  success: {
    background: (mode: 'light' | 'dark') =>
      mode === 'light' ? gradients.success : gradients.successDark,
    color: (mode: 'light' | 'dark') => (mode === 'light' ? '#fff' : '#1a1a2e'),
    boxShadow: (mode: 'light' | 'dark') =>
      mode === 'light' ? '0 4px 12px rgba(52, 168, 83, 0.25)' : '0 4px 12px rgba(52, 168, 83, 0.2)',
  },
  warning: {
    background: (mode: 'light' | 'dark') =>
      mode === 'light' ? gradients.warning : gradients.warningDark,
    color: () => '#1a1a2e' as const,
    boxShadow: (mode: 'light' | 'dark') =>
      mode === 'light' ? '0 4px 12px rgba(251, 188, 5, 0.3)' : '0 4px 12px rgba(251, 188, 5, 0.25)',
  },
} as const

export type ButtonColor = keyof typeof buttonThemes

export const iconSx: SxProps<Theme> = {
  fontSize: { xs: 32, sm: 36 },
  opacity: 0.85,
}

export const buttonLabelSx: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: { xs: '0.8rem', sm: '0.85rem' },
  letterSpacing: '0.02em',
  lineHeight: 1.3,
  mt: 0.5,
}

export const baseButtonSx: SxProps<Theme> = {
  height: { xs: 120, sm: 140 },
  minWidth: 140,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  py: 2,
  borderRadius: br.lg,
  textTransform: 'none',
  transition: transitions.default,
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
  fontWeight: 600,
}

export const getButtonSx = (color: ButtonColor, mode: 'light' | 'dark'): SxProps<Theme> => ({
  ...baseButtonSx,
  background: buttonThemes[color].background(mode),
  color: buttonThemes[color].color(mode),
  boxShadow: buttonThemes[color].boxShadow(mode),
  '&:hover': {
    background: buttonThemes[color].background(mode),
    filter: 'brightness(1.1)',
    transform: 'translateY(-4px)',
  },
})

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
