import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function LeaveConfigShow() {
  return (
    <Show title="Détails configuration congés">
      <SimpleShowLayout>
        <TextField source="id" />
        <DateField source="hire_date" label="Date d'embauche" />
        <TextField source="contract_type" label="Type de contrat" />
        <NumberField source="vacation_days_per_month" label="Jours de congé / mois" />
        <NumberField source="weekly_hours" label="Heures / semaine" />
        <DateField source="end_date" label="Date fin" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record: any) =>
            record.created_by
              ? `${record.created_by.first_name || ''} ${record.created_by.last_name || ''}`
              : ''
          }
        />
        <FunctionField
          label="Modifié par"
          render={(record: any) =>
            record.updated_by
              ? `${record.updated_by.first_name || ''} ${record.updated_by.last_name || ''}`
              : ''
          }
        />
      </SimpleShowLayout>
    </Show>
  )
}
