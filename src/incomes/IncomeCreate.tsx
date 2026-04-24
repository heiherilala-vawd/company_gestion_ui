import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin'

const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function IncomeCreate() {
  return (
    <Create transform={(data) => ({ ...data, id: generateId() })}>
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
