import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialForm from './MaterialForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function MaterialCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="material-create-form" toolbar={<FormToolbar />}>
        <MaterialForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
