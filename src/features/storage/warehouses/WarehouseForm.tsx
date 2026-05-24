import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import JobForm from '../../transversal/jobs/JobForm.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function WarehouseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      {!isCreate && renderJobSelect('job_id', 'Travail')}
    </>
  )
}
