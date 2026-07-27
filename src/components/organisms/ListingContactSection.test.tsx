import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { ListingContactSection } from './ListingContactSection'

const trackCustomEventMock = vi.fn()

vi.mock('../../services/analytics', () => ({
  trackCustomEvent: (...args: unknown[]) => trackCustomEventMock(...args),
}))

describe('ListingContactSection', () => {
  it('renders a unified business card with initials and fixed supporting copy', async () => {
    await renderWithProviders(
      <ListingContactSection
        contact={{
          providerName: 'Laguna Vela',
          whatsapp: '+52 983 123 4567',
          website: 'lagunavela.example.com',
        }}
        listingId="tour-sailing"
        listingType="tours"
        listingName="Private Sailing at Sunrise"
        currentLanguage="en"
        eyebrow="Provided by"
      />,
    )

    expect(screen.getByText('LV')).toBeVisible()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Laguna Vela' }),
    ).toBeVisible()
    expect(screen.getByText('Provided by')).toBeVisible()
    expect(
      screen.getByText(
        'Contact the operator directly for pricing, availability and questions',
      ),
    ).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'WhatsApp' })[0]).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Website' })[0]).toBeVisible()
  })

  it('preserves analytics wiring for contact actions', async () => {
    trackCustomEventMock.mockClear()

    await renderWithProviders(
      <ListingContactSection
        contact={{
          providerName: 'Laguna Vela',
          whatsapp: '+52 983 123 4567',
        }}
        listingId="tour-sailing"
        listingType="tours"
        listingName="Private Sailing at Sunrise"
        currentLanguage="en"
      />,
    )

    fireEvent.click(screen.getAllByRole('link', { name: 'WhatsApp' })[0])

    expect(trackCustomEventMock).toHaveBeenCalledWith('whatsapp_clicked', {
      listingId: 'tour-sailing',
      listingType: 'tours',
      listingName: 'Private Sailing at Sunrise',
      providerName: 'Laguna Vela',
      currentLanguage: 'en',
    })
  })

  it('renders the profile card without actions when no contact methods are available', async () => {
    await renderWithProviders(
      <ListingContactSection
        contact={{
          providerName: 'Manglar Guides',
        }}
        listingId="tour-kayak"
        listingType="tours"
        listingName="Guided Mangrove Kayak"
        currentLanguage="en"
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Manglar Guides' }),
    ).toBeVisible()
    expect(
      screen.getByText(
        'Contact the operator directly for pricing, availability and questions',
      ),
    ).toBeVisible()
    expect(screen.queryByRole('link', { name: 'WhatsApp' })).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Quick contact actions'),
    ).not.toBeInTheDocument()
  })
})
