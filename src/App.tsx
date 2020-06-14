import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { usePlaces } from './api'
import './firebase'
import { NearbyListingPage } from './pages/nearby-listing/NearbyListingPage'
import { PlaceDetailPage } from './pages/place-detail/PlaceDetailPage'
import { RatingPage } from './pages/rating/RatingPage'
import { theme } from './theme'

export function App() {
  const places = usePlaces()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <NearbyListingPage places={places} />
          </Route>

          <Route path="/place/:placeId" exact>
            <PlaceDetailPage places={places} />
          </Route>

          <Route path="/place/:placeId/rating" exact>
            <RatingPage places={places} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}
