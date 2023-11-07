'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'

// export const metadata = {
//   title: 'Admin',
//   description: 'Let’s work together. We can’t wait to hear from you.',
// }

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4F46E5' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : provided.boxShadow,
  }),
}

function Table() {
  const [parts, setParts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openDetails, setOpenDetails] = useState(null)
  const [options, setOptions] = useState({})

  const [queryHelper, setQueryHelper] = useState({
    part: '',
    make: '',
    model: '',
    year: '',
    size: '',
  })

  const handleSubmit = async () => {
    // const data = `CREATE (Part:${queryHelper.part})-[HAS_MAKE]->(Make:${queryHelper.make})-[HAS_MODEL]->(Model:${queryHelper.model})-[HAS_YEAR]->(Year:${queryHelper.year})-[HAS_SIZE]->(Size:${queryHelper.size})`
    const data = `CREATE (Part:${Date.now()} { "Type":"${
      queryHelper.part
    }","Make":"${queryHelper.make}", "Model": "${
      queryHelper.model
    }", "Year": "${queryHelper.year}", "Size":"${queryHelper.size}" })`
    const url = 'https://testbe.bangdb.com:18080/graph/adminpanel/query' // Replace with your API endpoint

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-bang-api-key': '5562808906891435869',
        'x-bang-api-src': 'ampere',
      },
      body: data,
    }

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        const { part, make, model, year, size } = queryHelper
        setParts([
          ...parts,
          { Part: part, Make: make, Model: model, Year: year, Size: size },
        ])
        // Handle the response data
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error)
        // Handle the error
      })
  }

  useEffect(() => {
    const fetchData = () => {
      // const query = `s=>(@p1 Part:*)-[@r1 HAS_MAKE]->(@m1 Make:*)-[@r2 HAS_MODEL]->(@m2 Model:*)-[@r3 HAS_YEAR]->(@y1 Year:*)-[@r4 HAS_SIZE]->(@s1 Size:*); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model, y1.name AS Year, s1.name AS Size LIMIT 50`
      const query = `s=>(@p1 Part:*); RETURN *`
      const url = 'https://testbe.bangdb.com:18080/graph/adminpanel/query' // Replace with your API endpoint

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bang-api-key': '5562808906891435869',
          'x-bang-api-src': 'ampere',
        },
        body: query,
      }

      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          const type = new Set()
          const make = new Set()
          const model = new Set()
          const year = new Set()
          const size = new Set()
          data.rows.map((item) => {
            console.log(item)
            if (item.Type) {
              type.add(item.Type)
            }
            if (item.Make) {
              make.add(item.Make)
            }
            if (item.Model) {
              model.add(item.Model)
            }
            if (item.Year) {
              year.add(item.Year)
            }
            if (item.Size) {
              size.add(item.Size)
            }
          })
          setOptions({
            Type: Array.from(type)?.map((item) => ({
              value: item,
              label: item,
            })),
            Make: Array.from(make)?.map((item) => ({
              value: item,
              label: item,
            })),
            Model: Array.from(model)?.map((item) => ({
              value: item,
              label: item,
            })),
            Year: Array.from(year)?.map((item) => ({
              value: item,
              label: item,
            })),
            Size: Array.from(size)?.map((item) => ({
              value: item,
              label: item,
            })),
          })
          setParts(data.rows)
          console.log('POST request was successful:', data)
          // Handle the response data
        })
        .catch((error) => {
          console.error('There was a problem with the POST request:', error)
          // Handle the error
        })
    }
    fetchData()
  }, [])

  const handleCreate = (query, inputValue) => {
    // For the creation of new options
    const newValue = { value: inputValue, label: inputValue }
    setQueryHelper({
      ...queryHelper,
      [query]: inputValue,
    })
  }

  return (
    <>
      {openModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/2 rounded-lg bg-white p-8">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Type
                </label>
                {/* <input
                  type="text"
                  onChange={(e) =>
                    setQueryHelper({
                      ...queryHelper,
                      part: e.target.value,
                    })
                  }
                  className="w-full rounded-md border p-2"
                  placeholder="Enter your Part type"
                /> */}
                <CreatableSelect
                  styles={customStyles}
                  options={options.Type}
                  value={{ value: queryHelper.part, label: queryHelper.part }}
                  onChange={(newVal) =>
                    setQueryHelper({
                      ...queryHelper,
                      part: newVal,
                    })
                  }
                  onCreateOption={(e) => handleCreate('part', e)}
                  isClearable
                  isSearchable
                  placeholder="Select or create a Type"
                  isMulti={false} // Set to true for multiple selections
                  className="react-select-container"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Make
                </label>
                <CreatableSelect
                  styles={customStyles}
                  options={options.Make}
                  value={{ value: queryHelper.make, label: queryHelper.make }}
                  onChange={(newVal) =>
                    setQueryHelper({
                      ...queryHelper,
                      make: newVal,
                    })
                  }
                  onCreateOption={(e) => handleCreate('make', e)}
                  isClearable
                  isSearchable
                  placeholder="Select or create a Make"
                  isMulti={false} // Set to true for multiple selections
                  className="react-select-container"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Model
                </label>
                <CreatableSelect
                  styles={customStyles}
                  options={options.Model}
                  value={{ value: queryHelper.model, label: queryHelper.model }}
                  onChange={(newVal) =>
                    setQueryHelper({
                      ...queryHelper,
                      model: newVal,
                    })
                  }
                  onCreateOption={(e) => handleCreate('model', e)}
                  isClearable
                  isSearchable
                  placeholder="Select or create a Model"
                  isMulti={false} // Set to true for multiple selections
                  className="react-select-container"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Year
                </label>
                <CreatableSelect
                  styles={customStyles}
                  options={options.Year}
                  value={{ value: queryHelper.year, label: queryHelper.year }}
                  onChange={(newVal) =>
                    setQueryHelper({
                      ...queryHelper,
                      year: newVal,
                    })
                  }
                  onCreateOption={(e) => handleCreate('year', e)}
                  isClearable
                  isSearchable
                  placeholder="Select or create a Year"
                  isMulti={false} // Set to true for multiple selections
                  className="react-select-container"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Size
                </label>
                <CreatableSelect
                  styles={customStyles}
                  options={options.Size}
                  value={{ value: queryHelper.size, label: queryHelper.size }}
                  onChange={(newVal) =>
                    setQueryHelper({
                      ...queryHelper,
                      size: newVal,
                    })
                  }
                  onCreateOption={(e) => handleCreate('size', e)}
                  isClearable
                  isSearchable
                  placeholder="Select or create a Size"
                  isMulti={false} // Set to true for multiple selections
                  className="react-select-container"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {openDetails && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/2 rounded-lg bg-white p-8">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenDetails(null)}
                className="text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3">Type:</div>
              <div className="col-span-9">{openDetails?.Type}</div>
              <div className="col-span-3">Make:</div>
              <div className="col-span-9">{openDetails?.Make}</div>
              <div className="col-span-3">Model:</div>
              <div className="col-span-9">{openDetails?.Model}</div>
              <div className="col-span-3">Year:</div>
              <div className="col-span-9">{openDetails?.Year}</div>
              <div className="col-span-3">Size:</div>
              <div className="col-span-9">{openDetails?.Size}</div>
              <div className="col-span-12">
                <button
                  onClick={() => setOpenDetails(null)}
                  className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Used Train Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the parts in your inventory including their
              classifications such as Part, Make, Model, Size, Year etc.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setOpenModal(true)}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Part
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Part
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Make
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Year
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Details</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Disable</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parts.map((part, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {part.Type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.Make}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.Model}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.Year}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {part.Size}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => setOpenDetails(part)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {part.Part}</span>
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => setOpenDetails(part)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Disable<span className="sr-only">, {part.Part}</span>
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => setOpenDetails(part)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete<span className="sr-only">, {part.Part}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Admin() {
  return (
    <>
      <div className="">
        {/* <CenteredForm /> */}
        <Table />
      </div>
    </>
  )
}
