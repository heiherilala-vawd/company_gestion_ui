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
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
