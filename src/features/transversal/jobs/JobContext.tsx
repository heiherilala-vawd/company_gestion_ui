import { createGenericContext } from '../../../generic/GenericContext'

export const { Provider: JobProvider, useEntity: useJob } = createGenericContext({
  storageKey: 'currentJobId',
  entityName: 'job',
})
