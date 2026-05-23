import React from 'react'
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin'
import { Box } from '@mui/material'
import { AppBar } from './AppBar'
import { Menu } from './Menu'
import { Sidebar } from 'react-admin'
import { BottomNav } from './BottomNav'
import { layoutStyles } from '../style/components'

interface LayoutProps {
  children?: React.ReactNode
  appBar?: React.ComponentType<Record<string, unknown>>
  menu?: React.ComponentType<Record<string, unknown>>
  sidebar?: React.ComponentType<Record<string, unknown>>
}

export const Layout = ({ children, appBar, menu, sidebar }: LayoutProps) => {
  return (
    <RALayout
      appBar={appBar || AppBar}
      menu={menu || Menu}
      sidebar={
        sidebar ||
        ((props) => (
          <Sidebar
            {...props}
            DrawerProps={{
              keepMounted: false,
            }}
            sx={layoutStyles.sidebar}
          />
        ))
      }
    >
      <Box sx={layoutStyles.container}>
        <Box sx={layoutStyles.content}>{children}</Box>
      </Box>
      <BottomNav />
      <CheckForApplicationUpdate />
    </RALayout>
  )
}

export default Layout
