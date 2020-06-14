import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RatingForm, sendRating, usePlace } from '../../api'
import { PageLayout } from '../../components/PageLayout'

export interface RatingPageParams {
  placeId: string
}

const crits = {
  estacionamento: 'Estacionamento',
  banheiro: 'Banheiro e Lavatório',
  refeitorio: 'Refeitório',
  infraestrutura: 'Infraestrutura',
}

export function RatingPage() {
  const { placeId } = useParams()
  const place = usePlace(placeId)
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

  return (
    <PageLayout title={place?.name} backUrl={`/place/${placeId}`}>
      <Container>
        <Box my={2}>
          <Box mb={2}>
            <Typography variant="subtitle2">Avaliar</Typography>

            <Typography variant="body2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nam itaque
              pariatur. Doloremque laboriosam repudiandae quia error assumenda accusantium omnis
              natus beatae numquam sint vitae animi, architecto neque itaque earum!
            </Typography>
          </Box>

          {place && (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {Object.entries(crits).map(([crit, label]) => (
                  <Grid key={crit} item xs={12}>
                    <Box component="fieldset" mb={0.5} borderColor="transparent">
                      <Typography component="legend">{label}</Typography>
                      <Rating
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
                    placeholder="lalal"
                    {...formik.getFieldProps('comments')}
                  />
                </Grid>

                <Grid item container spacing={1} justify="flex-end">
                  <Grid item>
                    <Button onClick={handleCancel}>Cancelar</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Enviar avaliação
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Box>
      </Container>
    </PageLayout>
  )
}
