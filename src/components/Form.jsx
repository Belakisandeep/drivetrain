'use client'

import { formData } from '@/lib/formData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Dropdown from './Dropdown'

const FormComponent = () => {
  const router = useRouter()
  const [formSelections, setFormSelections] = useState({
    part: '',
    make: '',
    model: '',
    year: '',
    size: '',
  })

  function capitalizeAfterSpace(input) {
    return input.replace(
      /(?:^|\s)([a-z])/g,
      (_, match) => ` ${match.toUpperCase()}`
    )
  }

  const sendPartOne = async (part, make, model, year, size) => {
    const _id = decodeURIComponent(document.cookie)
      .split(';')
      .filter((x) => x.includes('_pk_id.used-engines-drivetrain.us'))[0]
      .split('=')[1]
      .split('.')[0]
    const payloadOne = {
      _id,
      e_a: 'Quote1',
      e_c: 'Quote1',
      e_n: 'Quote1',
      e_v: {
        Year: year,
        Make: make,
        Model: model,
        Size: size,
        Part: part,
      },
    }
    const bdb = await fetch(
      'https://javeed.bangdb.com:18080/stream/used_engines_drivetrain/Data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bang-api-key': '2863199089451966548',
        },
        body: JSON.stringify(payloadOne),
      }
    )
    if (bdb) {
      router.push(`/search/${part}/${make}/${model}/${year}/${size}`)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <form className="mb-4 grid grid-cols-12 gap-1 rounded bg-white px-8 pb-8 pt-6 shadow-md sm:min-w-[450px] sm:gap-4">
        <div className="col-span-12">
          <p className="mt-2 text-neutral-600">
            Find your <span className="text-orange-400"> Car Part</span>
          </p>
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          {/* <Dropdown /> */}
          <select
            name="part"
            id="id_part"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            required=""
            defaultValue=""
            onChange={(e) => {
              setFormSelections((prev) => ({
                ...prev,
                part: e.target.value,
                make: '',
                model: '',
                year: '',
                size: '',
              }))
            }}
          >
            <option value="">- Select Part -</option>
            {Object.keys(formData).map((part) => (
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
            required=""
            defaultValue=""
            disabled={formSelections.part === ''}
            data-gtm-form-interact-field-id="0"
            onChange={(e) => {
              setFormSelections((prev) => ({
                ...prev,
                make: e.target.value,
                model: '',
                year: '',
                size: '',
              }))
            }}
          >
            <option value="">- Select Make -</option>
            {Object.keys(formData[formSelections.part] || {}).map((make) => (
              <option key={make} value={make}>
                {capitalizeAfterSpace(
                  make.replace(/_/g, ' ').replace(/-/g, ' ')
                )}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          {Object.keys(
            formData[formSelections.part]?.[formSelections.make] || {}
          ).length === 0 ? (
            <input
              disabled={formSelections.make === ''}
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
              required=""
              defaultValue=""
              disabled={formSelections.make === ''}
              data-gtm-form-interact-field-id="0"
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  model: e.target.value,
                  year: '',
                  size: '',
                }))
              }}
            >
              <option value="">- Select model -</option>
              {Object.keys(
                formData[formSelections.part]?.[formSelections.make] || {}
              ).map((model) => (
                <option key={model} value={model}>
                  {capitalizeAfterSpace(
                    model.replace(/-/g, ' ').replace(/_/g, ' ')
                  )}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* <div className="col-span-12 mb-4 sm:col-span-12">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            id="model"
            type="text"
            placeholder="Model"
          />
        </div> */}
        <div className="col-span-12 mb-4 sm:col-span-12">
          {Object.keys(
            formData[formSelections.part]?.[formSelections.make]?.[
              formSelections.model
            ] || {}
          ).length === 0 ? (
            <input
              disabled={formSelections.model === ''}
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
              id="id_year"
              disabled={formSelections.model === ''}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              required=""
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  year: e.target.value,
                  size: '',
                }))
              }}
              defaultValue="Not Selected"
            >
              <option value="Not Selected">- Select Engine Year -</option>
              {Object.keys(
                formData[formSelections.part]?.[formSelections.make]?.[
                  formSelections.model
                ] || {}
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-span-12 mb-4 sm:col-span-12">
          {/* <input
            disabled={formSelections.year === ''}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
            onChange={(e) => {
              setFormSelections((prev) => ({
                ...prev,
                size: e.target.value,
              }))
            }}
            placeholder="Select Option"
          /> */}
          {(
            formData[formSelections.part]?.[formSelections.make]?.[
              formSelections.model
            ]?.[formSelections.year] || []
          ).length === 0 ? (
            <input
              disabled={formSelections.year === ''}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }}
              placeholder="Select Option"
            />
          ) : (
            <select
              name="size"
              id="id_size"
              disabled={formSelections.year === ''}
              onChange={(e) => {
                setFormSelections((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-orange-400 focus:outline-none"
              defaultValue=""
            >
              <option value="">- Select Option -</option>
              {(
                formData[formSelections.part]?.[formSelections.make]?.[
                  formSelections.model
                ]?.[formSelections.year] || []
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
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
              sendPartOne(part, make, model, year, size)
              // router.push(`/search/${part}/${make}/${model}/${year}/${size}`)
            }}
            // href={{ pathname: '/search', query: formSelections }}
            disabled={
              formSelections.make === '' ||
              formSelections.model === '' ||
              formSelections.part === '' ||
              formSelections.size === '' ||
              formSelections.year === ''
            }
            className="focus:shadow-outline w-full rounded bg-orange-400 px-4 py-2 text-center font-bold text-white hover:bg-orange-700 focus:outline-none"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormComponent
