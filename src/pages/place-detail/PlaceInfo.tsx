import { Container, Box, Typography } from '@material-ui/core'
import React from 'react'

export function PlaceInfo() {
  return (
    <Container>
      <Box my={2}>
        <Typography variant="subtitle2">Sobre o PPD</Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore necessitatibus ipsam
          itaque consequatur blanditiis nesciunt expedita voluptatem aperiam. Alias, quas rem! Optio
          dolorum sit nihil earum excepturi quam similique mollitia?
        </Typography>
      </Box>
    </Container>
  )
}
