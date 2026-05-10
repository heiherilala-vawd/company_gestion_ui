import {
  List,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  BooleanInput,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const IncomeFilters = [
  <SearchInput source="source_organization" alwaysOn />,
  <TextInput source="invoice_reference" label="Réf. facture" />,
  <TextInput source="description" label="Description" />,
  <TextInput source="amount" label="Montant" />,
  <TextInput source="income_type_id" label="Type de revenu" />,
  <BooleanInput source="money_received" label="Argent reçu" />,
]

export default function IncomeList() {
  return (
    <List filters={IncomeFilters}>
      <ResponsiveDatagrid
        priorityFields={['source_organization', 'amount', 'invoice_reference', 'description']}
      >
        <TextField source="source_organization" label="Organisation" />
        <NumberField source="amount" label="Montant" />
        <TextField source="invoice_reference" label="Réf. facture" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="Chantier" />
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
        <EditButton />
        <DeleteButton />
      </ResponsiveDatagrid>
    </List>
  )
}
