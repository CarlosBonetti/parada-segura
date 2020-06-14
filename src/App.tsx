import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './firebase'
import { NearbyListingPage } from './pages/nearby-listing/NearbyListingPage'
import { PlaceDetailPage } from './pages/place-detail/PlaceDetailPage'
import { theme } from './theme'
import { RatingPage } from './pages/rating/RatingPage'

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

          <Route path="/place/:placeId/rating" exact>
            <RatingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}
