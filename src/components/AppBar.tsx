import { AppBar as MuiAppBar, Toolbar, Typography, Container } from '@material-ui/core'
import React from 'react'

export function AppBar() {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Container maxWidth="md" disableGutters>
          <Typography variant="h6">Nome do App</Typography>
        </Container>
      </Toolbar>
    </MuiAppBar>
  )
}
