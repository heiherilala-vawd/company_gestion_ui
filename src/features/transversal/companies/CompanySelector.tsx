// CompanySelector.tsx
import React, { useEffect, useState } from 'react'
import { useNotify, useRefresh, Loading } from 'react-admin'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useCompany } from './CompanyContext'
import { Company } from '../../gen-ts'

// Props optionnelles pour le composant
interface CompanySelectorProps {
  className?: string
  style?: React.CSSProperties
  fullWidth?: boolean
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  className = '',
  style = {},
  fullWidth = true,
}) => {
  const { currentCompanyId, selectCompany } = useCompany()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const notify = useNotify()
  const refresh = useRefresh()

  // Chargement des companies depuis l'API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error('Non authentifié')
        }

        const apiBase = import.meta.env.VITE_API_URL ?? ''
        const url = apiBase ? `${apiBase}/companies` : '/companies'
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data: Company[] = await response.json()
        setCompanies(data)

        // Si aucune company sélectionnée et qu'il y a des companies
        if (!currentCompanyId && data.length > 0) {
          const selectionId = data[0].id ?? ''
          if (selectionId) {
            selectCompany(selectionId)
            notify(`Company ${data[0].name} sélectionnée par défaut`, {
              type: 'info',
            })
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
        setError(errorMessage)
        notify(`Erreur: ${errorMessage}`, { type: 'error' })
        console.error('Erreur chargement companies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, []) // Seulement au montage

  const handleCompanyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCompanyId = event.target.value as string
    const selectedCompany = companies.find((c) => c.id === newCompanyId)

    if (selectedCompany) {
      selectCompany(newCompanyId)
      notify(`Company changée pour "${selectedCompany.name}"`, {
        type: 'success',
        autoHideDuration: 3000,
      })
      refresh() // Rafraîchir les données
    }
  }

  if (loading) {
    return <Loading loadingSecondary="Chargement des companies..." />
  }

  if (error) {
    return <div style={{ color: 'red', padding: '10px' }}>⚠️ Erreur: {error}</div>
  }

  if (companies.length === 0) {
    return <div style={{ padding: '10px', color: 'orange' }}>⚠️ Aucune company disponible</div>
  }

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={className}
      sx={{
        minWidth: 150,
        maxWidth: 200,
        backgroundColor: 'white',
        ...style,
      }}
    >
      <InputLabel id="company-selector-label" sx={{ fontSize: 12 }}>
        Company
      </InputLabel>
      <Select
        labelId="company-selector-label"
        label="Company"
        value={currentCompanyId ?? ''}
        sx={{ fontSize: 12, height: 36 }}
        onChange={(event: any) => {
          const newCompanyId = event.target.value as string
          const selectedCompany = companies.find((c) => c.id === newCompanyId)

          if (selectedCompany) {
            selectCompany(newCompanyId)
            notify(`Company changée pour "${selectedCompany.name}"`, {
              type: 'success',
              autoHideDuration: 3000,
            })
            refresh()
          }
        }}
      >
        {companies.map((company) => (
          <MenuItem key={company.id} value={company.id} sx={{ fontSize: 12 }}>
            {company.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
