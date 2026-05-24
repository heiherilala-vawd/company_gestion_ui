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
        <NumberField source="amount" label="Montant" />
        <NumberField source="principal_portion" label="Part capital" />
        <NumberField source="interest_portion" label="Part intérêts" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
