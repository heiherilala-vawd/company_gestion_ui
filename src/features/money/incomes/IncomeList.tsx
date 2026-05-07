import {
  List,
  Datagrid,
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
      <Datagrid rowClick="show">
        <TextField source="source_organization" label="Organisation source" />
        <TextField source="invoice_reference" label="Référence facture" />
        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="Chantier" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        {/* Nom complet du modificateur */}
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
      </Datagrid>
    </List>
  )
}
