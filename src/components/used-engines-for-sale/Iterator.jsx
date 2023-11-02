'use client'

import React, { useContext } from 'react'
import { RootLayoutContext } from '../RootLayout'
import { capitalizeAfterSpace } from './Form'

function Iterator() {
  let {
    formSelections,
    setFormSelections,
    options,
    setOptions,
    formDataLoc,
    setFormData,
  } = useContext(RootLayoutContext)
  return (
    <div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-6 py-7 lg:px-8">
        {options?.make?.map((item) => (
          <div className="rounded-full border-2 px-3 py-1" key={item}>
            <a
              href="#top"
              onClick={async () => {
                setFormSelections((prev) => ({
                  ...prev,
                  make: item,
                  model: '',
                  year: '',
                  size: '',
                }))
                const data = await fetch(
                  `/api/formData/${formSelections.part}/${item}`
                )
                const temp = await data.json()
                if (temp.success) {
                  setOptions((prev) => ({
                    ...prev,
                    model: temp.success,
                    year: [],
                    option: [],
                  }))
                } else {
                  setOptions((prev) => ({
                    ...prev,
                    model: [],
                    year: [],
                    option: [],
                  }))
                }
              }}
            >
              <p>
                {capitalizeAfterSpace(
                  item.replace(/_/g, ' ').replace(/-/g, ' ')
                )}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Iterator
