import React from 'react'
import { useParams } from 'react-router-dom'
import { RatingData, sendRating, usePPDs } from '../../api'
import { RatingForm } from './RatingForm'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const pdps = usePPDs()
  const pdp = pdps.find((p) => p.id === placeId)

  const handleRatingSubmit = async (values: RatingData) => {
    await sendRating(placeId, values)
  }

  return (
    <div>
      detail {placeId}
      <pre>
        <code>{JSON.stringify(pdp, null, 2)}</code>
      </pre>
      <RatingForm onSubmit={handleRatingSubmit} />
    </div>
  )
}
