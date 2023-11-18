'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS

// export const metadata = {
//   title: 'Admin',
//   description: 'Let’s work together. We can’t wait to hear from you.',
// }

const CustomChipRenderer = ({ value }) => {
  const isActive = value === 1

  return (
    <div>
      {isActive ? (
        <div className="mt-1.5 flex items-center justify-center rounded-full border border-green-300 bg-green-100 px-2 py-2 font-medium text-green-700 ">
          <div className="max-w-full flex-initial text-xs font-normal leading-none">
            Active
          </div>
        </div>
      ) : (
        // <div class="center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 px-3.5 py-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
        //   Active
        // </div>
        <div className="mt-1.5 flex items-center justify-center rounded-full border border-yellow-300 bg-yellow-100 px-2 py-2 font-medium text-yellow-700 ">
          <div className="max-w-full flex-initial text-xs font-normal leading-none">
            Inactive
          </div>
        </div>
      )}
    </div>
  )
}

const EditPartRenderer = (props) => {
  return (
    <button
      onClick={() => {
        props.setOpenModal(true)
        props.fetchProp(props.data.Size, {
          part: props.data.Part,
          make: props.data.Make,
          model: props.data.Model,
          year: props.data.Year,
          size: props.data.Size,
        })
      }}
      className="mt-1.5 flex w-full items-center justify-center rounded-full border border-blue-300 bg-blue-100 px-2 py-2 font-medium text-blue-700"
      // className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-indigo-600 px-3.5 py-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white hover:bg-indigo-900"
    >
      <div className="max-w-full flex-initial text-xs font-normal leading-none">
        Edit
      </div>
      {/* Edit */}
    </button>
  )
}
const DeletePartRenderer = (props) => {
  return (
    <button
      onClick={() => {
        props.handleDelete(props.value)
      }}
      className="mt-1.5 flex w-full items-center justify-center rounded-full border border-red-300 bg-red-100 px-2 py-2 font-medium text-red-700"
      // className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-600 px-3.5 py-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white hover:bg-red-900"
    >
      <div className="max-w-full flex-initial text-xs font-normal leading-none">
        Delete
      </div>
      {/* Delete */}
    </button>
  )
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4F46E5' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : provided.boxShadow,
  }),
}

