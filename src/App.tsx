import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NearbyListingPage } from './pages/nearby-listing/NearbyListingPage'
import { PlaceDetailPage } from './pages/place-detail/PlaceDetailPage'

export function App() {
  return (
    <>
      <CssBaseline />

      <Button variant="contained" color="primary">
        Hello World
      </Button>

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
    </>
  )
}
