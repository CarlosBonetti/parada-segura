import { Button, FormControl, InputLabel, Select } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { RatingData } from '../../api'

export interface RatingFormProps {
  onSubmit(values: RatingData): any
}

export function RatingForm({ onSubmit }: RatingFormProps) {
  const formik = useFormik<RatingData>({
    initialValues: {
      score: 5,
    },
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="score">Avaliação</InputLabel>
        <Select id="score" native {...formik.getFieldProps('score')}>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Enviar avaliação
      </Button>
    </form>
  )
}
