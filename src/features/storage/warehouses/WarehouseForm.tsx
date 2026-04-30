import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import JobForm from '../../transversal/jobs/JobForm.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'

// eslint-disable-next-line react/prop-types
export default function WarehouseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" />
      <TextInput source="description" label="Description" multiline rows={3} />
      <ReferenceSelectWithCreate
        source="job_id"
        reference="jobs"
        label="Chantier"
        optionText="description"
        createUrlEnd={getMiddleUrl('jobs')}
        createForm={<JobForm isCreateForm />}
      />
    </>
  )
}
