import { CssBaseline, Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppBar } from './components/AppBar'
import { NearbyListingPage } from './pages/nearby-listing/NearbyListingPage'
import { PlaceDetailPage } from './pages/place-detail/PlaceDetailPage'

export function App() {
  return (
    <>
      <CssBaseline />

      <AppBar />

      <Container maxWidth="md" disableGutters>
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
      </Container>
    </>
  )
}
