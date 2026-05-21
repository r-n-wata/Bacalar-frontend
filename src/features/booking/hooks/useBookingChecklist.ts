import { fetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  bookingChecklistQueryKey,
  getBookingChecklist,
} from '../api/getBookingChecklist'

export function useBookingChecklist() {
  const language = useAppLanguage()

  return fetchApi({
    queryKey: bookingChecklistQueryKey(language),
    queryFn: () => getBookingChecklist(language),
  })
}
