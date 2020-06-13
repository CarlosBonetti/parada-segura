import { useNearbySearch } from '../../api'
import React from 'react'

export function NearbyListingPage() {
  const { data } = useNearbySearch()

  return (
    <>
      {data &&
        data.results.map((result) => (
          <div key={result.id}>
            <a href={`/place/${result.place_id}`}>{result.name}</a>
          </div>
        ))}
    </>
  )
}
