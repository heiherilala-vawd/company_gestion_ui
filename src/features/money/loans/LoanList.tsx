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
  <TextInput source="organization_id" label="Prêteur" key="organization_id" />,
  <TextInput source="status" label="Statut" key="status" />,
]

export default function LoanList() {
  return (
    <List resource="loans" filters={LoanFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['organization.name', 'amount', 'interest_rate', 'status']}
      >
        <TextField source="organization.name" label="Prêteur" />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <NumberField source="interest_rate" label="Taux d'intérêt (% par mois)" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'ACTIVE', name: 'Actif' },
            { id: 'PAID', name: 'Payé' },
            { id: 'DEFAULTED', name: 'Défaut' },
          ]}
        />
        <NumberField
          source="remaining_amount"
          label="Reste dû"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
