import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'

export default function TravelMaterialEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput source="travel_id" reference="travel_expenses">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="material" label="Matériau" />
        <NumberInput source="quantity" label="Quantité" />
        <NumberInput source="quantity_received" label="Quantité reçue" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
