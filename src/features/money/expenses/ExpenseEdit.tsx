import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'

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
        <ReferenceInput source="job_id" reference="jobs" filter={{ _perPage: 1000 }}>
          <SelectInput optionText="description" fullWidth />
        </ReferenceInput>
        <NumberInput source="amount" label="Montant" />
        <TextInput source="description" label="Description" multiline />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
