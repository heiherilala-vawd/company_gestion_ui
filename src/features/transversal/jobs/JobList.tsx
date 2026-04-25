import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  TextInput,
  useListContext,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'
import { useEffect } from 'react'
import { useCompany } from '../companies/CompanyContext.tsx'

const JobFilters = [
  <SearchInput source="description" alwaysOn />,
  <TextInput source="status" label="Statut" />,
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
    <Datagrid>
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
      <DateField source="created_at" label="Créé le" showTime />
      <DateField source="updated_at" label="Modifié le" showTime />
      {/* Nom complet du créateur */}
      <FunctionField
        label="Créé par"
        render={(record) => (
          <span>
            {record.created_by?.first_name} {record.created_by?.last_name}
          </span>
        )}
      />

      {/* Nom complet du modificateur */}
      <FunctionField
        label="Modifié par"
        render={(record) => (
          <span>
            {record.updated_by?.first_name} {record.updated_by?.last_name}
          </span>
        )}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
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
