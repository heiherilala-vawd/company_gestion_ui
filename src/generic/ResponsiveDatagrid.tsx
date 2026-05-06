import { FunctionComponent, ReactNode, Children, isValidElement } from 'react'
import { Datagrid, DatagridProps } from 'react-admin'
import { useMediaQuery, useTheme as useMuiTheme } from '@mui/material'
import { datagridStyles } from '../style/components'

interface ResponsiveDatagridProps extends Omit<DatagridProps, 'children'> {
  children: ReactNode
  priorityFields?: string[]
}

export const ResponsiveDatagrid: FunctionComponent<ResponsiveDatagridProps> = ({
  children,
  priorityFields,
  ...props
}) => {
  const theme = useMuiTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))

  const childArray = Children.toArray(children)

  const getVisibleFields = () => {
    if (!priorityFields || priorityFields.length === 0) return childArray

    const prioritySet = new Set(priorityFields)
    const priority = childArray.filter((child) => {
      if (isValidElement(child)) {
        return child.props.source && prioritySet.has(child.props.source)
      }
      return false
    })

    const others = childArray.filter((child) => {
      if (isValidElement(child)) {
        return child.props.source && !prioritySet.has(child.props.source)
      }
      return true
    })

    if (isXs) return priority.slice(0, 2)
    if (isSm) return priority.slice(0, 3)
    if (isMd) return priority.slice(0, 5)

    return [...priority, ...others].slice(0, 8)
  }

  return (
    <Datagrid
      {...props}
      sx={{
        ...datagridStyles.container,
        ...datagridStyles.responsive,
      }}
      rowClick="show"
    >
      {getVisibleFields()}
    </Datagrid>
  )
}
