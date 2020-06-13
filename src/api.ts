import { stringify } from 'qs'
import { useState } from 'react'
import useSWR from 'swr'

const API_KEY = 'AIzaSyAH5v9tlsdmyWngvCTegauuGin1C-C62AA'

const proxy = 'https://cors-anywhere.herokuapp.com'

export const usePosition = () => {
  const [position, setPosition] = useState<Position | null>(null)

  navigator.geolocation.getCurrentPosition((position) => {
    setPosition(position)
  })

  return position
}

export type LatLng = { lat: number; lng: number }

export interface NearbySearchResult {
  status: string
  next_page_token: string
  results: {
    business_status: string
    geometry: {
      location: LatLng
      viewport: {
        northeast: LatLng
        southwest: LatLng
      }
    }
    icon: string
    id: string
    name: string
    opening_hours: { open_now: boolean }
    place_id: string
    plus_code: { compound_code: string; global_code: string }
    rating: number
    reference: string
    scope: string
    types: string[]
    user_ratings_total: number
    vicinity: string
  }[]
}

export const useNearbySearch = () => {
  const position = usePosition()
  const { latitude, longitude } = position?.coords ?? {}

  const params = {
    key: API_KEY,
    language: 'pt-BR',
    location: `${latitude},${longitude}`,
    // radius: '1000',
    rankby: 'distance',
    type: 'restaurant',
    // keyword: 'posto',
    // opennow: true,
    // pagetoken: '',
  }

  const str = stringify(params, { encode: false })

  return useSWR<NearbySearchResult>(
    latitude && longitude
      ? `${proxy}/https://maps.googleapis.com/maps/api/place/nearbysearch/json?${str}`
      : null,
    fetcher
  )
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const usePlaceDetail = (placeId: string) => {
  const params = {
    key: API_KEY,
    language: 'pt-BR',
    place_id: placeId,
    fields:
      'name,business_status,formatted_address,geometry,icon,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,address_component,adr_address',
  }
  const str = stringify(params, { encode: false })

  return useSWR(`${proxy}/https://maps.googleapis.com/maps/api/place/details/json?${str}`, fetcher)
}
