import { Box, Button, Container, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import DirectionsIcon from '@material-ui/icons/Directions'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_KEY, usePlace, usePlaceRatings } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import { PlaceRatingsList } from './PlaceRatings'
import { formatDecimal } from '../../util/i18n'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const place = usePlace(placeId)
  const ratings = usePlaceRatings(placeId)
  const score = ratings.reduce((curr, s) => curr + s.score, 0) / (ratings.length || 1)

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

          {tab === 'avaliacoes' && (
            <Container>
              <Box my={2}>
                <Typography variant="subtitle1">Média geral</Typography>
                <Grid container justify="space-between" spacing={1} wrap="nowrap">
                  <Grid container item spacing={1} alignItems="baseline">
                    <Grid item>
                      <StarIcon style={{ color: yellow[700] }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="span">
                        {formatDecimal(score)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">({ratings.length} avaliações)</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<StarBorderOutlinedIcon />}
                      component={Link}
                      to={`/place/${place.id}/rating`}
                    >
                      Avaliar
                    </Button>
                  </Grid>
                </Grid>

                <Box my={2}>
                  <Typography variant="subtitle1">Comentários</Typography>
                  {ratings.length === 0 && (
                    <Typography variant="body2">
                      Nenhum comentário. Seja o primeiro a avaliar!
                    </Typography>
                  )}

                  {ratings.length > 0 && <PlaceRatingsList ratings={ratings} />}
                </Box>
              </Box>
            </Container>
          )}

          {tab === 'info' && (
            <Container>
              <Box my={2}>
                <Typography variant="subtitle2">Sobre o PPD</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore necessitatibus
                  ipsam itaque consequatur blanditiis nesciunt expedita voluptatem aperiam. Alias,
                  quas rem! Optio dolorum sit nihil earum excepturi quam similique mollitia?
                </Typography>
              </Box>
            </Container>
          )}
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
