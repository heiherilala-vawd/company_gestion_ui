// contexts/JobContext.tsx
import { createGenericContext } from '../../../generic/GenericContext'

// Crée un contexte dédié pour les jobs
export const { Provider: JobProvider, useEntity: useJob } = createGenericContext({
  storageKey: 'currentJobId',
  entityName: 'job',
})
