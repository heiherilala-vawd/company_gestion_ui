import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
} from 'react-admin'

const IncomeFilters = [
  <SearchInput source="source_organization" alwaysOn />,
  <TextInput source="invoice_reference" label="Référence facture" />,
  <TextInput source="description" label="Description" />,
]

export default function IncomeList() {
  return (
    <List filters={IncomeFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="source_organization" label="Organisation source" />
        <TextField source="invoice_reference" label="Référence facture" />
        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="job_id" label="ID Chantier" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </Datagrid>
    </List>
  )
}
