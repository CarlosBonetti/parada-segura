import { useState } from 'react'

export function distance(coords1: Coordinates, coords2: Coordinates) {
  const { latitude: lat1, longitude: lng1 } = coords1
  const { latitude: lat2, longitude: lng2 } = coords2
  const p = 0.017453292519943295 // Math.PI / 180
  const c = Math.cos
  const a =
    0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))) / 2

  return 12742 * Math.asin(Math.sqrt(a))
}

export const usePosition = () => {
  const [position, setPosition] = useState<Position | null>(null)

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setPosition(position)
    },
    (error) => {
      console.error(error)
    }
  )

  return position
}

const numberFormatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

export const humanizeDistance = (distance: number) => {
  return `${numberFormatter.format(distance)}km`
}
