import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import StarIcon from '@material-ui/icons/Star'
import React from 'react'
import { useNearbySearch } from '../../api'
import { humanizeDistance } from '../../position'

export function NearbyListingPage() {
  const { data } = useNearbySearch()

  return (
    <List>
      {data &&
        data.results.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem
              alignItems="flex-start"
              button
              component="a"
              href={`/place/${result.place_id}`}
            >
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src={result.icon} />
              </ListItemAvatar>
              <ListItemText
                primary={result.name}
                secondaryTypographyProps={{ component: 'div' }}
                secondary={
                  <>
                    <Typography variant="body2" color="textPrimary">
                      {result.vicinity}
                    </Typography>
                    <Typography variant="body2">
                      {humanizeDistance(result.distance)} de distância
                    </Typography>

                    {result.types?.length && (
                      <Box mt={1}>
                        {result.types.map((type) => (
                          <Box key={type} mr={0.25} my={0.25} display="inline-flex">
                            <Chip label={type} size="small" />
                          </Box>
                        ))}
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
  )
}
