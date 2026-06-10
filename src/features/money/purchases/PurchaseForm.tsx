import {
  TextInput,
  NumberInput,
  BooleanInput,
  FormDataConsumer,
  DateInput,
  useGetList,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderEquipmentSelect,
  renderMaterialSelect,
  renderSupplierSelect,
  renderWarehouseSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import { Typography } from '@mui/material'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'

export default function PurchaseForm({
  isCreate = false,
  isCreateForm = false,
  isEquipment = false,
  isMaterial = false,
}) {
  const id = generateId()
  const forceEquipment = isEquipment || isMaterial
  const { watch } = useFormContext()
  const supplierId = watch('supplier_id')
  const equipmentName = watch('equipment.name')
  const materialId = watch('material')
  const quantity = watch('quantity')
  const expenseAmount = watch('expense.amount')
  const showEquipment = watch('is_equipment') ?? isEquipment

  const { data: materials = [] } = useGetList('materials', {
    pagination: { page: 1, perPage: 100 },
  })
  const materialName = materialId
    ? materials.find((m: any) => m.id === materialId)?.name
    : undefined

  const { data: suppliers = [] } = useGetList('suppliers', {
    pagination: { page: 1, perPage: 100 },
  })
  const supplierName = supplierId
    ? suppliers.find((s: any) => s.id === supplierId)?.name
    : undefined

  const generatedDesc = useMemo(() => {
    const item = showEquipment
      ? `équipement ${equipmentName || '?'}`
      : `matériau ${materialName || '?'}${quantity ? ` (x${quantity})` : ''}`
    const parts = [`Achat de ${item}`]
    if (supplierName) parts.push(`fournisseur ${supplierName}`)
    if (expenseAmount) parts.push(`montant ${expenseAmount} Ar`)
    return parts.join(' - ')
  }, [showEquipment, equipmentName, materialName, quantity, supplierName, expenseAmount])

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      {renderWarehouseSelect('source_warehouse_id', 'Entrepôt source')}
      {forceEquipment ? (
        <TextInput source="is_equipment" defaultValue={isEquipment} sx={{ display: 'none' }} />
      ) : (
        <BooleanInput
          source="is_equipment"
          label="Est un équipement"
          defaultValue={false}
          data-testid="input-is_equipment"
        />
      )}
      <FormDataConsumer>
        {({ formData }) => {
          const showEquipment = formData?.is_equipment ?? isEquipment
          return showEquipment ? (
            <>{renderEquipmentSelect('equipment_id', 'Équipement')}</>
          ) : (
            <>
              {renderMaterialSelect('material', 'Matériau')}
              <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
            </>
          )
        }}
      </FormDataConsumer>
      {renderSupplierSelect('supplier_id', 'Fournisseur')}
      <CollapsibleOptionalFields>
        <DateInput
          source="invoice_date"
          label="Date facture"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-invoice_date"
        />
        <DateInput
          source="due_date"
          label="Date d'échéance"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-due_date_purchase"
        />
        <DateInput
          source="paid_at"
          label="Date de paiement"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-paid_at"
        />
        <FormDataConsumer>
          {({ formData }) => {
            const showEquipment = formData?.is_equipment ?? isEquipment
            return showEquipment ? (
              <TextInput
                source="equipment.description"
                label="Description"
                multiline
                data-testid="input-equipment-description"
              />
            ) : null
          }}
        </FormDataConsumer>
      </CollapsibleOptionalFields>
      <div data-testid="input-expense-form" style={{ width: '100%' }}>
        <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
          💰 Dépense
        </Typography>
        {!isCreate && <TextInput source="expense.id" sx={{ display: 'none' }} />}
        <ExpenseForm
          isCreate={isCreate}
          isCreateForm={isCreateForm}
          souce={'expense.'}
          description={generatedDesc}
        />
      </div>
    </>
  )
}
