import { useQuery } from '@tanstack/react-query'
import {
  bookingChecklistQueryKey,
  getBookingChecklist,
} from '../api/getBookingChecklist'

export function useBookingChecklist() {
  return useQuery({
    queryKey: bookingChecklistQueryKey,
    queryFn: getBookingChecklist,
  })
}
