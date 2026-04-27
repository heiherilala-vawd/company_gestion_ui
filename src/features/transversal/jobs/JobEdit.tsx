import { Edit, SimpleForm, TextInput, DateInput, SelectInput, ReferenceInput } from 'react-admin'

export default function JobEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        company_id: data.company?.id,
        company: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <ReferenceInput source="company_id" reference="companies" filter={{ _perPage: 1000 }}>
          <SelectInput optionText="name" fullWidth />
        </ReferenceInput>
        <TextInput source="description" label="Description" multiline rows={3} />
        <DateInput source="contract_signature_date" label="Date signature contrat" />
        <DateInput source="start_date" label="Date début" />
        <DateInput source="end_date" label="Date fin" />
        <SelectInput
          source="status"
          label="Statut"
          choices={[
            { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'COMPLETED', name: 'Terminé' },
          ]}
        />
      </SimpleForm>
    </Edit>
  )
}
