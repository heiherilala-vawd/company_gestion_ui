import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin'

export default function WarehouseEdit() {
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
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <ReferenceInput source="job_id" reference="jobs">
          <SelectInput optionText="description" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}
