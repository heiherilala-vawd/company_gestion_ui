import { useEffect, useRef } from 'react'
import { SimpleForm, TextInput, useGetList, useRecordContext } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import FormToolbar from '../../../generic/FormToolbar'
import UserForm from './UserForm.tsx'
import GenericEdit from '../../../generic/GenericEdit'

function LeaveConfigFetcher() {
  const record = useRecordContext()
  const userId = record?.id
  const { setValue } = useFormContext()
  const initialized = useRef(false)

  const { data: leaveConfigs } = useGetList(
    'leave_configs',
    {
      filter: { user_id: userId },
      pagination: { page: 1, perPage: 1 },
    },
    { enabled: !!userId },
  )

  useEffect(() => {
    if (leaveConfigs && !initialized.current) {
      initialized.current = true
      if (leaveConfigs.length > 0) {
        setValue('leave_config_id', leaveConfigs[0].id)
      } else {
        setValue('leave_config_id', null)
      }
    }
  }, [leaveConfigs, setValue])

  return null
}

export default function UserEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="user-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <UserForm />
        <LeaveConfigFetcher />
      </SimpleForm>
    </GenericEdit>
  )
}