function Table() {
  const [parts, setParts] = useState([{}])
  const [openModal, setOpenModal] = useState(false)
  const [openDetails, setOpenDetails] = useState(null)
  const [options, setOptions] = useState({})
  const [properties, setProperties] = useState({
    open: false,
    Status: 0,
    Quantity: 1,
    action: 'CREATE',
  })
  // const url = 'https://testbe.bangdb.com:18080/graph/adminpanel/query'
  const url = 'https://testbe.bangdb.com:18080/graph/test_admin/query'
  const headers = {
    'Content-Type': 'application/json',
    'x-bang-api-key': '5562808906891435869',
    'x-bang-api-src': 'ampere',
  }

  const gridRef = useRef() // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  // const [columnDefs, setColumnDefs] = useState([
  //   { field: 'Part', filter: true },
  //   { field: 'Make', filter: true },
  //   { field: 'Model', filter: true },
  //   { field: 'Year', filter: true },
  //   { field: 'Size', filter: true },
  //   // {
  //   //   field: 'Status',
  //   //   filter: true,
  //   //   cellRenderer: CustomChipRenderer,
  //   // },
  //   {
  //     field: 'property_node_id',
  //     headerName: 'Edit',
  //     cellRenderer: EditPartRenderer,
  //     cellRendererParams: {
  //       setOpenModal,
  //       fetchProp,
  //     },
  //   },
  //   {
  //     field: 'property_node_id',
  //     headerName: 'Delete',
  //     cellRenderer: DeletePartRenderer,
  //     cellRendererParams: {
  //       handleDelete,
  //     },
  //   },
  // ])

  const columnDefs = useMemo(() => {
    const properties = Object.keys(parts[0] || {})
    const arrToReturn = []
    if (properties.includes('Part')) {
      arrToReturn.push({ field: 'Part', filter: true })
    }
    if (properties.includes('Make')) {
      arrToReturn.push({ field: 'Make', filter: true })
    }
    if (properties.includes('Model')) {
      arrToReturn.push({ field: 'Model', filter: true })
    }
    if (properties.includes('Year')) {
      arrToReturn.push({ field: 'Year', filter: true })
    }
    if (properties.includes('Size')) {
      arrToReturn.push({ field: 'Size', filter: true })
      arrToReturn.push({
        field: 'property_node_id',
        headerName: 'Edit',
        cellRenderer: EditPartRenderer,
        cellRendererParams: {
          setOpenModal,
          fetchProp,
        },
      })
      // arrToReturn.push({
      //   field: 'property_node_id',
      //   headerName: 'Delete',
      //   cellRenderer: DeletePartRenderer,
      //   cellRendererParams: {
      //     handleDelete,
      //   },
      // })
    }
    if (properties.includes('status')) {
      arrToReturn.push({
        field: 'status',
        headerName: 'Status',
        cellRenderer: CustomChipRenderer,
      })
    }
    return arrToReturn
  }, [parts])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    flex: 1,
  }))

  const [queryHelper, setQueryHelper] = useState({
    part: '',
    make: '',
    model: '',
    year: '',
    size: '',
  })

  const handleCreate = (query, inputValue) => {
    let payload = {}
    switch (query) {
      case 'part':
        payload = { make: '', model: '', year: '', size: '' }
        break
      case 'make':
        payload = { model: '', year: '', size: '' }
        break
      case 'model':
        payload = { year: '', size: '' }
        break
      case 'year':
        payload = { size: '' }
        break
      case 'size':
        payload = {}
        break
      default:
        break
    }
    setQueryHelper({
      ...queryHelper,
      ...payload,
      [query]: inputValue,
    })
  }

  async function handleDelete(prop) {
    const data = `DELETE (Property:${prop})`
    const requestOptions = {
      method: 'POST',
      headers,
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
        setParts((prev) => {
          return prev.filter((x) => x.property_node_id !== prop)
        })
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error)
      })
  }

  const handleSubmit = async () => {
    let data
    let sizeData
    const prop = `"${queryHelper.part} ${queryHelper.make} ${queryHelper.model} ${queryHelper.year} ${queryHelper.size}"`
    const status = `${queryHelper.part}${queryHelper.make}${queryHelper.model}${queryHelper.year}`

    if (properties.action === 'CREATE') {
      data = `${properties.action} (Part:"${
        queryHelper.part
      }")-[HAS_MAKE]->(Make:"${queryHelper.make}")-[HAS_MODEL]->(Model:"${
        queryHelper.model
      }")-[HAS_YEAR]->(Year:"${queryHelper.year}")-[HAS_SIZE]->(Size:"${
        queryHelper.size
      }" {"${status}": ${
        properties.Status || 0
      }})-[HAS_PROPERTY]->(Property:${prop} {"Status": ${
        properties.Status || 0
      }, "Quantity": ${properties.Quantity || 1}})`
    } else {
      data = `${properties.action} (Property:${prop} {"Status": ${
        properties.Status || 0
      }, "Quantity": ${properties.Quantity || 1}})`

      sizeData = `${properties.action} (Size:"${
        queryHelper.size
      }" {"${status}": ${properties.Status || 0}})`
    }

    const requestOptions = {
      method: 'POST',
      headers,
      body: data,
    }

    if (sizeData) {
      fetch(url, {
        method: 'POST',
        headers,
        body: sizeData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network Error')
        }
        return response.json()
      })
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
        setParts((prev) => {
          if (properties.action === 'CREATE') {
            return [
              ...prev,
              {
                Part: part,
                Make: make,
                Model: model,
                Year: year,
                Size: size,
                status: properties.Status || 0,
                Status: properties.Status || 0,
                property_node_id: prop,
              },
            ]
          } else {
            const clone = structuredClone(prev)
            const tochange = clone.find((x) => `"${x.property_node_id}"` === prop)
            if (tochange) {
              tochange.status = properties.Status || 0
              tochange.Status = properties?.Status || 0
            }
            return clone
          }
        })
        setProperties({
          open: false,
          Status: 0,
          Quantity: 1,
          action: 'CREATE',
        })
        setOpenModal(false)
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error)
        // Handle the error
      })
  }

  const fetchParts = async () => {
    setQueryHelper({
      part: '',
      make: '',
      model: '',
      year: '',
      size: '',
    })
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:*); RETURN p1.name AS Part`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    setParts(data.rows)
    setOptions({
      Type: data.rows.map((x) => ({ value: x.Part, label: x.Part })),
      Make: [],
      Model: [],
      Year: [],
      Size: [],
    })
  }

  const fetchMakes = async (part) => {
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:"${part}")-[@r1 HAS_MAKE]->(@m1 Make:*); RETURN p1.name AS Part, m1.name AS Make`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    setParts(data.rows)
    setOptions({
      ...options,
      Make: data.rows.map((x) => ({ value: x.Make, label: x.Make })),
      Model: [],
      Year: [],
      Size: [],
    })
  }

  const fetchModel = async (make) => {
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:"${queryHelper.part}")-[@r1 HAS_MAKE]->(@m1 Make:"${make}")-[@r2 HAS_MODEL]->(@m2 Model:*); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    setParts(data.rows)
    setOptions({
      ...options,
      Model: data.rows.map((x) => ({ value: x.Model, label: x.Model })),
      Year: [],
      Size: [],
    })
  }

  const fetchYear = async (model) => {
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:"${queryHelper.part}")-[@r1 HAS_MAKE]->(@m1 Make:"${queryHelper.make}")-[@r2 HAS_MODEL]->(@m2 Model:"${model}")-[@r3 HAS_YEAR]->(@y1 Year:*); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model, y1.name AS Year`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    setParts(data.rows)
    setOptions({
      ...options,
      Year: data.rows.map((x) => ({ value: x.Year, label: x.Year })),
      Size: [],
    })
  }

  const fetchSize = async (year) => {
    const status = `${queryHelper.part}${queryHelper.make}${queryHelper.model}${year}`
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:"${queryHelper.part}")-[@r1 HAS_MAKE]->(@m1 Make:"${queryHelper.make}")-[@r2 HAS_MODEL]->(@m2 Model:"${queryHelper.model}")-[@r3 HAS_YEAR]->(@y1 Year:"${year}")-[@r4 HAS_SIZE]->(@s1 Size:* {"${queryHelper.part}${queryHelper.make}${queryHelper.model}${year}" > 0}); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model, y1.name AS Year, s1.name AS Size, s1.${queryHelper.part}${queryHelper.make}${queryHelper.model}${year} AS status`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    setParts(
      data.rows.map((item) => ({
        ...item,
        property_node_id: `${item.Part} ${item.Make} ${item.Model} ${item.Year} ${item.Size}`,
      }))
    )
    setOptions({
      ...options,
      Size: data.rows.map((x) => ({ value: x.Size, label: x.Size })),
    })
  }

  async function fetchProp(size, queryHelper, filter) {
    setQueryHelper((prev) => ({
      ...prev,
      size: size,
    }))
    const query = `s{UNIQUE_SELECT}=>(@p1 Part:"${queryHelper.part}")-[@r1 HAS_MAKE]->(@m1 Make:"${queryHelper.make}")-[@r2 HAS_MODEL]->(@m2 Model:"${queryHelper.model}")-[@r3 HAS_YEAR]->(@y1 Year:"${queryHelper.year}")-[@r4 HAS_SIZE]->(@s1 Size:"${size}")-[@r5 HAS_PROPERTY]->(@p2 Property:"${queryHelper.part} ${queryHelper.make} ${queryHelper.model} ${queryHelper.year} ${size}"); RETURN p2.Status AS Status, p2.Quantity AS Quantity, p2.name AS property_node_id, s1.${queryHelper.part}${queryHelper.make}${queryHelper.model}${queryHelper.year} AS status`
    const requestOptions = {
      method: 'POST',
      headers,
      body: query,
    }
    const data = await fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    if (data.rows.length > 0) {
      if (filter) {
        setParts([
          {
            Part: queryHelper.part,
            Make: queryHelper.make,
            Model: queryHelper.model,
            Year: queryHelper.year,
            Size: size,
            status: data.rows[0]?.status,
          },
        ])
      }
      setProperties({
        open: true,
        action: 'UPDATE',
        ...data.rows[0],
      })
    } else {
      setProperties({
        open: true,
        action: 'CREATE',
        Status: 1,
        Quantity: 1,
      })
    }
  }

  const [levk, setLevk] = useState({ _levk: null, _nskipc: null })

  const fetchMoreData = () => {
    let filter = ''
    if (levk._levk) {
      filter = `{ _levk="${levk._levk}" AND _nskipc=${levk._nskipc}}`
    }
    let property = '*'
    const { part, make, model, year, size } = queryHelper
    if (
      part &&
      make &&
      model &&
      year &&
      size &&
      ![part, make, model, year, size].includes('')
    ) {
      property = `"${part} ${make} ${model} ${year} ${size}"`
    }
    const query = `s=>(@p1 Part:${
      queryHelper.part && queryHelper.part !== ''
        ? `"${queryHelper.part}"`
        : '*'
    })-[@r1 HAS_MAKE]->(@m1 Make:${
      queryHelper.make && queryHelper.make !== ''
        ? `"${queryHelper.make}"`
        : '*'
    })-[@r2 HAS_MODEL]->(@m2 Model:${
      queryHelper.model && queryHelper.model !== ''
        ? `"${queryHelper.model}"`
        : '*'
    })-[@r3 HAS_YEAR]->(@y1 Year:${
      queryHelper.year && queryHelper.year !== ''
        ? `"${queryHelper.year}"`
        : '*'
    })-[@r4 HAS_SIZE]->(@s1 Size:${
      queryHelper.size && queryHelper.size !== ''
        ? `"${queryHelper.size}"`
        : '*'
    })-[@r5 HAS_PROPERTY ${filter}]->(@p2 Property:${property}); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model, y1.name AS Year, s1.name AS Size, p2.Status AS Status, p2.name AS property_node_id`
    const requestOptions = {
      method: 'POST',
      headers,
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
        if (levk._levk) {
          setParts((prev) => [...prev, ...data.rows])
        } else {
          setParts([...data.rows])
        }
        if (data._levk) {
          setLevk((prev) => ({ ...prev, _levk: data._levk }))
        } else {
          setLevk({ _levk: null, _nskipc: null })
        }
        if (data._nskipc) {
          setLevk((prev) => ({ ...prev, _nskipc: data._nskipc }))
        }
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error)
      })
  }

  useEffect(() => {
    const fetchData = () => {
      const query = `s=>(@p1 Part:*)-[@r1 HAS_MAKE]->(@m1 Make:*)-[@r2 HAS_MODEL]->(@m2 Model:*)-[@r3 HAS_YEAR]->(@y1 Year:*)-[@r4 HAS_SIZE]->(@s1 Size:*)-[@r5 HAS_PROPERTY]->(@p2 Property:*); RETURN p1.name AS Part, m1.name AS Make, m2.name AS Model, y1.name AS Year, s1.name AS Size, p2.Status AS Status, p2.name AS property_node_id LIMIT 50`
      const requestOptions = {
        method: 'POST',
        headers,
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
          setParts(data.rows)
          if (data._levk) {
            setLevk((prev) => ({ ...prev, _levk: data._levk }))
          }
          if (data._nskipc) {
            setLevk((prev) => ({ ...prev, _nskipc: data._nskipc }))
          }
        })
        .catch((error) => {
          console.error('There was a problem with the POST request:', error)
        })
    }
    fetchParts()
    // fetchData()
  }, [])

  return (
    <>
      {openModal && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/2 rounded-lg bg-white p-8">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setOpenModal(false)
                  setProperties({
                    open: false,
                    Status: 0,
                    Quantity: 1,
                    action: 'CREATE',
                  })
                }}
                className="text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div>
              {properties.open ? (
                <>
                  {properties.action === 'CREATE' ? (
                    <p>Ready to list your new product</p>
                  ) : (
                    <p>Edit your existing product</p>
                  )}
                  <div className="mb-4 flex items-center justify-between">
                    <label for="toggle" className="font-bold">
                      Change Status
                    </label>
                    <input
                      type="checkbox"
                      id="toggle"
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      checked={properties.Status === 1}
                      onChange={(e) =>
                        setProperties((prev) => ({
                          ...prev,
                          Status: e.target.checked ? 1 : 2,
                        }))
                      }
                    />
                    <label for="numericInput" className="font-bold">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      value={properties.Quantity}
                      onChange={(e) =>
                        setProperties((prev) => ({
                          ...prev,
                          Quantity: e.target.value,
                        }))
                      }
                      id="numericInput"
                      className="ml-2 rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">
                      Type
                    </label>
                    <CreatableSelect
                      styles={customStyles}
                      options={options?.Type || []}
                      value={{
                        value: queryHelper.part,
                        label: queryHelper.part,
                      }}
                      onChange={(newVal) => {
                        fetchMakes(newVal?.value)
                        setQueryHelper({
                          ...queryHelper,
                          part: newVal?.value,
                          make: '',
                          model: '',
                          year: '',
                          size: '',
                        })
                      }}
                      onCreateOption={(e) => {
                        fetchMakes(e)
                        handleCreate('part', e)
                      }}
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
                      options={options?.Make || []}
                      value={{
                        value: queryHelper.make,
                        label: queryHelper.make,
                      }}
                      onChange={(newVal) => {
                        fetchModel(newVal?.value)
                        setQueryHelper({
                          ...queryHelper,
                          make: newVal?.value,
                          model: '',
                          year: '',
                          size: '',
                        })
                      }}
                      onCreateOption={(e) => {
                        fetchModel(e)
                        handleCreate('make', e)
                      }}
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
                      options={options?.Model || []}
                      value={{
                        value: queryHelper.model,
                        label: queryHelper.model,
                      }}
                      onChange={(newVal) => {
                        fetchYear(newVal?.value)
                        setQueryHelper({
                          ...queryHelper,
                          model: newVal?.value,
                          year: '',
                          size: '',
                        })
                      }}
                      onCreateOption={(e) => {
                        fetchYear(e)
                        handleCreate('model', e)
                      }}
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
                      options={options?.Year || []}
                      value={{
                        value: queryHelper.year,
                        label: queryHelper.year,
                      }}
                      onChange={(newVal) => {
                        fetchSize(newVal?.value)
                        setQueryHelper({
                          ...queryHelper,
                          year: newVal?.value,
                          size: '',
                        })
                      }}
                      onCreateOption={(e) => {
                        fetchSize(e)
                        handleCreate('year', e)
                      }}
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
                      options={options?.Size || []}
                      value={{
                        value: queryHelper.size,
                        label: queryHelper.size,
                      }}
                      onChange={(newVal) => {
                        fetchProp(newVal?.value, queryHelper, true)
                        setQueryHelper({
                          ...queryHelper,
                          size: newVal?.value,
                        })
                      }}
                      onCreateOption={(e) => {
                        fetchProp(e, queryHelper, true)
                        handleCreate('size', e)
                      }}
                      isClearable
                      isSearchable
                      placeholder="Select or create a Size"
                      isMulti={false} // Set to true for multiple selections
                      className="react-select-container"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-screen overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Used Train Dashboard
            </h1>
            {/* <p className="mt-2 text-sm text-gray-700">
              A list of all the parts in your inventory including their
              classifications such as Part, Make, Model, Size, Year etc.
            </p> */}
          </div>
          <div className="mt-4 flex items-center sm:ml-16 sm:mt-0">
            <button
              onClick={() => {
                fetchParts()
                setOpenModal(true)
              }}
              type="button"
              className="mx-2 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Part
            </button>
            <svg
              onClick={() => fetchParts()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-2 h-6 w-6 cursor-pointer font-semibold text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <div className="grid w-full grid-cols-5 items-end gap-2">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Type
            </label>
            <Select
              styles={customStyles}
              options={options?.Type || []}
              value={{
                value: queryHelper.part,
                label: queryHelper.part,
              }}
              onChange={(newVal) => {
                setLevk({ _levk: null, _nskipc: null })
                fetchMakes(newVal?.value)
                setQueryHelper({
                  ...queryHelper,
                  part: newVal?.value,
                  make: '',
                  model: '',
                  year: '',
                  size: '',
                })
              }}
              // onCreateOption={(e) => {
              //   setLevk({ _levk: null, _nskipc: null })
              //   fetchMakes(e)
              //   handleCreate('part', e)
              // }}
              isClearable
              isSearchable
              placeholder="Select or create a Type"
              isMulti={false} // Set to true for multiple selections
              className="react-select-container"
            />
          </div>
          {queryHelper.part && queryHelper.part !== '' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Make
              </label>
              <Select
                styles={customStyles}
                options={options?.Make || []}
                value={{
                  value: queryHelper.make,
                  label: queryHelper.make,
                }}
                onChange={(newVal) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchModel(newVal?.value)
                  setQueryHelper({
                    ...queryHelper,
                    make: newVal?.value,
                    model: '',
                    year: '',
                    size: '',
                  })
                }}
                // onCreateOption={(e) => {
                //   setLevk({ _levk: null, _nskipc: null })
                //   fetchModel(e)
                //   handleCreate('make', e)
                // }}
                isClearable
                isSearchable
                placeholder="Select or create a Make"
                isMulti={false} // Set to true for multiple selections
                className="react-select-container"
              />
            </div>
          )}
          {queryHelper.make && queryHelper.make !== '' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Model
              </label>
              <Select
                styles={customStyles}
                options={options?.Model || []}
                value={{
                  value: queryHelper.model,
                  label: queryHelper.model,
                }}
                onChange={(newVal) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchYear(newVal?.value)
                  setQueryHelper({
                    ...queryHelper,
                    model: newVal?.value,
                    year: '',
                    size: '',
                  })
                }}
                onCreateOption={(e) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchYear(e)
                  handleCreate('model', e)
                }}
                isClearable
                isSearchable
                placeholder="Select or create a Model"
                isMulti={false} // Set to true for multiple selections
                className="react-select-container"
              />
            </div>
          )}
          {queryHelper.model && queryHelper.model !== '' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Year
              </label>
              <Select
                styles={customStyles}
                options={options?.Year || []}
                value={{
                  value: queryHelper.year,
                  label: queryHelper.year,
                }}
                onChange={(newVal) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchSize(newVal?.value)
                  setQueryHelper({
                    ...queryHelper,
                    year: newVal?.value,
                    size: '',
                  })
                }}
                onCreateOption={(e) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchSize(e)
                  handleCreate('year', e)
                }}
                isClearable
                isSearchable
                placeholder="Select or create a Year"
                isMulti={false} // Set to true for multiple selections
                className="react-select-container"
              />
            </div>
          )}
          {queryHelper.year && queryHelper.year !== '' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Size
              </label>
              <Select
                styles={customStyles}
                options={options?.Size || []}
                value={{
                  value: queryHelper.size,
                  label: queryHelper.size,
                }}
                onChange={(newVal) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchProp(newVal?.value, queryHelper, true)
                  setQueryHelper({
                    ...queryHelper,
                    size: newVal?.value,
                  })
                }}
                onCreateOption={(e) => {
                  setLevk({ _levk: null, _nskipc: null })
                  fetchProp(e, queryHelper, true)
                  handleCreate('size', e)
                }}
                isClearable
                isSearchable
                placeholder="Select or create a Size"
                isMulti={false} // Set to true for multiple selections
                className="react-select-container"
              />
            </div>
          )}

          {/* <div className="mb-4">
            <button
              onClick={() => fetchMoreData()}
              className="w-full rounded-md bg-green-600 py-2 font-semibold text-white"
            >
              Search
            </button>
          </div> */}
        </div>
        <div className="mt-2 h-full w-full">
          <div
            className="ag-theme-alpine"
            style={{ width: '100%', height: '80%' }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={parts}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="multiple"
              pagination={true}
            />
          </div>
          <div className="mt-0.5 flex w-full justify-end">
            {levk._levk && (
              <button
                onClick={() => {
                  fetchMoreData()
                }}
                type="button"
                className={`block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Fetch More
              </button>
            )}
          </div>
        </div>
        {/* <div className="mt-8 flow-root">
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
                        {part.Part}
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
                          className={
                            part.Status === 0
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }
                        >
                          {part.Status === 0 ? 'Disabled' : 'Enabled'}
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => {
                            setOpenModal(true)
                            fetchProp(part.Size, {
                              part: part.Part,
                              make: part.Make,
                              model: part.Model,
                              year: part.Year,
                              size: part.Size,
                            })
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {part.Part}</span>
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
        </div> */}
      </div>
    </>
  )
}

export default function Admin() {
  return (
    <>
      <div className="">
        <Table />
      </div>
    </>
  )
}
