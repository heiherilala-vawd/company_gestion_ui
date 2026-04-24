import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin'
import generateId from '../utili/utils.tsx'


export default function IncomeCreate() {
  return (
    <Create>
      <TextInput source="id" readOnly defaultValue={generateId()} />
      <SimpleForm>
        <TextInput
          source="source_organization"
          label="Organisation source"
          validate={[required()]}
        />
        <TextInput source="invoice_reference" label="Référence facture" />
        <NumberInput source="amount" label="Montant" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="job_id" label="ID Chantier" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
