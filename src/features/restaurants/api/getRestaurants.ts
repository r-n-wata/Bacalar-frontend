import { queryKeys } from '../../../lib/queryKeys'
import { simulateRequest } from '../../../services/http'
import type { Restaurant } from '../types/restaurant'

const restaurants: Restaurant[] = [
  {
    id: 'rest-naao',
    name: 'Nao',
    cuisine: 'Seafood',
    vibe: 'Lagoon-facing dinner',
    priceBand: '$$$',
  },
  {
    id: 'rest-ixchel',
    name: 'Ixchel Cocina',
    cuisine: 'Regional Mexican',
    vibe: 'Casual local favorite',
    priceBand: '$$',
  },
  {
    id: 'rest-cielo',
    name: 'Cielo de Maiz',
    cuisine: 'Vegetarian',
    vibe: 'Garden breakfast',
    priceBand: '$$',
  },
]

export const restaurantsQueryKey = queryKeys.restaurants.list()

export function getRestaurants() {
  return simulateRequest(restaurants)
}
