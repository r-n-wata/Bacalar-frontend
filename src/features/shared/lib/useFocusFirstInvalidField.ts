import { useEffect, useRef } from 'react'

type FocusableElement = HTMLElement & {
  focus: (options?: FocusOptions) => void
}

type FieldErrors<TField extends string> = Partial<Record<TField, string>>

export function useFocusFirstInvalidField<TField extends string>(
  fieldErrors: FieldErrors<TField>,
  fieldOrder: readonly TField[],
) {
  const fieldRefs = useRef<Partial<Record<TField, FocusableElement | null>>>({})

  function registerFieldRef(field: TField) {
    return (element: FocusableElement | null) => {
      fieldRefs.current[field] = element
    }
  }

  useEffect(() => {
    const firstInvalidField = fieldOrder.find((field) => Boolean(fieldErrors[field]))

    if (!firstInvalidField) {
      return
    }

    const element = fieldRefs.current[firstInvalidField]

    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
    element.focus({ preventScroll: true })
  }, [fieldErrors, fieldOrder])

  return registerFieldRef
}
