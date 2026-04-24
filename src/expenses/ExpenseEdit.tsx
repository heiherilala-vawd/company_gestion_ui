import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin'

export default function ExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="job.id" label="ID Chantier" />
        <NumberInput source="amount" label="Montant" />
        <TextInput source="description" label="Description" multiline />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
