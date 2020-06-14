import { useEffect, useState, useMemo } from 'react'
import { db } from './firebase'
import { distance, usePosition } from './position'
import initialPdps from './pdps.json'

export const populate = async () => {
  const placesRef = db.collection('places')
  await Promise.all(initialPdps.map(async (pdp: any) => await placesRef.add(pdp)))
  console.log('Finished populating')
}

// populate()

export const API_KEY = 'AIzaSyAH5v9tlsdmyWngvCTegauuGin1C-C62AA'

// export const usePlaceDetail = (placeId: string) => {
//   const params = {
//     key: API_KEY,
//     language: 'pt-BR',
//     place_id: placeId,
//     fields:
//       'name,business_status,formatted_address,geometry,icon,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,address_component,adr_address',
//   }
//   const str = stringify(params, { encode: false })

//   return useSWR(`${proxy}/https://maps.googleapis.com/maps/api/place/details/json?${str}`, fetcher)
// }

export interface Place extends PlaceDocument {
  distance: number | null
  score: number | null
  ratings: RatingDocument[]
}

export interface PlaceDocument {
  id: string
  name: string
  coords: Coordinates
  city: string
  highway: string
  km: number
  address: string
}

export interface RatingDocument {
  id: string
  place: any
  date: { seconds: number; nanoseconds: number }
  comments: string
  score: number
  estacionamento: number
  banheiro: number
  refeitorio: number
  infraestrutura: number
}

export interface RatingForm {
  comments: string
  estacionamento: number | null
  banheiro: number | null
  refeitorio: number | null
  infraestrutura: number | null
}

export const usePlaces = () => {
  const position = usePosition()
  const coords = position?.coords || null
  const places = useFirebaseCollection<PlaceDocument>('places')
  const ratings = useFirebaseCollection<RatingDocument>('ratings')

  const result = useMemo(() => {
    return places
      .map((place) => {
        const placeRatings = ratings.filter((rating) => rating.place.id === place.id)
        return {
          ...place,
          distance: coords ? distance(place.coords, coords) : null,
          ratings: placeRatings,
          score: placeRatings.reduce((sum, rating) => sum + rating.score, 0) / placeRatings.length,
        }
      })
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
  }, [coords, places, ratings])

  return result
}

export const useFirebaseCollection = <T extends { id: string }>(path: string): T[] => {
  const [results, setResults] = useState<T[]>([])

  useEffect(() => {
    return db.collection(path).onSnapshot((snapshot) => {
      const results = snapshot.docs.map((doc) => {
        const data = doc.data() as T
        return { ...data, id: doc.id }
      })
      setResults(results)
    })
  }, [path])

  return results
}

export const sendRating = (placeId: string, rating: RatingForm) => {
  return db.collection(`ratings`).add({
    ...rating,
    date: new Date(),
    place: db.doc(`places/${placeId}`),
    score:
      [
        rating.banheiro || 0,
        rating.estacionamento || 0,
        rating.infraestrutura || 0,
        rating.refeitorio || 0,
      ].reduce((sum, curr) => sum + curr, 0) / 4,
  })
}
