import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CarsForm from './CarsForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function CarsCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        warehouse_name: data.equipment_name,
      })}
    >
      <SimpleForm id="cars-create-form" toolbar={<FormToolbar />}>
        <CarsForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
