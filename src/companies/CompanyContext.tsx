// CompanyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Définition du type du contexte
interface CompanyContextType {
  currentCompanyId: number | null
  selectCompany: (companyId: number | null) => void
  clearCompany: () => void
}

// Props pour le Provider
interface CompanyProviderProps {
  children: ReactNode
}

// Création du contexte avec une valeur par défaut
const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [currentCompanyId, setCurrentCompanyId] = useState<number | null>(() => {
    const saved = localStorage.getItem('currentCompanyId')
    return saved ? parseInt(saved, 10) : null
  })

  const selectCompany = (companyId: number | null): void => {
    setCurrentCompanyId(companyId)
    if (companyId !== null) {
      localStorage.setItem('currentCompanyId', companyId.toString())
    } else {
      localStorage.removeItem('currentCompanyId')
    }
  }

  const clearCompany = (): void => {
    setCurrentCompanyId(null)
    localStorage.removeItem('currentCompanyId')
  }

  return (
    <CompanyContext.Provider value={{ currentCompanyId, selectCompany, clearCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}

// Hook personnalisé avec vérification de l'utilisation
export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider')
  }
  return context
}
