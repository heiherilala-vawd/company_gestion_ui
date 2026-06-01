import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialForm from './MaterialForm'

export default function MaterialCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="material-create-form" toolbar={<FormToolbar />}>
        <MaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
