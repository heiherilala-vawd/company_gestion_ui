import {
  List,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  SelectInput,
  useListContext,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'
import { useEffect } from 'react'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'
import { JobStatus } from '../../../gen-ts/src/models/JobStatus'

const JobFilters = [
  <SearchInput source="description" alwaysOn />,
  <SelectInput
    source="status"
    label="Statut"
    choices={Object.entries(JobStatus).map(([k, v]) => ({ id: v, name: k }))}
  />,
]

interface JobListProps {
  company_id?: number | string
}

function JobListContent() {
  const { filterValues } = useListContext()

  useEffect(() => {
    console.log('🔧 JobList mounted - filterValues:', filterValues)
  }, [filterValues])

  return (
    <ResponsiveDatagrid priorityFields={['company.name', 'description', 'status', 'start_date']}>
      <TextField source="company.name" label="Nom Entreprise" />
      <TextField source="description" label="Description" />
      <DateField source="contract_signature_date" label="Signature contrat" />
      <DateField source="start_date" label="Date début" />
      <DateField source="end_date" label="Date fin" />
      <SelectField
        source="status"
        label="Statut"
        choices={[
          { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
          { id: 'IN_PROGRESS', name: 'En cours' },
          { id: 'COMPLETED', name: 'Terminé' },
        ]}
      />
      <EditButton />
    </ResponsiveDatagrid>
  )
}

export default function JobList({ company_id }: JobListProps) {
  const currentCompanyId = localStorage.getItem('currentCompanyId')
  if (!currentCompanyId) {
    return <div>Veuillez sélectionner une company</div>
  }

  return (
    <List
      key={company_id ?? 'all-jobs'}
      resource="jobs"
      filters={JobFilters}
      filter={currentCompanyId ? { currentCompanyId } : undefined}
      title={`Jobs - Company ID: ${currentCompanyId}`}
      perPage={25}
    >
      <JobListContent />
    </List>
  )
}
