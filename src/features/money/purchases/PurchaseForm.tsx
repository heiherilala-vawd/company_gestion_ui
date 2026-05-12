import { TextInput, NumberInput, BooleanInput, FormDataConsumer } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderEquipmentSelect,
  renderExpenseSelect,
  renderMaterialSelect,
  renderWarehouseSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function PurchaseForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={id}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      {renderWarehouseSelect('supplier_id', 'Fournisseur')}
      <BooleanInput
        source="is_equipment"
        label="Est un équipement"
        data-testid="input-is_equipment"
      />
      <FormDataConsumer>
        {({ formData }) =>
          formData?.is_equipment ? (
            renderEquipmentSelect('equipment', 'Équipement')
          ) : (
            <>
              {renderMaterialSelect('material', 'Matériau')}
              <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
            </>
          )
        }
      </FormDataConsumer>
      <div data-testid="input-expense-form" style={{ width: '100%' }}>
        <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
          💰 Dépense
        </Typography>
        {!isCreate && <TextInput source="expense.id" readOnly />}
        <ExpenseForm
          isCreate={isCreate}
          isCreateForm={isCreateForm}
          souce={'expense.'}
          description={
            'expence of ' +
            PurchaseForm.name +
            ' from :' +
            new Date().toISOString() +
            '. And with id: ' +
            id
          }
        />
      </div>
    </>
  )
}
