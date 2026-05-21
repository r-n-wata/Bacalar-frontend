import type { AppLanguage } from '../../../app/i18n/config'
import { queryKeys } from '../../../lib/queryKeys'
import { getJson } from '../../../services/http'
import type { HomeContent } from '../types/home-content'

export const homeApiPath = '/api/home'

export const homeQueryKey = (language: AppLanguage) =>
  queryKeys.home.content(language)

export function getHomeContent(language: AppLanguage) {
  return getJson<HomeContent>(homeApiPath, { language })
}
