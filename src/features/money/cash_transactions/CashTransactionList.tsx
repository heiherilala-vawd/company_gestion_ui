import { List, TextField, SearchInput, EditButton, NumberField, SelectField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const CashTransactionFilters = [<SearchInput source="q" alwaysOn />]

export default function CashTransactionList() {
  return (
    <List resource="cash_transactions" filters={CashTransactionFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['description', 'amount']}>
        <TextField source="cash_account_id" label="Compte caisse" />
        <NumberField source="amount" label="Montant" />
        <TextField source="transaction_date" label="Date transaction" />
        <TextField source="description" label="Description" />
        <SelectField
          source="type"
          label="Type"
          choices={[
            { id: 'CREDIT', name: 'Crédit' },
            { id: 'DEBIT', name: 'Débit' },
          ]}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
