import {
  AppBar as MuiAppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Container,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useHistory } from 'react-router-dom'

export interface AppBarProps {
  title?: string
  backUrl?: string
}

export function AppBar({ title = 'Parada Segura', backUrl }: AppBarProps) {
  const classes = useStyles()
  const history = useHistory()

  const handleBackButton = () => history.replace(backUrl || '/')

  return (
    <MuiAppBar position="static" elevation={0}>
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          {backUrl && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Voltar"
              className={classes.menuButton}
              onClick={handleBackButton}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))
