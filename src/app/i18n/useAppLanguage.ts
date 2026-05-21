import { useTranslation } from 'react-i18next'
import type { AppLanguage } from './config'

export function useAppLanguage(): AppLanguage {
  const { i18n } = useTranslation()

  return i18n.resolvedLanguage === 'es' ? 'es' : 'en'
}
