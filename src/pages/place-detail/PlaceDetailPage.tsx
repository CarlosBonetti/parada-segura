import { Box, Typography, Fab, makeStyles, Tabs, Tab, Container, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_KEY, usePlace } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import FeedbackIcon from '@material-ui/icons/Feedback'
import StarIcon from '@material-ui/icons/StarBorderOutlined'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const place = usePlace(placeId)

  const [tab, setTab] = useState<string>('avaliacoes')
  const classes = useStyles()

  return (
    <PageLayout title={place?.name}>
      {place && (
        <>
          <Fab aria-label="Denunciar" color="secondary" className={classes.fab}>
            <FeedbackIcon />
          </Fab>

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
            <Box my={2}>
              <Typography variant="subtitle2">Endereço</Typography>
              <Typography variant="body2">{place.address}</Typography>
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
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<StarIcon />}
                  component={Link}
                  to={`/place/${place.id}/rating`}
                >
                  Avaliar
                </Button>
              </Box>
            </Container>
          )}

          {tab === 'info' && (
            <Container>
              <Box my={2}>
                <Typography>
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))
