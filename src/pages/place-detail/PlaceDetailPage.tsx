import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, usePPDs } from '../../api'
import { PageLayout } from '../../components/PageLayout'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const ppds = usePPDs()
  const ppd = ppds.find((p) => p.id === placeId)

  return (
    <PageLayout title={ppd?.name}>
      {ppd && (
        <>
          <Box mb={2}>
            <iframe
              title={`${ppd?.name} map location`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?zoom=14&q=${ppd.name}, ${ppd.address}&key=${API_KEY}`}
            ></iframe>
          </Box>

          <Typography variant="subtitle2">Endereço</Typography>
          <Typography variant="body2">{ppd.address}</Typography>
        </>
      )}
    </PageLayout>
  )
}
