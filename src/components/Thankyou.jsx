'use client'

import { useContext } from 'react'
import { RootLayoutContext } from './RootLayout'
import { capitalizeAfterSpace } from './used-engines-for-sale/Form'

export function PartAvailability() {
  let {
    formSelections,
    setFormSelections,
    options,
    setOptions,
    formDataLoc,
    setFormData,
  } = useContext(RootLayoutContext)
  return (
    <p className="mt-4 font-display text-lg sm:text-2xl">
      The{' '}
      <span className="font-bold text-orange-400">
        {formSelections.year}{' '}
        {capitalizeAfterSpace(
          formSelections.make.replace(/_/g, ' ').replace(/-/g, ' ')
        )}{' '}
        {capitalizeAfterSpace(
          formSelections.model.replace(/_/g, ' ').replace(/-/g, ' ')
        )}{' '}
        {formSelections.part}
      </span>{' '}
      is available. Call us now to get your free instant quote.
    </p>
  )
}
