import { useEffect, useState } from 'react'
import { db } from './firebase'
import { distance, usePosition } from './position'
import initialPdps from './pdps.json'

export const populate = async () => {
  const pdpsRef = db.collection('ppds')
  await Promise.all(initialPdps.map(async (pdp: any) => await pdpsRef.add(pdp)))
  console.log('Finished populating')
}

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

export interface PPD extends PPDData {
  distance: number
  rating: number
}

export interface PPDData {
  id: string
  name: string
  coords: Coordinates
  city: string
  highway: string
  km: number
  address: string
}

export const usePDPData = () => {
  const [data, setData] = useState<PPDData[]>([])

  useEffect(() => {
    db.collection('ppds')
      .get()
      .then((querySnapshot) => {
        const results = querySnapshot.docs.map((doc) => {
          const docData = doc.data() as PPDData
          return {
            ...docData,
            id: doc.id,
          }
        })

        setData(results)
      })
  }, [])

  return data
}

export const usePPDs = () => {
  const position = usePosition()
  const { coords } = position || {}

  const data = usePDPData()

  return data
    .map((d) => ({
      ...d,
      rating: 5,
      distance: coords ? distance(d.coords, coords) : null,
    }))
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
}

export interface RatingData {
  score: number
}

export const sendRating = (placeId: string, rating: RatingData) => {
  return db.collection(`ppds/${placeId}/ratings`).add(rating)
}
