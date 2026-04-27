import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
} from 'react-admin'

export default function TravelEquipmentCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="travel_id" label="Voyage" reference="travel_expenses">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="equipment" label="Équipement" />
        <NumberInput source="quantity" label="Quantité" />
        <SelectInput
          source="status"
          label="Statut"
          choices={[
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'LOST', name: 'Perdu' },
            { id: 'ARRIVED', name: 'Arrivé' },
          ]}
        />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Create>
  )
}
