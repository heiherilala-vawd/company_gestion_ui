import {
  List,
  TextField,
  NumberField,
  SelectField,
  SearchInput,
  TextInput,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const LoanFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="lender" label="Prêteur" key="lender" />,
  <TextInput source="status" label="Statut" key="status" />,
]

export default function LoanList() {
  return (
    <List resource="loans" filters={LoanFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['lender', 'amount', 'interest_rate', 'status']}>
        <TextField source="lender" label="Prêteur" />
        <NumberField source="amount" label="Montant" />
        <NumberField source="interest_rate" label="Taux d'intérêt" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'ACTIVE', name: 'Actif' },
            { id: 'PAID', name: 'Payé' },
            { id: 'DEFAULTED', name: 'Défaut' },
          ]}
        />
        <NumberField source="remaining_amount" label="Reste dû" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
