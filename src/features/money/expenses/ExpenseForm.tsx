import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import JobForm from '../../transversal/jobs/JobForm.tsx'

// eslint-disable-next-line react/prop-types
export default function ExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}

      <ReferenceSelectWithCreate
        source="job_id"
        reference="jobs"
        label="Chantier"
        optionText="description"
        createUrlEnd={getMiddleUrl('jobs')}
        createForm={<JobForm isCreateForm />}
      />
      <NumberInput source="amount" label="Montant" />
      <TextInput source="description" label="Description" multiline />
      <TextInput source="comment" label="Commentaire" multiline />
    </>
  )
}
