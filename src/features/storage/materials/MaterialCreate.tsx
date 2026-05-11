import { Create, SimpleForm } from 'react-admin'
import MaterialForm from './MaterialForm'

export default function MaterialCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <MaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
