import { fetchApi } from '../../../app/hooks/fetchApi'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import {
  getRestaurants,
  restaurantsQueryKey,
} from '../api/getRestaurants'

export function useRestaurants() {
  const language = useAppLanguage()

  return fetchApi({
    queryKey: restaurantsQueryKey(language),
    queryFn: () => getRestaurants(language),
  })
}
