import React from 'react'
import { useParams } from 'react-router-dom'
import { usePlaceDetail } from '../../api'

export interface PlaceDetailPageParams {
  placeId: string
}

export function PlaceDetailPage() {
  const { placeId } = useParams()
  const { data } = usePlaceDetail(placeId)

  return (
    <div>
      detail {placeId}
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}
