import { TextInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderExpenseSelect,
  renderWarehouseSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderExpenseSelect('expense_id', null)}
      {renderWarehouseSelect('departure_location_id', 'Lieu de départ')}
      {renderWarehouseSelect('arrival_location_id', "Lieu d'arrivée")}
      <DateInput
        source="departure_date"
        label="Date de départ"
        data-testid="input-departure_date"
      />
      <DateInput source="arrival_date" label="Date d'arrivée" data-testid="input-arrival_date" />
    </>
  )
}
