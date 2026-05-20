import { Edit, SimpleForm, TextInput } from 'react-admin'
import { useSearchParams } from 'react-router-dom'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseForm from './PurchaseForm'

export default function PurchaseEdit() {
  const [searchParams] = useSearchParams()
  const isEquipment =
    searchParams.get('isEquipment') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'equipment'
  const isMaterial =
    searchParams.get('isMaterial') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'material'

  return (
    <Edit
      redirect="list"
      transform={(data) => ({
        ...data,
        quantity: data.quantity ? data.quantity : 1,
        supplier: { id: data.supplier_id },
      })}
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          equipment: data.equipment?.id,
          material: data.material?.id,
          supplier_id: data.supplier?.id,
          ...(isEquipment ? { is_equipment: true } : {}),
          ...(isMaterial ? { is_equipment: false } : {}),
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <PurchaseForm isEquipment={isEquipment} isMaterial={isMaterial} />
      </SimpleForm>
    </Edit>
  )
}
