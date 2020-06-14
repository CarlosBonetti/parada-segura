import { Button, FormControl, InputLabel, Select, Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { RatingData, sendRating, usePlace } from '../../api'
import { PageLayout } from '../../components/PageLayout'

export interface RatingPageParams {
  placeId: string
}

export function RatingPage() {
  const { placeId } = useParams()
  const place = usePlace(placeId)
  const history = useHistory()

  const formik = useFormik<RatingData>({
    initialValues: {
      score: 5,
      comments: '',
    },
    onSubmit: async (values: RatingData) => {
      await sendRating(placeId, values)
      history.replace(`/place/${placeId}`)
    },
  })

  const handleCancel = () => history.replace(`/place/${placeId}`)

  return (
    <PageLayout title={place?.name}>
      {place && (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="score">Avaliação</InputLabel>
                <Select id="score" native {...formik.getFieldProps('score')}>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Comentários"
                fullWidth
                multiline
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
    </PageLayout>
  )
}
