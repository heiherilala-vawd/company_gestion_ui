// contexts/CompanyContext.tsx
import { createGenericContext } from '../../../generic/GenericContext'

// Crée un contexte dédié pour les companies
export const { Provider: CompanyProvider, useEntity: useCompany } = createGenericContext({
  storageKey: 'currentCompanyId',
  entityName: 'company',
})
