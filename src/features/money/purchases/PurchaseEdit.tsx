import { Edit, SimpleForm, TextInput } from 'react-admin'
import PurchaseForm from './PurchaseForm'

export default function PurchaseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        material: data.material?.id,
        equipment: data.equipment?.id,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <PurchaseForm />
      </SimpleForm>
    </Edit>
  )
}
