import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import FixedCostForm from './FixedCostForm'

export default function FixedCostCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <FixedCostForm isCreate />
      </SimpleForm>
    </Create>
  )
}
