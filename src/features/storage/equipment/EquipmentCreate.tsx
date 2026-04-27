import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function EquipmentCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <ReferenceInput source="warehouse_id" reference="warehouses" label="Entrepôt">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="floor_number" label="Étage" />
        <NumberInput source="storage_number" label="Emplacement" />
      </SimpleForm>
    </Create>
  )
}
