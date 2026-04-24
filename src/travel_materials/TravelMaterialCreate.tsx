import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin'

export default function TravelMaterialCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="travel_id" label="Voyage" reference="travel_expenses">
          <SelectInput source="departure_location" optionText="departure_location" />
        </ReferenceInput>
        <TextInput source="material" label="Matériau" />
        <NumberInput source="quantity" label="Quantité" />
        <NumberInput source="quantity_received" label="Quantité reçue" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Create>
  )
}
