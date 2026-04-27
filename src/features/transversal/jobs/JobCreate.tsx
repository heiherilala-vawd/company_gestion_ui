import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  required,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function JobCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <ReferenceInput source="company_id" reference="companies" label="Entreprise">
          <SelectInput optionText="name" />
        </ReferenceInput>
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
      </SimpleForm>
    </Create>
  )
}
