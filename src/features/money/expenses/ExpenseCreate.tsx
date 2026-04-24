import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin'

export default function ExpenseCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="job_id" label="Chantier" reference="jobs">
          <SelectInput source="description" optionText="description" />
        </ReferenceInput>
        <NumberInput source="amount" label="Montant" />
        <TextInput source="description" label="Description" multiline />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Create>
  )
}
