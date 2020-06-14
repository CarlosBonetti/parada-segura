import { Box, Button, Container, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import DirectionsIcon from '@material-ui/icons/Directions'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, usePlace, usePlaceRatings } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import { PlaceInfo } from './PlaceInfo'
import { PlaceRating } from './PlaceRating'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const place = usePlace(placeId)
  const ratings = usePlaceRatings(placeId)

  const [tab, setTab] = useState<string>('avaliacoes')
  const classes = useStyles()

  return (
    <PageLayout title={place?.name} backUrl="/">
      {!place && <div />}

      {place && (
        <>
          <Box>
            <iframe
              title={`${place?.name} map location`}
              width="100%"
              height="150"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?zoom=14&q=${place.name}, ${place.city}&key=${API_KEY}`}
            ></iframe>
          </Box>

          <Container>
            <Box mt={2} mb={3}>
              <Grid container justify="space-between" spacing={1} wrap="nowrap">
                <Grid item>
                  <Typography variant="subtitle2">Endereço</Typography>
                  <Typography variant="body2">{place.address}</Typography>
                </Grid>
                <Grid item>
                  <Button color="primary" classes={{ label: classes.label }}>
                    <DirectionsIcon />
                    Rotas
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>

          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, value) => setTab(value)}
            variant="fullWidth"
          >
            <Tab value="info" label="Informações gerais" />
            <Tab value="avaliacoes" label="Avaliações" />
          </Tabs>

          {tab === 'avaliacoes' && <PlaceRating place={place} ratings={ratings} />}
          {tab === 'info' && <PlaceInfo />}
        </>
      )}
    </PageLayout>
  )
}

const useStyles = makeStyles((theme) => ({
  label: {
    flexDirection: 'column',
  },
}))
