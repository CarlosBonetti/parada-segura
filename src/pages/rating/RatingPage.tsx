import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Place, RatingForm, sendRating } from '../../api'
import { PageLayout } from '../../components/PageLayout'

export interface RatingPageParams {
  placeId: string
}

export interface RatingPageProps {
  places: Place[]
}

const crits = {
  estacionamento: 'Estacionamento',
  banheiro: 'Banheiro e Lavatório',
  refeitorio: 'Refeitório',
  infraestrutura: 'Infraestrutura',
}

export function RatingPage({ places }: RatingPageProps) {
  const { placeId } = useParams()
  const place = places.find((p) => p.id === placeId)
  const history = useHistory()

  const formik = useFormik<RatingForm>({
    initialValues: {
      comments: '',
      estacionamento: null,
      banheiro: null,
      refeitorio: null,
      infraestrutura: null,
    },
    onSubmit: async (values: RatingForm) => {
      await sendRating(placeId, values)
      history.replace(`/place/${placeId}`)
    },
  })

  const handleCancel = () => history.replace(`/place/${placeId}`)

  const isValid = Object.keys(crits).every((crit) => !!(formik.values as any)[crit])

  return (
    <PageLayout title={place?.name} backUrl={`/place/${placeId}`}>
      <Container>
        <Box my={2}>
          <Box mb={2}>
            <Typography variant="subtitle2">Avaliar</Typography>

            <Typography variant="body2">Avalie aqui sua experiência no estabelecimento.</Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {Object.entries(crits).map(([crit, label]) => (
                <Grid key={crit} item xs={12}>
                  <Box component="fieldset" mb={0.5} borderColor="transparent">
                    <Typography component="legend">{label}</Typography>
                    <Rating
                      size="large"
                      name={crit}
                      value={parseInt((formik.values as any)[crit])}
                      onChange={(event, newValue) => {
                        formik.setFieldValue(crit, newValue)
                      }}
                    />
                  </Box>
                  <Divider />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  label="Comentários"
                  fullWidth
                  multiline
                  variant="outlined"
                  {...formik.getFieldProps('comments')}
                />
              </Grid>

              <Grid item container spacing={1} justify="flex-end">
                <Grid item>
                  <Button onClick={handleCancel}>Cancelar</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" type="submit" disabled={!isValid}>
                    Enviar avaliação
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </PageLayout>
  )
}
