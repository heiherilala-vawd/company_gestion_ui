import { Create, CreateProps } from 'react-admin'
import { useNavigate } from 'react-router-dom'

export default function GenericCreate(props: CreateProps) {
  const navigate = useNavigate()
  return (
    <Create
      {...props}
      redirect={false}
      mutationMode={
        import.meta.env.VITE_MUTATION_MODE === 'pessimistic' ? 'pessimistic' : undefined
      }
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
