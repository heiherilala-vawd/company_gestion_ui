import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function IncomeCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput
          source="source_organization"
          label="Organisation source"
          validate={[required()]}
        />
        <TextInput source="invoice_reference" label="Référence facture" />
        <NumberInput source="amount" label="Montant" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <ReferenceInput source="job_id" reference="jobs" label="Chantier">
          <SelectInput optionText="description" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
