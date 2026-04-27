import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin'

export default function EquipmentEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        warehouse_id: data.warehouse?.id,
        warehouse: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <ReferenceInput source="warehouse_id" reference="warehouses" filter={{ _perPage: 1000 }}>
          <SelectInput optionText="name" fullWidth />
        </ReferenceInput>
        <NumberInput source="floor_number" label="Étage" />
        <NumberInput source="storage_number" label="Emplacement" />
      </SimpleForm>
    </Edit>
  )
}
