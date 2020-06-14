import { useEffect, useState } from 'react'
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

export interface Place extends FirebasePlace {
  distance: number | null
}

export interface FirebasePlace {
  id: string
  score: number
  ratings: number
  name: string
  coords: Coordinates
  city: string
  highway: string
  km: number
  address: string
}

export const useFirePlaces = (): FirebasePlace[] => {
  const [data, setData] = useState<FirebasePlace[]>([])

  useEffect(() => {
    const refresh = async () => {
      const snapshot = await db.collection('places').get()
      const results = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const docData = doc.data() as FirebasePlace

          const ratingsSnapshot = await doc.ref.collection('ratings').get()
          const scores = ratingsSnapshot.docs.map((doc) => doc.data().score)

          return {
            ...docData,
            id: doc.id,
            ratings: ratingsSnapshot.docs.length,
            score: scores.reduce((sum, curr) => sum + curr, 0) / scores.length,
          }
        })
      )

      setData(results)
    }

    refresh()
  }, [])

  return data
}

export const usePlaces = (): Place[] => {
  const position = usePosition()
  const { coords } = position || {}

  const data = useFirePlaces()

  return data
    .map((d) => ({
      ...d,
      distance: coords ? distance(d.coords, coords) : null,
    }))
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
}

export const usePlace = (placeId: string): Place | null => {
  const places = usePlaces()
  return places.find((place) => place.id === placeId) ?? null
}

export interface Rating extends RatingData {
  id: string
  score: number
}

export interface RatingForm {
  comments: string
  estacionamento: number | null
  banheiro: number | null
  refeitorio: number | null
  infraestrutura: number | null
}

export interface RatingData {
  date: { seconds: number; nanoseconds: number }
  comments: string
  score: number
  estacionamento: number
  banheiro: number
  refeitorio: number
  infraestrutura: number
}

export const usePlaceRatings = (placeId: string) => {
  const [ratings, setRatings] = useState<Rating[]>([])

  useEffect(() => {
    const refresh = async () => {
      const snapshot = await db.collection(`places/${placeId}/ratings`).get()
      const results = snapshot.docs.map((doc) => {
        const data = doc.data() as RatingData
        return {
          ...data,
          id: doc.id,
        }
      })
      setRatings(results)
    }

    refresh()
  }, [placeId])

  return ratings
}

export const sendRating = (placeId: string, rating: RatingForm) => {
  return db.collection(`places/${placeId}/ratings`).add({
    ...rating,
    date: new Date(),
    score:
      [
        rating.banheiro || 0,
        rating.estacionamento || 0,
        rating.infraestrutura || 0,
        rating.refeitorio || 0,
      ].reduce((sum, curr) => sum + curr, 0) / 4,
  })
}
