import { http } from 'msw'
import { jsonSuccess } from '../../../test/msw/core'
import { toursApiPath } from '../api/getTours'
import type { Tour } from '../types/tour'

const tours: Tour[] = [
  {
    id: 'tour-sailing',
    name: 'Private Sailing at Sunrise',
    category: 'Premium',
    durationHours: 4,
    priceFrom: 2100,
  },
  {
    id: 'tour-pontoon',
    name: 'Family Pontoon Loop',
    category: 'Group',
    durationHours: 3,
    priceFrom: 1450,
  },
  {
    id: 'tour-kayak',
    name: 'Guided Mangrove Kayak',
    category: 'Adventure',
    durationHours: 2,
    priceFrom: 680,
  },
]

export const toursHandlers = [
  http.get(toursApiPath, async () => {
    return jsonSuccess(tours)
  }),
]
