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
import StarIcon from '@material-ui/icons/Star'
import React from 'react'
import { Rating } from '../../api'
import { formatDate } from '../../util/i18n'

export interface PlaceRatingsListProps {
  ratings: Rating[]
}

const formatRatingDate = ({ seconds }: any) => {
  const date = new Date(1970, 0, 1)
  date.setSeconds(seconds)
  return formatDate(date)
}

export function PlaceRatingsList({ ratings }: PlaceRatingsListProps) {
  return (
    <List>
      {ratings.map((rating) => (
        <React.Fragment key={rating.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>AN</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Anônimo"
              secondaryTypographyProps={{ component: 'div' }}
              secondary={
                <>
                  <Typography variant="body2">{formatRatingDate(rating.date)}</Typography>
                  <Typography variant="body2">{rating.comments}</Typography>
                </>
              }
            />
            <Box display="flex" alignItems="center" mt={0.5} ml={1}>
              <StarIcon fontSize="small" style={{ color: yellow[700] }} />
              <Typography variant="caption">{rating.score}</Typography>
            </Box>
          </ListItem>
          <Divider variant="inset" />
        </React.Fragment>
      ))}
    </List>
  )
}
