import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import StarIcon from '@material-ui/icons/Star'
import React from 'react'
import { Link } from 'react-router-dom'
import { usePlaces } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import { humanizeDistance } from '../../position'

export function NearbyListingPage() {
  const ppds = usePlaces()

  return (
    <PageLayout>
      <List>
        {ppds.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem alignItems="flex-start" button component={Link} to={`/place/${result.id}`}>
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={result.name}
                secondaryTypographyProps={{ component: 'div' }}
                secondary={
                  <>
                    <Typography variant="body2" color="textPrimary">
                      {result.highway} | km {result.km}
                    </Typography>

                    <Typography variant="body2">{result.city}</Typography>

                    {result.distance && (
                      <Box display="inline-flex" alignItems="center" mt={0.5}>
                        <LocalShippingIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle2" style={{ marginLeft: '0.25rem' }}>
                          {humanizeDistance(result.distance)} de distância
                        </Typography>
                      </Box>
                    )}
                  </>
                }
              />
              {result.rating && (
                <Box display="flex" alignItems="center" mt={1} ml={1}>
                  <StarIcon fontSize="small" style={{ color: yellow[600] }} />
                  <Typography variant="caption">{result.rating}</Typography>
                </Box>
              )}
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </PageLayout>
  )
}
