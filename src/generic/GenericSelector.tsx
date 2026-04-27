import React, { useEffect, useState } from 'react'
import { useNotify, useRefresh, Loading } from 'react-admin'
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'
import { formStyles } from '../style/components'

interface GenericEntity {
  id: string
  name?: string
  description?: string
  title?: string
  label?: string
  code?: string
  [key: string]: any
}

interface GenericSelectorProps {
  entityType: string
  apiEndpoint: string
  label?: string
  labelPrefix?: string
  useContext: () => { currentId: string | null; selectEntity: (id: string | null) => void }
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
  onEntitySelected?: (entity: GenericEntity) => void
  onLoading?: (loading: boolean) => void
  onError?: (error: string | null) => void
  autoSelectFirst?: boolean
  showAllOption?: boolean
  allOptionLabel?: string
  displayFields?: string[]
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

  const getDisplayText = (entity: GenericEntity): string => {
    for (const field of displayFields) {
      const value = entity[field]
      if (value && typeof value === 'string' && value.trim() !== '') {
        return value
      }
    }
    return entity.id || '?'
  }

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true)
        setError(null)
        onLoading?.(true)

        const token = localStorage.getItem('token')
        if (!token) throw new Error('Non authentifié')

        const apiBase = import.meta.env.VITE_API_URL ?? ''
        const url = apiBase ? `${apiBase}${apiEndpoint}` : apiEndpoint
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data: GenericEntity[] = await response.json()
        setEntities(data)

        if (autoSelectFirst && !currentId && data.length > 0) {
          const selectionId = data[0].id ?? ''
          if (selectionId) {
            selectEntity(selectionId)
            notify(`${label || entityType} "${getDisplayText(data[0])}" sélectionné`, {
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
      } finally {
        setLoading(false)
        onLoading?.(false)
      }
    }

    fetchEntities()
  }, [apiEndpoint])

  const handleEntityChange = (entityId: string) => {
    if (showAllOption && entityId === 'all') {
      selectEntity(null)
      notify(`Tous les ${label || entityType}s sélectionnés`, { type: 'info' })
      refresh()
      return
    }

    const selectedEntity = entities.find((e) => e.id === entityId)
    if (selectedEntity) {
      selectEntity(entityId)
      notify(`${label || entityType} changé pour "${getDisplayText(selectedEntity)}"`, {
        type: 'success',
      })
      refresh()
      onEntitySelected?.(selectedEntity)
    }
  }

  if (loading) {
    return <Loading loadingSecondary={`Chargement...`} />
  }

  if (error) {
    return <div style={{ color: 'red', padding: 10 }}>⚠️ {error}</div>
  }

  if (entities.length === 0) {
    return <div style={{ padding: 10, color: 'orange' }}>⚠️ Aucun</div>
  }

  const displayLabel = label || entityType.charAt(0).toUpperCase() + entityType.slice(1)
  const prefixDisplay = labelPrefix || `${displayLabel}: `
  const currentValue = currentId || (showAllOption ? 'all' : '')

  return (
    <Box sx={formStyles.selectorBox}>
      {prefixDisplay && (
        <Typography variant="caption" sx={formStyles.selectorLabel}>
          {prefixDisplay}
        </Typography>
      )}
      <FormControl
        variant="standard"
        size="small"
        sx={formStyles.selectorWrapper}
        fullWidth={fullWidth}
      >
        <Select
          value={currentValue}
          onChange={(e) => handleEntityChange(e.target.value as string)}
          sx={formStyles.selectorInput}
          disableUnderline
        >
          {showAllOption && (
            <MenuItem value="all" sx={formStyles.input}>
              {allOptionLabel}
            </MenuItem>
          )}
          {entities.map((entity) => (
            <MenuItem key={entity.id} value={entity.id} sx={formStyles.input}>
              {getDisplayText(entity)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
