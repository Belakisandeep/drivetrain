'use client'

import { useState } from 'react'

export const metadata = {
  title: 'Admin',
  description: 'Let’s work together. We can’t wait to hear from you.',
}

const CenteredForm = () => {
  const [queryHelper, setQueryHelper] = useState({
    part: '',
    make: '',
    model: '',
    year: '',
    size: '',
  })

  const handleSubmit = async () => {
    const data = `CREATE (Part:${queryHelper.part})-[HAS_MAKE]->(Make:${queryHelper.make})-[HAS_MODEL]->(Model:${queryHelper.model})-[HAS_YEAR]->(Year:${queryHelper.year})-[HAS_SIZE]->(Size:${queryHelper.size})`
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
        console.log('POST request was successful:', data)
        // Handle the response data
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error)
        // Handle the error
      })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Create Form</h2>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="field1"
          >
            Part
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="field1"
            onChange={(e) =>
              setQueryHelper({
                ...queryHelper,
                part: e.target.value,
              })
            }
            type="text"
            placeholder="Part"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="field2"
          >
            Make
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="field2"
            type="text"
            placeholder="Make"
            onChange={(e) =>
              setQueryHelper({
                ...queryHelper,
                make: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="field3"
          >
            Model
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="field3"
            type="text"
            placeholder="Model"
            onChange={(e) =>
              setQueryHelper({
                ...queryHelper,
                model: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="field4"
          >
            Year
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="field4"
            type="text"
            placeholder="Year"
            onChange={(e) =>
              setQueryHelper({
                ...queryHelper,
                year: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="field5"
          >
            Size
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="field5"
            type="text"
            placeholder="Size"
            onChange={(e) =>
              setQueryHelper({
                ...queryHelper,
                size: e.target.value,
              })
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:outline-none"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Admin() {
  return (
    <>
      <div className="mt-24 sm:mt-32 lg:mt-40">
        <CenteredForm />
      </div>
    </>
  )
}
