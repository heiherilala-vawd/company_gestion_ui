import {
  List,
  TextField,
  NumberField,
  SearchInput,
  TextInput,
  BooleanInput,
  BooleanField,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const IncomeFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="invoice_reference" label="Réf. facture" key="invoice_reference" />,
  <TextInput source="description" label="Description" key="description" />,
  <TextInput source="amount" label="Montant" key="amount" />,
  <TextInput source="income_type_id" label="Type de revenu" key="income_type_id" />,
  <BooleanInput source="money_received" label="Argent reçu" key="money_received" />,
  <BooleanInput source="paid" label="Payé" key="paid" />,
]

export default function IncomeList() {
  return (
    <List filters={IncomeFilters}>
      <ResponsiveDatagrid
        priorityFields={['organization.name', 'amount', 'invoice_reference', 'description']}
      >
        <TextField source="organization.name" label="Organisation" />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <TextField source="invoice_reference" label="Réf. facture" />
        <TextField source="description" label="Description" />
        <BooleanField source="paid" label="Payé" />
        <TextField source="job.description" label="Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
