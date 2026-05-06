import React from 'react'
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin'
import { Box } from '@mui/material'
import { AppBar } from './AppBar'
import { Menu } from './Menu'
import { Sidebar } from 'react-admin'

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
            sx={{
              '& .MuiModal-root': {
                pointerEvents: 'none',
              },
            }}
          />
        ))
      }
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 1, sm: 2, md: 3 },
          backgroundColor: 'background.default',
          minHeight: '100vh',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'background.paper',
            borderRadius: { xs: 2, md: 4 },
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
                : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
            border: (theme) =>
              theme.palette.mode === 'light'
                ? '1px solid rgba(0,0,0,0.04)'
                : '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden',
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {children}
        </Box>
      </Box>
      <CheckForApplicationUpdate />
    </RALayout>
  )
}

export default Layout
