import type { ReactNode } from 'react'
import { Layout as RALayout, CheckForApplicationUpdate, AppBar } from 'react-admin'

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
)
