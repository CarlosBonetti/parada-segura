import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import StarIcon from '@material-ui/icons/Star'
import React from 'react'
import { Link } from 'react-router-dom'
import { usePlaces } from '../../api'
import { PageLayout } from '../../components/PageLayout'
import { formatDecimal } from '../../util/i18n'

export function NearbyListingPage() {
  const places = usePlaces()
  const classes = useStyles()

  return (
    <PageLayout>
      <List>
        {places.map((result) => (
          <React.Fragment key={result.id}>
            <ListItem alignItems="flex-start" button component={Link} to={`/place/${result.id}`}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <LocalGasStationIcon color="primary" />
                </Avatar>
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
                          {formatDecimal(result.distance)}km de distância
                        </Typography>
                      </Box>
                    )}
                  </>
                }
              />
              <Box display="flex" alignItems="center" mt={1} ml={1}>
                {result.ratings > 0 && (
                  <>
                    <StarIcon fontSize="small" style={{ color: yellow[700] }} />
                    <Typography variant="caption">{formatDecimal(result.score)}</Typography>
                  </>
                )}
                {result.ratings === 0 && <Typography variant="caption">Não avaliado</Typography>}
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </PageLayout>
  )
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.grey[200],
  },
}))
