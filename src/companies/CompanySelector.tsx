// CompanySelector.tsx
import React, { useEffect, useState } from 'react'
import { SelectInput, useNotify, useRefresh, Loading } from 'react-admin'
import { useCompany } from './CompanyContext'
import { Company } from './types'

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

        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/companies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data: Company[] = await response.json()
        setCompanies(data)

        // Si aucune company sélectionnée et qu'il y a des companies
        if (!currentCompanyId && data.length > 0) {
          selectCompany(data[0].id)
          notify(`Company "${data[0].name}" sélectionnée par défaut`, {
            type: 'info',
          })
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
    const newCompanyId = event.target.value as number
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
    <SelectInput
      source="companyId"
      label="🏢 Company"
      choices={companies.map((company) => ({
        id: company.id,
        name: company.name,
      }))}
      value={currentCompanyId ?? ''}
      onChange={handleCompanyChange}
      className={className}
      style={{
        minWidth: 250,
        backgroundColor: 'white',
        ...style,
      }}
      fullWidth={fullWidth}
      variant="outlined"
      size="small"
    />
  )
}
