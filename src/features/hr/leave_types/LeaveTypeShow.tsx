import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  NumberField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function LeaveTypeShow() {
  return (
    <Show title="Détails type de congé">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <BooleanField source="paid" label="Payé" />
        <BooleanField source="deduct_from_balance" label="Déduit du solde" />
        <NumberField source="days_per_year" label="Jours par an" />
        <TextField source="color" label="Couleur" />
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
