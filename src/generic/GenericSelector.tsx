// generic/GenericSelector.tsx
import React, { useEffect, useState } from 'react'
import { useNotify, useRefresh, Loading } from 'react-admin'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SxProps,
  Theme,
  Box,
  Typography,
} from '@mui/material'

// Interface pour l'entité générique
interface GenericEntity {
  id: string
  name?: string
  description?: string
  title?: string
  label?: string
  code?: string
  [key: string]: any
}

// Props pour le Selector générique
interface GenericSelectorProps {
  // Configuration
  entityType: string // 'company', 'job', etc.
  apiEndpoint: string // URL de l'API (ex: '/companies', '/jobs')
  label?: string // Label du selecteur (ex: 'Company', 'Job')
  labelPrefix?: string // Prefix à afficher avant le selecteur (ex: 'Company: ', 'Job: ')
  useContext: () => { currentId: string | null; selectEntity: (id: string | null) => void }

  // Style
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  sx?: SxProps<Theme>

  // Callbacks
  onEntitySelected?: (entity: GenericEntity) => void
  onLoading?: (loading: boolean) => void
  onError?: (error: string | null) => void

  // Options
  autoSelectFirst?: boolean // Auto-sélectionner le premier élément
  showAllOption?: boolean // Afficher option "Tous"
  allOptionLabel?: string // Label pour l'option "Tous"
  displayFields?: string[] // Ordre de priorité des champs à afficher
}

export const GenericSelector: React.FC<GenericSelectorProps> = ({
  entityType,
  apiEndpoint,
  label,
  labelPrefix,
  useContext,
  className = '',
  style = {},
  fullWidth = true,
  sx = {},
  onEntitySelected,
  onLoading,
  onError,
  autoSelectFirst = true,
  showAllOption = false,
  allOptionLabel = 'Tous',
  displayFields = ['name', 'description', 'title', 'label', 'code'],
}) => {
  const { currentId, selectEntity } = useContext()
  const [entities, setEntities] = useState<GenericEntity[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const notify = useNotify()
  const refresh = useRefresh()

  // Fonction pour obtenir le texte d'affichage
  const getDisplayText = (entity: GenericEntity): string => {
    for (const field of displayFields) {
      const value = entity[field]
      if (value && typeof value === 'string' && value.trim() !== '') {
        return value
      }
    }
    return entity.id || '?'
  }

  // Chargement des entités depuis l'API
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true)
        setError(null)
        onLoading?.(true)

        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error('Non authentifié')
        }

        const apiBase = import.meta.env.VITE_API_URL ?? ''
        const url = apiBase ? `${apiBase}${apiEndpoint}` : apiEndpoint
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data: GenericEntity[] = await response.json()
        setEntities(data)

        // Auto-sélection du premier élément
        if (autoSelectFirst && !currentId && data.length > 0) {
          const selectionId = data[0].id ?? ''
          if (selectionId) {
            selectEntity(selectionId)
            const displayLabel = label || entityType
            const displayText = getDisplayText(data[0])
            notify(`${displayLabel} "${displayText}" sélectionné par défaut`, {
              type: 'info',
            })
            onEntitySelected?.(data[0])
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
        setError(errorMessage)
        onError?.(errorMessage)
        notify(`Erreur: ${errorMessage}`, { type: 'error' })
        console.error(`Erreur chargement ${entityType}:`, err)
      } finally {
        setLoading(false)
        onLoading?.(false)
      }
    }

    fetchEntities()
  }, [apiEndpoint]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEntityChange = (entityId: string) => {
    // Cas spécial pour "Tous"
    if (showAllOption && entityId === 'all') {
      selectEntity(null)
      const displayLabel = label || entityType
      notify(`Tous les ${displayLabel}s sélectionnés`, {
        type: 'info',
        autoHideDuration: 3000,
      })
      refresh()
      return
    }

    // Cas normal
    const selectedEntity = entities.find((e) => e.id === entityId)
    if (selectedEntity) {
      selectEntity(entityId)
      const displayLabel = label || entityType
      const displayText = getDisplayText(selectedEntity)
      notify(`${displayLabel} changé pour "${displayText}"`, {
        type: 'success',
        autoHideDuration: 3000,
      })
      refresh()
      onEntitySelected?.(selectedEntity)
    }
  }

  if (loading) {
    const loadingLabel = label || entityType
    return <Loading loadingSecondary={`Chargement des ${loadingLabel}s...`} />
  }

  if (error) {
    return <div style={{ color: 'red', padding: '10px' }}>⚠️ Erreur: {error}</div>
  }

  if (entities.length === 0) {
    const emptyLabel = label || entityType
    return <div style={{ padding: '10px', color: 'orange' }}>⚠️ Aucun {emptyLabel} disponible</div>
  }

const displayLabel = label || entityType.charAt(0).toUpperCase() + entityType.slice(1)
  const currentValue = currentId ?? (showAllOption ? 'all' : '')
  const prefixDisplay = labelPrefix ? labelPrefix : `${displayLabel}: `

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        px: 1,
        py: 0.5,
        gap: 1,
      }}
    >
      {prefixDisplay && (
        <Typography
          variant="caption"
          sx={{ color: 'white', fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}
        >
          {prefixDisplay}
        </Typography>
      )}
      <FormControl
        variant="standard"
        size="small"
        className={className}
        sx={{
          minWidth: 120,
          maxWidth: 180,
          '& .MSelect-select': {
            color: 'white',
            fontSize: 12,
          },
          '& .MuiInput-input': {
            fontSize: 12,
          },
          ...sx,
          ...style,
        }}
        fullWidth={fullWidth}
      >
      <Select
        value={currentValue}
        sx={{
          color: 'white',
          fontSize: 12,
          '& .MuiSelect-select': {
            paddingRight: '8px !important',
          },
        }}
        onChange={(event) => handleEntityChange(event.target.value as string)}
        disableUnderline
      >
        {showAllOption && (
          <MenuItem value="all" sx={{ fontSize: 12 }}>
            {allOptionLabel}
          </MenuItem>
        )}
        {entities.map((entity) => (
          <MenuItem key={entity.id} value={entity.id} sx={{ fontSize: 12 }}>
            {getDisplayText(entity)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  )
}
