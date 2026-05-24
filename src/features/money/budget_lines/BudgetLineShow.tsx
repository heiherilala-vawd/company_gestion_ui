import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
} from 'react-admin'

export default function BudgetLineShow() {
  return (
    <Show title="Détails ligne budgétaire">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="category" label="Catégorie" />
        <NumberField source="planned_amount" label="Montant prévu" />
        <NumberField source="actual_amount" label="Montant réel" />
        <TextField source="period_start" label="Début période" />
        <TextField source="period_end" label="Fin période" />
        <TextField source="description" label="Description" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
      </SimpleShowLayout>
    </Show>
  )
}
