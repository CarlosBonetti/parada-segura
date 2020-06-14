import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppBar } from './components/AppBar'
import './firebase'
import { NearbyListingPage } from './pages/nearby-listing/NearbyListingPage'
import { PlaceDetailPage } from './pages/place-detail/PlaceDetailPage'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <NearbyListingPage />
          </Route>

          <Route path="/place/:placeId" exact>
            <PlaceDetailPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}
