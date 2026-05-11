import { Edit, SimpleForm, TextInput } from 'react-admin'
import PurchaseForm from './PurchaseForm'

export default function PurchaseEdit() {
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
          supplier_id: data.supplier.id,
        }),
      }}
    >
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <PurchaseForm />
      </SimpleForm>
    </Edit>
  )
}
