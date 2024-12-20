'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { RootLayoutContext } from '@/components/RootLayout'
import FormComponent from '../Form'

export function capitalizeAfterSpace(input) {
  return input.replace(
    /(?:^|\s)([a-z])/g,
    (_, match) => ` ${match.toUpperCase()}`
  )
}

const EngineForm = ({ part = 'Part' }) => {
  const router = useRouter()

  let {
    formSelections,
    setFormSelections,
    options,
    setOptions,
    formDataLoc,
    setFormData,
  } = useContext(RootLayoutContext)

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('/api/formData')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'number' && (parseInt(value) <= 9999999999 || value === '')) {
      if (value[0] === '0' || value[0] === '1') {
        setErrors({ number: 'Please dont enter country code' })
        setFormData((prevData) => ({ ...prevData, [name]: value }))
      } else {
        setErrors({})
        setFormData((prevData) => ({ ...prevData, [name]: value }))
      }
    } else if (name !== 'number') {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const validationErrors = validateForm(formDataLoc)
    if (Object.keys(validationErrors).length === 0) {
      const _id = decodeURIComponent(document.cookie)
        ?.split(';')
        ?.filter((x) => x.includes('_pk_id.used-engines-drivetrain.us'))?.[0]
        ?.split('=')[1]
        ?.split('.')[0]
      const payload = {
        Year: formSelections.year,
        Make: formSelections.make,
        Model: formSelections.model,
        // Size: formSelections.size,
        Part: formSelections.part,
        // Name: formDataLoc.name,
        Phone: formDataLoc.number,
        // Email: formDataLoc.email,
        _id,
      }
      const mail = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (mail) {
        router.push('/thankyou')
      }

      // fetch(
      //   'https://javeed.bangdb.com:18080/stream/used_engines_drivetrain/Leads_Data',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-bang-api-key': '2863199089451966548',
      //     },
      //     body: JSON.stringify(payload),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => router.push('/thankyou'))
      //   .catch((error) => console.error('Error:', error))
    } else {
      setErrors(validationErrors)
    }
    setLoading(false)
  }

  const validateForm = (data) => {
    const errors = {}
    // if (!data.name) {
    //   errors.name = 'Name is required'
    // }
    if (!data.number) {
      errors.number = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(data.number)) {
      errors.number = 'Mobile number should be 10 digits'
    }
    // if (!data.email) {
    //   errors.email = 'Email is required'
    // } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   errors.email = 'Please provide valid email'
    // }
    return errors
  }

  const setter = async () => {
    setFormSelections((prev) => ({
      ...prev,
      part: 'Engine',
      make: '',
      model: '',
      year: '',
      size: '',
    }))
    const data = await fetch(`/api/formData/Engine`)
    const temp = await data.json()
    if (temp.success) {
      setOptions((prev) => ({
        ...prev,
        make: temp.success,
        model: [],
        year: [],
        option: [],
      }))
    } else {
      setOptions((prev) => ({
        ...prev,
        make: [],
        model: [],
        year: [],
        option: [],
      }))
    }
  }

  useEffect(() => {
    if (formSelections.part === '') {
      setter()
    }
  }, [formSelections.part])

  return (
    <div id="top" className="mx-auto w-full max-w-xl">
      <FormComponent part="Engine" />
      <form
        id="quote-form"
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-12 gap-1 rounded bg-white px-8 pb-8 pt-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:min-w-[450px] sm:gap-4"
      >
        <div className="col-span-12 text-center">
          <h1 className="mx-auto mt-2 text-2xl font-bold text-neutral-600">
            Find my Engine
          </h1>
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          <select
            name="part"
            id="id_part"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            required
            defaultValue={
              formSelections.part === '' ? 'Engine' : formSelections.part
            }
            value={formSelections.part === '' ? 'Engine' : formSelections.part}
            onChange={async (e) => {
              setFormSelections((prev) => ({
                ...prev,
                part: e.target.value,
                make: '',
                model: '',
                year: '',
                size: '',
              }))
              const data = await fetch(`/api/formData/${e.target.value}`)
              const temp = await data.json()
              if (temp.success) {
                setOptions((prev) => ({
                  ...prev,
                  make: temp.success,
                  model: [],
                  year: [],
                  option: [],
                }))
              } else {
                setOptions((prev) => ({
                  ...prev,
                  make: [],
                  model: [],
                  year: [],
                  option: [],
                }))
              }
            }}
          >
            <option value="">- Select Part -</option>
            {options.part.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          <select
            name="make"
            id="id_make"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            required
            defaultValue={formSelections.make}
            value={formSelections.make}
            disabled={formSelections.part === ''}
            data-gtm-form-interact-field-id="0"
            onChange={async (e) => {
              setFormSelections((prev) => ({
                ...prev,
                make: e.target.value,
                model: '',
                year: '',
                size: '',
              }))
              const data = await fetch(
                `/api/formData/${formSelections.part}/${e.target.value}`
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
            <option value="">- Select Make -</option>
            {options.make.map((make) => (
              <option key={make} value={make}>
                {capitalizeAfterSpace(
                  make.replace(/_/g, ' ').replace(/-/g, ' ')
                )}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          {options.model.length === 0 ? (
            <input
              disabled={formSelections.make === ''}
              defaultValue={formSelections.model}
              value={formSelections.model}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  model: e.target.value,
                  year: '',
                  size: '',
                }))
              }}
              placeholder="Model"
            />
          ) : (
            <select
              name="model"
              id="id_model"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              required
              defaultValue={formSelections.model}
              value={formSelections.model}
              disabled={formSelections.make === ''}
              data-gtm-form-interact-field-id="0"
              onChange={async (e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  model: e.target.value,
                  year: '',
                  size: '',
                }))
                const data = await fetch(
                  `/api/formData/${formSelections.part}/${formSelections.make}/${e.target.value}`
                )
                const temp = await data.json()
                if (temp.success) {
                  setOptions((prev) => ({
                    ...prev,
                    year: temp.success,
                    option: [],
                  }))
                } else {
                  setOptions((prev) => ({
                    ...prev,
                    year: [],
                    option: [],
                  }))
                }
              }}
            >
              <option value="">- Select model -</option>
              {options.model.map((model) => (
                <option key={model} value={model}>
                  {capitalizeAfterSpace(
                    model.replace(/-/g, ' ').replace(/_/g, ' ')
                  )}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          {options.year.length === 0 ? (
            <input
              disabled={formSelections.model === ''}
              defaultValue={formSelections.year}
              value={formSelections.year}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  year: e.target.value,
                  size: '',
                }))
              }}
              placeholder="Engine Year"
            />
          ) : (
            <select
              name="year"
              defaultValue={formSelections.year}
              value={formSelections.year}
              id="id_year"
              disabled={formSelections.model === ''}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              required
              onChange={async (e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  year: e.target.value,
                  size: '',
                }))
                const data = await fetch(
                  `/api/formData/${formSelections.part}/${formSelections.make}/${formSelections.model}/${e.target.value}`
                )
                const temp = await data.json()
                if (temp.success) {
                  setOptions((prev) => ({
                    ...prev,
                    option: temp.success,
                  }))
                } else {
                  setOptions((prev) => ({
                    ...prev,
                    option: [],
                  }))
                }
              }}
            >
              <option value="Not Selected">- Select Engine Year -</option>
              {options.year.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            id="number"
            type="number"
            name="number"
            required
            onKeyDown={(evt) => {
              '0123456789'.indexOf(evt.key) < 0 &&
                !['ArrowLeft', 'Backspace', 'ArrowRight', 'Delete'].includes(
                  evt.key
                ) &&
                evt.preventDefault()
            }}
            value={formDataLoc.number}
            onChange={handleChange}
            placeholder="Phone Number (Get quote via Text)"
          />
          {errors.number && (
            <p className="pl-2 text-xs text-red-600">{errors.number}</p>
          )}
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          <input
            className="focus:shadow-outline appearance-none w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
            value={formDataLoc.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-12 flex items-center justify-between">
          <button
            onClick={() => {
              const part = formSelections.part
                .replace(/ /g, '_')
                .replace(/-/g, '_')
              const make = formSelections.make
                .replace(/ /g, '_')
                .replace(/-/g, '_')
              const model = formSelections.model
                .replace(/ /g, '_')
                .replace(/-/g, '_')
              const year = formSelections.year
                .replace(/ /g, '_')
                .replace(/-/g, '_')
              const size = formSelections.size
                .replace(/ /g, '_')
                .replace(/-/g, '_')
              router.push(`/search/${part}/${make}/${model}/${year}/${size}`)
            }}
            href={{ pathname: '/search', query: formSelections }}
            disabled={
              formSelections.make === '' ||
              formSelections.model === '' ||
              formSelections.part === '' ||
              formSelections.size === '' ||
              formSelections.year === ''
            }

            className="focus:shadow-outline flex max-h-20 w-full appearance-none items-center justify-around rounded bg-orange-400 px-4 py-2 text-center font-bold text-white hover:bg-orange-700 focus:outline-none"
            type="submit"
          >
            {loading ? (
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="currentColor"
                  strokeWidth={4}
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Check Availability'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EngineForm
