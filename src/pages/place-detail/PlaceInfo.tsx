import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import React from 'react'

export function PlaceInfo() {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemText primary="Horário de funcionamento" secondary="Atendimento 24h" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Serviço e estrutura"
            secondaryTypographyProps={{ component: 'div' }}
            secondary={
              <>
                <Typography variant="body2">Serviço completo de abastecimento</Typography>
                <Typography variant="body2">Troca de óleo</Typography>
                <Typography variant="body2">Restaurante buffet</Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </Container>
  )
}
