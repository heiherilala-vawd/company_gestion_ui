import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  List,
  TextField,
  NumberField,
  SearchInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

export default function PurchaseList() {
  const [searchParams] = useSearchParams()
  const isEquipment = searchParams.get('isEquipment') === 'true'
  const isMaterial = searchParams.get('isMaterial') === 'true'

  useEffect(() => {
    if (isEquipment) {
      sessionStorage.setItem('purchaseMode', 'equipment')
    } else if (isMaterial) {
      sessionStorage.setItem('purchaseMode', 'material')
    } else {
      sessionStorage.setItem('purchaseMode', '')
    }
  }, [isEquipment, isMaterial])

  const permanentFilter = isEquipment
    ? { is_equipment: true }
    : isMaterial
      ? { is_equipment: false }
      : undefined

  const PurchaseFilters = [
    <SearchInput source="q" alwaysOn key="search" />,
    <ReferenceInput source="supplier_id" reference="warehouses" perPage={100} key="supplier">
      <SelectInput optionText="name" label="Fournisseur" />
    </ReferenceInput>,
    ...(!isEquipment && !isMaterial
      ? [<BooleanInput source="is_equipment" label="Équipement" key="is_equipment" />]
      : []),
  ]

  return (
    <List resource="purchases" filters={PurchaseFilters} perPage={25} filter={permanentFilter}>
      <ResponsiveDatagrid priorityFields={['equipment.name', 'material.name', 'quantity']}>
        {!isMaterial && <TextField source="equipment.name" label="Équipement" />}
        {!isEquipment && <TextField source="material.name" label="Matériau" />}
        <TextField source="supplier.name" label="Fournisseur" />
        <TextField source="expense.amount" label="Montant" />
        <NumberField source="quantity" label="Quantité" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
