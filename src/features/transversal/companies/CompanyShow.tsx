// companies/CompanyShow.tsx
import {
  Show,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  SimpleShowLayout,
  TextField,
  SelectField,
  useShowController,
  DateField,
  FunctionField,
} from 'react-admin'

import { useEffect } from 'react'

function CompanyInformations() {
  return (
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" label="Nom" />
      <TextField source="rib" label="RIB" />
      <TextField source="description" label="Description" />
      <SelectField
        source="company_type"
        label="Type"
        choices={[
          { id: 'BTP', name: 'BTP' },
          { id: 'HOTEL', name: 'Hôtel' },
        ]}
      />
      <TextField source="comment" label="Commentaire" />
    </SimpleShowLayout>
  )
}

export default function CompanyShow() {
  const { record, isLoading } = useShowController()
  const companyId = record?.id

  useEffect(() => {
    console.log('🏢 CompanyShow - record:', record)
    console.log('🏢 CompanyShow - isLoading:', isLoading)
    console.log('🏢 CompanyShow - companyId:', companyId)
  }, [record, isLoading, companyId])

  return (
    <Show>
      <TabbedShowLayout>
        <Tab label="Informations">
          <CompanyInformations />
        </Tab>

        <Tab label="Chantiers">
          {isLoading ? (
            <p>Chargement...</p>
          ) : record?.id ? (
            <ReferenceManyField reference="jobs" target="company_id" record={record} perPage={25}>
              <TextField source="id" />
              <TextField source="company_id" label="ID Entreprise" />
              <TextField source="description" label="Description" />
              <DateField source="contract_signature_date" label="Signature contrat" />
              <DateField source="start_date" label="Date début" />
              <DateField source="end_date" label="Date fin" />
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
            </ReferenceManyField>
          ) : (
            <p>Aucun ID de company</p>
          )}
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}
