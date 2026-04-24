import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin'

const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function MaterialCreate() {
  return (
    <Create transform={(data) => ({ ...data, id: generateId() })}>
      <SimpleForm>
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="warehouse_id" label="ID Entrepôt" validate={[required()]} />
        <NumberInput source="floor_number" label="Étage" />
        <NumberInput source="storage_number" label="Emplacement" />
      </SimpleForm>
    </Create>
  )
}
