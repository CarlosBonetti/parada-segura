import React from 'react'
import { AppBar } from './AppBar'
import { Container } from '@material-ui/core'

export interface PageLayoutProps {
  title?: string
  backUrl?: string
  children?: React.ReactNode
}

export function PageLayout({ title, backUrl, children }: PageLayoutProps) {
  return (
    <div>
      <AppBar title={title} backUrl={backUrl} />

      <Container maxWidth="sm" disableGutters>
        {children as any}
      </Container>
    </div>
  )
}
