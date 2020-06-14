import React from 'react'
import { AppBar } from './AppBar'
import { Container } from '@material-ui/core'

export interface PageLayoutProps {
  title?: string
  children?: React.ReactNode
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div>
      <AppBar title={title} />

      <Container maxWidth="md" disableGutters>
        {children as any}
      </Container>
    </div>
  )
}
