import { Create, CreateProps } from 'react-admin'
import { useNavigate } from 'react-router-dom'

export default function GenericCreate(props: CreateProps) {
  const navigate = useNavigate()
  return (
    <Create
      {...props}
      redirect={false}
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
