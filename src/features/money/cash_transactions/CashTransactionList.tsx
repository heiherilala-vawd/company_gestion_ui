import {
  List,
  TextField,
  SearchInput,
  EditButton,
  NumberField,
  SelectField,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const CashTransactionFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function CashTransactionList() {
  return (
    <List resource="cash_transactions" filters={CashTransactionFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['description', 'amount']}>
        <FunctionField
          source="cash_account_id"
          label="Compte caisse"
          render={(record) => record.cash_account?.name || record.cash_account_id || ''}
        />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
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
