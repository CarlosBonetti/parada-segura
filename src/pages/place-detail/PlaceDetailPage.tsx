import { Box, Typography, Fab, makeStyles, Tabs, Tab, Container } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, usePPDs } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import FeedbackIcon from '@material-ui/icons/Feedback'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const classes = useStyles()
  const { placeId } = useParams()
  const ppds = usePPDs()
  const ppd = ppds.find((p) => p.id === placeId)

  return (
    <PageLayout title={ppd?.name}>
      {ppd && (
        <>
          <Fab aria-label="Denunciar" color="primary" className={classes.fab}>
            <FeedbackIcon />
          </Fab>

          <Box>
            <iframe
              title={`${ppd?.name} map location`}
              width="100%"
              height="150"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?zoom=14&q=${ppd.name}, ${ppd.city}&key=${API_KEY}`}
            ></iframe>
          </Box>

          <Container>
            <Box my={2}>
              <Typography variant="subtitle2">Endereço</Typography>
              <Typography variant="body2">{ppd.address}</Typography>
            </Box>
          </Container>

          <Tabs
            value="avaliacoes"
            indicatorColor="primary"
            textColor="primary"
            // onChange={handleChange}
            variant="fullWidth"
          >
            <Tab value="info" label="Informações gerais" />
            <Tab value="avaliacoes" label="Avaliações" />
          </Tabs>
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
