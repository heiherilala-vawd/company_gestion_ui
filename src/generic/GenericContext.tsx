// generic/GenericContext.tsx - Version révisée
import React, { createContext, useContext, useState, ReactNode } from 'react'

type EntityId = string | null

interface EntityContextConfig {
  storageKey: string
  entityName: string
}

interface EntityContextType {
  currentId: EntityId
  selectEntity: (id: EntityId) => void
  clearEntity: () => void
  config: EntityContextConfig
}

// Fonction pour créer un contexte spécifique
export const createGenericContext = (config: EntityContextConfig) => {
  const Context = createContext<EntityContextType | undefined>(undefined)

  const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentId, setCurrentId] = useState<EntityId>(() => {
      return localStorage.getItem(config.storageKey)
    })

    const selectEntity = (id: EntityId): void => {
      setCurrentId(id)
      if (id !== null && id !== undefined && id !== '') {
        localStorage.setItem(config.storageKey, String(id))
      } else {
        localStorage.removeItem(config.storageKey)
      }
    }

    const clearEntity = (): void => {
      setCurrentId(null)
      localStorage.removeItem(config.storageKey)
    }

    return (
      <Context.Provider value={{ currentId, selectEntity, clearEntity, config }}>
        {children}
      </Context.Provider>
    )
  }

  const useEntity = (): EntityContextType => {
    const context = useContext(Context)
    if (context === undefined) {
      throw new Error(`useEntity must be used within a ${config.entityName}Provider`)
    }
    return context
  }

  return { Provider, useEntity, config }
}
