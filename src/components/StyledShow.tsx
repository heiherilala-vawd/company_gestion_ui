import React from 'react'
import { Show, TabbedShowLayout, Tab, ReferenceManyField, Datagrid } from 'react-admin'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { showStyles } from '../style/components'

interface StyledShowProps {
  title?: string
  children?: React.ReactNode
}

export const StyledShow = ({ title, children }: StyledShowProps) => {
  return (
    <Show sx={showStyles.page}>
      <Card sx={showStyles.card}>
        {title && (
          <Box sx={showStyles.titleBox}>
            <Typography variant="h6" sx={showStyles.titleText}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={showStyles.cardContent}>{children}</CardContent>
      </Card>
    </Show>
  )
}

export const StyledTabbedShowLayout = ({ children }: { children: React.ReactNode }) => {
  return <TabbedShowLayout sx={showStyles.tabbedLayout}>{children}</TabbedShowLayout>
}

export const StyledTab = ({ label, ...props }: { label: string; [key: string]: unknown }) => {
  return <Tab label={label} sx={showStyles.tab} {...props} />
}

export const StyledReferenceManyField = ({
  children,
  ...props
}: {
  children: React.ReactNode
  [key: string]: unknown
}) => {
  return (
    <ReferenceManyField {...props} sx={showStyles.referenceManyField}>
      <Datagrid sx={showStyles.datagrid}>{children}</Datagrid>
    </ReferenceManyField>
  )
}

export const InfoCard = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <Card sx={showStyles.infoCard}>
      {title && (
        <Box sx={showStyles.infoCardTitleBox}>
          <Typography variant="subtitle2" sx={showStyles.infoCardTitle}>
            {title}
          </Typography>
        </Box>
      )}
      <CardContent sx={showStyles.infoCardContent}>{children}</CardContent>
    </Card>
  )
}

export const FieldRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <Box sx={showStyles.fieldRow}>
      <Typography variant="body2" sx={showStyles.fieldLabel}>
        {label}
      </Typography>
      <Typography variant="body2" sx={showStyles.fieldValue}>
        {value}
      </Typography>
    </Box>
  )
}
