import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
import { restaurantsApiPath } from '../api/getRestaurants'
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

export const restaurantsHandlers = [
  http.get(restaurantsApiPath, async () => {
    return jsonSuccess(restaurants)
  }),
]
