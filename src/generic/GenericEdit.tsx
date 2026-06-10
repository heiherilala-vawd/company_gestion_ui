import { Edit, EditProps } from 'react-admin'
import { useNavigate } from 'react-router-dom'

export default function GenericEdit(props: EditProps) {
  const navigate = useNavigate()
  return (
    <Edit
      {...props}
      redirect={false}
      mutationMode="pessimistic"
      mutationOptions={{
        ...(props.mutationOptions as any),
        onSuccess: (...args: any[]) => {
          ;(props.mutationOptions as any)?.onSuccess?.(...args)
          navigate(-1)
        },
      }}
    />
  )
}
