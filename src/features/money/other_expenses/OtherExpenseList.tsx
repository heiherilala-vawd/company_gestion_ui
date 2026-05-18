import {
  List,
  TextField,
  SearchInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const OtherExpenseFilters = [<SearchInput source="description" alwaysOn />]

export default function OtherExpenseList() {
  return (
    <List resource="other_expenses" filters={OtherExpenseFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['expense.amount', 'description']}>
        <TextField source="expense.amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="other_expense_type.name" label="Type" />
        <TextField source="expense.comment" label="Commentaire" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
