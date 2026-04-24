import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin'

export default function TravelEquipmentEdit() {
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
        <TextInput source="travel.id" label="id deplacement" />
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
    </Edit>
  )
}
