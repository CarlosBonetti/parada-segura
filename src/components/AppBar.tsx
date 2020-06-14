import { AppBar as MuiAppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export interface AppBarProps {
  title?: string
}

export function AppBar({ title = 'Nome do App' }: AppBarProps) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const handleBackButton = () => history.push('/')

  return (
    <MuiAppBar position="static" elevation={0}>
      <Toolbar>
        {location.pathname !== '/' && (
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
    </MuiAppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))
