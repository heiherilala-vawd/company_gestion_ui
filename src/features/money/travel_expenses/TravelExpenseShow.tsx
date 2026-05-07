import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin'

export default function TravelExpenseShow() {
  return (
    <Show title="Détails frais de déplacement">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="departure_location.name" label="Lieu de départ" />
        <TextField source="arrival_location.name" label="Lieu d'arrivée" />
        <DateField source="departure_date" label="Date de départ" showTime />
        <DateField source="arrival_date" label="Date d'arrivée" showTime />
      </SimpleShowLayout>
    </Show>
  )
}
