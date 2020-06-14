import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import React from 'react'
import { Link } from 'react-router-dom'
import { Place, Rating } from '../../api'
import { formatDecimal } from '../../util/i18n'
import { PlaceRatingList } from './PlaceRatingList'

export interface PlaceRating {
  place: Place
  ratings: Rating[]
}

export function PlaceRating({ place, ratings }: PlaceRating) {
  const score = ratings.reduce((curr, s) => curr + s.score, 0) / (ratings.length || 1)

  return (
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
              variant="contained"
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
            <Typography variant="body2">Nenhum comentário. Seja o primeiro a avaliar!</Typography>
          )}

          {ratings.length > 0 && <PlaceRatingList ratings={ratings} />}
        </Box>
      </Box>
    </Container>
  )
}
