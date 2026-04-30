import { TextInput, DateInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import CompanyForm from '../companies/CompanyForm.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'

// eslint-disable-next-line react/prop-types
export default function JobForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <ReferenceSelectWithCreate
        source="company_id"
        reference="companies"
        label="Entreprise"
        optionText="name"
        createUrlEnd={getMiddleUrl('companies')}
        createForm={<CompanyForm isCreateForm />}
      />
      <TextInput source="description" label="Description" multiline rows={3} />
      <DateInput
        source="contract_signature_date"
        label="Date signature contrat"
        defaultValue={new Date()}
      />
      <DateInput source="start_date" label="Date début" defaultValue={new Date()} />
      <DateInput source="end_date" label="Date fin" />
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
          { id: 'IN_PROGRESS', name: 'En cours' },
          { id: 'COMPLETED', name: 'Terminé' },
        ]}
        defaultValue="PENDING_SIGNATURE"
      />
    </>
  )
}
