import { Edit, SimpleForm, TextInput, NumberInput, required } from 'react-admin'

export default function IncomeEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TextInput
          source="source_organization"
          label="Organisation source"
          validate={[required()]}
        />
        <TextInput source="invoice_reference" label="Référence facture" />
        <NumberInput source="amount" label="Montant" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="job.id" label="ID Chantier" />
      </SimpleForm>
    </Edit>
  )
}
