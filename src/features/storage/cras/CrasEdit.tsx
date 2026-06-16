import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CrasForm from './CrasForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function CrasEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          equipment_id: data.equipment_id || data.equipment?.id,
          warehouse_id: data.warehouse_id || data.warehouse?.id,
          equipment_name: data.equipment?.name,
          equipment_category: data.equipment?.category,
          purchase_price: data.equipment?.purchase_price,
          purchase_date: data.equipment?.purchase_date,
          est_en_panne: data.equipment?.est_en_panne,
          warehouse_description: data.warehouse?.description,
          job_id: data.warehouse?.job_id,
        }),
      }}
      transform={(data) => ({
        ...data,
        warehouse_name: data.equipment_name,
      })}
    >
      <SimpleForm id="cras-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CrasForm />
      </SimpleForm>
    </GenericEdit>
  )
}
