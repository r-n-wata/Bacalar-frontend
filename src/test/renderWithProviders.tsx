import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import i18n, { type AppLanguage } from '../app/i18n/config'
import { TestProviders } from './TestProviders'

type RenderWithProvidersOptions = {
  language?: AppLanguage
}

export async function renderWithProviders(
  ui: ReactElement,
  { language = 'en' }: RenderWithProvidersOptions = {},
) {
  await i18n.changeLanguage(language)

  return render(ui, {
    wrapper: TestProviders,
  })
}
