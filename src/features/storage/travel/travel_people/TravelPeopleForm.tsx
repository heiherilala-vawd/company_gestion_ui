import { TextInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import MaterialForm from '../../materials/MaterialForm.tsx'
import TravelExpenseForm from '../../../money/travel_expenses/TravelExpenseForm.tsx'
import SelectWithCreateProvider, {
  renderTravelExpenseSelect,
  renderUserSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelPeopleForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderTravelExpenseSelect(null, null)}
      {renderUserSelect(null, null)}
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
