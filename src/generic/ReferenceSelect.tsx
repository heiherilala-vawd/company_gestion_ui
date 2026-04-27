import { ReferenceInput, SelectInput, useGetMany, Loading } from 'react-admin'

interface ReferenceSelectProps {
  source: string
  reference: string
  label?: string
  optionText?: string | ((record: any) => string)
  filter?: Record<string, any>
  sort?: { field: string; order: string }
  perPage?: number
}

export default function ReferenceSelect({
  source,
  reference,
  label,
  optionText = 'name',
  filter,
  sort = { field: 'name', order: 'ASC' },
  perPage = 100,
}: ReferenceSelectProps) {
  return (
    <ReferenceInput
      source={source}
      reference={reference}
      filter={filter}
      sort={sort}
      perPage={perPage}
    >
      <SelectInput optionText={optionText} label={label} />
    </ReferenceInput>
  )
}
