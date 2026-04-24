import type { ReactNode } from 'react'
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin'

export const Layout = ({ 
  children, 
  appBar, 
  menu 
}: { 
  children?: ReactNode
  appBar?: React.ComponentType
  menu?: React.ComponentType
}) => {
  return (
    <RALayout appBar={appBar} menu={menu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  )
}

export default Layout
