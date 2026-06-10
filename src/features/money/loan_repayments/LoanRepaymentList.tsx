import { List, NumberField, DateField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const LoanRepaymentFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function LoanRepaymentList() {
  return (
    <List resource="loan_repayments" filters={LoanRepaymentFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['payment_date', 'amount', 'principal_portion', 'interest_portion']}
      >
        <DateField source="payment_date" label="Date paiement" />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <NumberField
          source="principal_portion"
          label="Part capital"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <NumberField
          source="interest_portion"
          label="Part intérêts"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
