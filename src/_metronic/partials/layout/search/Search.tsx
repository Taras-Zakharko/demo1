import React, {FC, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {SearchComponent} from '../../../assets/ts/components'
import {useDispatch} from 'react-redux'
import {
  setCountry,
  setCity,
  setCompany,
  setPosition,
  setSkils,
  setYearEnd,
  setYearStart,
  setInput,
} from '../../../../app/features/search/searchSlice'
import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import '@yaireo/tagify/dist/tagify.css' // Tagify CSS

import Autosuggest from 'react-autosuggest'
import './Search.scss'
import candidatesApi from '../../../../API/candidates'



const Search: FC = () => {
  const [menuState, setMenuState] = useState<'main' | 'advanced' | 'preferences'>('main')
  const element = useRef<HTMLDivElement | null>(null)
  const wrapperElement = useRef<HTMLDivElement | null>(null)
  const resultsElement = useRef<HTMLDivElement | null>(null)
  const suggestionsElement = useRef<HTMLDivElement | null>(null)
  const emptyElement = useRef<HTMLDivElement | null>(null)

  const [countries, setCountries] = useState<any[]>([])
  const [myCountry, setMyCountry] = useState<any[]>([])
  const [myTowns, setMyTowns] = useState<string[]>([])
  const [skilsArr, setSkilsArr] = useState<string[]>([])
  const [yeas, setYears] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  // const countriesSelect = useRef<HTMLSelectElement>(null)
  // const citiesSelect = useRef<HTMLSelectElement | null>(null)
  const positionSelect = useRef<HTMLInputElement | null>(null)
  const companySelect = useRef<HTMLInputElement | null>(null)
  const experienceStartSelect = useRef<HTMLSelectElement | null>(null)
  const experienceEndSelect = useRef<HTMLSelectElement | null>(null)
  const inputSearch = useRef<HTMLInputElement | null>(null)
  const inputSearchSmall = useRef<HTMLInputElement | null>(null)
  const searchToogleContent = useRef<HTMLDivElement | null>(null)
  const clearFilter = useRef<HTMLButtonElement | null>(null)
  const clearFilter2 = useRef<HTMLButtonElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const [countryValue, setCountryValue] = useState('')
  const [suggestionsCountry, setSuggestionsCountry] = useState<string[]>([])
  const [cityValue, setCityValue] = useState('')
  const [suggestionsCity, setSuggestionsCity] = useState<string[]>([])
  const [allSkillsArr, setAllSkillsArr] = useState<string[]>([])

  const [show, setShow] = useState<boolean>(false)

  const tagifyRef = useRef()

  const dispatch = useDispatch()

  const [filterListArr, setFilterListArr] = useState<any>([])

  const handleGetSkillsArr = () => {
    candidatesApi.getSkillsArr().then((response: any) => {
      setAllSkillsArr(response.data)
    })
  }
 

  function createFilterList() {
    let inputSearchValue = ''
    let inputValueRes = ''
    let locationValue = ''
    let posinionValue = ''
    let companyValue = ''
    let skilsValue = ''
    let experienceValue = ''
    setFilterListArr([])

    if (inputSearch.current !== null) {
      if (countryValue !== '' && cityValue !== '') {
        locationValue = `${countryValue}, ${cityValue}`
      } else if (countryValue !== '' && cityValue === '') {
        locationValue = `${countryValue}`
      } else if (countryValue === '' && cityValue !== '') {
        locationValue = `${cityValue}`
      } else {
        locationValue = ''
      }

      if (positionSelect.current?.value !== '') {
        posinionValue = `${positionSelect.current?.value}`
      } else {
        posinionValue = ''
      }

      if (companySelect.current?.value !== '') {
        companyValue = `${companySelect.current?.value}`
      } else {
        companyValue = ''
      }

      if (skilsArr.length > 0) {
        skilsArr.map((skil: string, i: number) =>
          i === skilsArr.length - 1 ? (skilsValue += `${skil}`) : (skilsValue += `${skil}, `)
        )
      } else {
        skilsValue = ''
      }

      if (
        experienceStartSelect.current?.value !== '' &&
        experienceEndSelect.current?.value !== ''
      ) {
        experienceValue = `від ${experienceStartSelect.current?.value} до ${experienceEndSelect.current?.value} років`
      } else if (
        experienceStartSelect.current?.value !== '' &&
        experienceEndSelect.current?.value === ''
      ) {
        experienceValue = `від ${experienceStartSelect.current?.value} років`
      } else if (
        experienceStartSelect.current?.value === '' &&
        experienceEndSelect.current?.value !== ''
      ) {
        experienceValue = `до ${experienceEndSelect.current?.value} років`
      } else {
        experienceValue = ''
      }

      if (inputSearch.current.value !== '') {
        inputSearchValue = inputSearch.current.value
      } else if (inputSearchSmall.current?.value !== '') {
        inputSearchValue = inputSearchSmall.current!.value
      }

      inputValueRes = `${inputSearchValue};${locationValue};${posinionValue};${companyValue};${skilsValue};${experienceValue}`
      setFilterListArr(inputValueRes.split(';'))

      dispatch(setInput(`${inputSearch.current!.value}${inputSearchSmall.current?.value}`))
      dispatch(setCountry(countryValue))
      dispatch(setCity(cityValue))
      dispatch(setPosition(positionSelect.current!.value))
      dispatch(setCompany(companySelect.current!.value))
      dispatch(setSkils(skilsArr))
      dispatch(setYearEnd(`${experienceEndSelect.current!.value}`))
      dispatch(setYearStart(`${experienceStartSelect.current!.value}`))
    }

    document.querySelector('#kt_header_search_toggle')?.classList.remove('active')
    document.querySelector('#kt_header_search_toggle')?.classList.remove('show')
    document.querySelector('#kt_header_search')?.classList.remove('show')
    document.querySelector('#kt_header_search')?.classList.remove('menu-dropdown')
    searchToogleContent.current!.classList.remove('show')
  }

  filterListArr.map((str: string) => {
    if (str !== '') {
      clearFilter.current!.classList.add('d-sm-block')
      clearFilter2.current!.classList.remove('d-none')
      clearFilter2.current!.classList.add('d-sm-none')
    }
  })

  function clearSearchForm() {
    inputSearch.current!.value = ''
    inputSearchSmall.current!.value = ''
    setCountryValue('')
    setCityValue('')
    positionSelect.current!.value = ''
    companySelect.current!.value = ''
    setSkilsArr([])
    experienceStartSelect.current!.value = ''
    experienceEndSelect.current!.value = ''
    inputSearch.current!.value = ''

    dispatch(setInput(''))
    dispatch(setCountry(''))
    dispatch(setCity(''))
    dispatch(setPosition(''))
    dispatch(setCompany(''))
    dispatch(setSkils([]))
    dispatch(setYearEnd(''))
    dispatch(setYearStart(''))
    setFilterListArr([])
    clearFilter.current!.classList.remove('d-sm-block')
    clearFilter2.current!.classList.add('d-none')
  }

  useEffect(() => {
    if (myCountry.length) {
      setMyTowns((towns) => (towns = myCountry[0].cities))
    }
  }, [myCountry])

  useEffect(() => {
    const apiUrl = 'https://countriesnow.space/api/v0.1/countries'
    axios.get(apiUrl).then((resp) => {
      const allCountries = resp.data
      setCountries(allCountries.data)
    })
  }, [setCountries])

  const processs = (search: SearchComponent) => {
    setTimeout(function () {
      const number = Math.floor(Math.random() * 6) + 1

      // Hide recently viewed
      suggestionsElement.current!.classList.add('d-none')

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add('d-none')
        // Show empty message
        emptyElement.current!.classList.remove('d-none')
      } else {
        // Show results
        resultsElement.current!.classList.remove('d-none')
        // Hide empty message
        emptyElement.current!.classList.add('d-none')
      }

      // Complete search
      search.complete()
    }, 1500)
  }

  const clear = (search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove('d-none')
    // Hide results
    resultsElement.current!.classList.add('d-none')
    // Hide empty message
    emptyElement.current!.classList.add('d-none')
  }

  useEffect(() => {
    handleGetSkillsArr();
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search')
    // Search handler
    searchObject!.on('kt.search.process', processs)
    // Clear handler
    searchObject!.on('kt.search.clear', clear)
  }, [])

  function showHideSearchMobile(show: boolean) {
    if (show && element.current !== null && searchRef.current !== null) {
      element.current.classList.add('show')
      element.current.classList.add('menu-dropdown')
      searchRef.current.classList.add('active')
      searchRef.current.classList.add('show')
    } else {
      if (
        element.current!.classList.value.includes('show menu-dropdown') &&
        searchRef.current?.classList.value.includes('active show')
      ) {
        element.current!.classList.remove('show')
        element.current!.classList.remove('menu-dropdown')
        searchRef.current!.classList.remove('show')
        searchRef.current!.classList.remove('active')
        searchToogleContent.current!.classList.remove('show')
      }
    }
  }

  function searchFromInput(e: any) {
    if (e.code === 'Enter') {
      createFilterList()
    }
  }

  useEffect(() => {
    showHideSearchMobile(show)
  }, [show])

  const loverCaseCountry = countries.map((country) => country.country)

  function getSuggestionsCountry(value: string): string[] {
    return loverCaseCountry.filter((country: any) =>
      country.toLowerCase().startsWith(value.trim().toLowerCase())
    )
  }
  function getSuggestionsCity(value: string): string[] {
    return myTowns.filter((city: any) => city.toLowerCase().startsWith(value.trim().toLowerCase()))
  }


  return (
    <>
      <div
        id='kt_header_search'
        className='d-flex align-items-stretch justify-content-center w-100 mw-lg-750px'
        data-kt-search-keypress='true'
        data-kt-search-min-length='2'
        data-kt-search-enter='enter'
        data-kt-search-layout='menu'
        data-kt-menu-trigger='auto'
        data-kt-menu-overflow='false'
        data-kt-menu-permanent='true'
        data-kt-menu-placement='bottom-end'
        ref={element}
      >
        <div
          ref={searchRef}
          className='d-flex align-items-center position-relative w-100 mw-lg-750px'
          data-kt-search-element='toggle'
          id='kt_header_search_toggle'
        >
          <button
            className='d-sm-none btn-sm text-gray-500 p-2 text-active-primary btn btn-active-light-primary'
            onClick={() => setShow((show) => !show)}
          >
            <i className='fas fa-search ms-1 fs-2'></i>
          </button>

          <input
            ref={inputSearch}
            type='text'
            onKeyDown={(e) => searchFromInput(e)}
            className='form-control form-control-solid ps-15 pe-10 d-none d-sm-block h-40px justify-content-end '
          />
          <i className='fas fa-search d-none d-sm-block position-absolute text-gray-500 start-15px fs-2'></i>

          <div id='filtersDiv' className='position-absolute ms-15 d-flex'>
            {filterListArr.map((str: string, i: number) =>
              str !== '' ? (
                <div
                  key={i}
                  className='h-30 border d-none d-sm-block bg-secondary p-1 ps-2 pe-2 rounded me-3'
                >
                  {str}
                </div>
              ) : null
            )}
          </div>
          <button
            ref={clearFilter}
            className=' btn p-0 position-absolute cursor-pointer end-10px d-none'
            onClick={() => clearSearchForm()}
          >
            <i className='fas fa-times fs-4'></i>
          </button>
          <div
            ref={searchToogleContent}
            data-kt-search-element='content'
            className='menu menu-sub menu-sub-dropdown mt-4 mt-sm-0 p-20px w-100 h-90 h-sm-auto overflow-auto position-sm-absolute'
          >
            <div
              className={`${menuState === 'main' ? '' : 'd-none'}`}
              ref={wrapperElement}
              data-kt-search-element='wrapper'
            >
              <div className='row align-items-center mb-20px'>
                <div className='position-relative'>
                  <input
                    ref={inputSearchSmall}
                    type='text'
                    className='form-control form-control-solid pe-10 mb-6 d-sm-none h-40px justify-content-end'
                    placeholder='Пошук'
                    onKeyDown={(e) => searchFromInput(e)}
                  />
                  <div id='filtersDiv2' className='position-absolute top-0 p-2'>
                    {filterListArr.map((str: string, i: number) =>
                      str !== '' ? (
                        <div
                          key={i}
                          className='h-30 border d-block d-sm-none bg-secondary p-1 ps-2 pe-2 rounded me-3'
                        >
                          {str}
                        </div>
                      ) : null
                    )}
                  </div>
                  <button
                    ref={clearFilter2}
                    className=' btn p-0 position-absolute cursor-pointer top-0 mt-2 end-10px d-none'
                    onClick={() => clearSearchForm()}
                  >
                    <i className='fas fa-times fs-4'></i>
                  </button>
                </div>

                <div className='col-lg-3 fs-6'>
                  <label htmlFor='' className='fs-3 text-gray-800 fs-sm-6 mb-5 mb-lg-0'>
                    Локація
                  </label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <Autosuggest
                        suggestions={suggestionsCountry}
                        onSuggestionsClearRequested={() => setSuggestionsCountry([])}
                        onSuggestionsFetchRequested={({value}) => {
                          setCountryValue(value)
                          setMyCountry((country) => {
                            country = countries.filter((country) => country.country === value)

                            return country
                          })
                          setSuggestionsCountry(getSuggestionsCountry(value))
                        }}
                        onSuggestionSelected={(_, {suggestionValue}) =>
                          setMyCountry((country) => {
                            country = countries.filter(
                              (country) => country.country === suggestionValue
                            )

                            return country
                          })
                        }
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <option value={suggestion}>{suggestion}</option>
                        )}
                        inputProps={{
                          className: 'form-select form-select-solid mb-5 mb-lg-0',
                          placeholder: 'Країна',
                          value: countryValue,
                          onChange: (_, {newValue, method}) => {
                            setCountryValue(newValue)
                          },
                        }}
                        highlightFirstSuggestion={true}
                      />
                    </div>
                    <div className='col-lg-6'>
                      <Autosuggest
                        suggestions={suggestionsCity}
                        onSuggestionsClearRequested={() => setSuggestionsCity([])}
                        onSuggestionsFetchRequested={({value}) => {
                          setCityValue(value)
                          setSuggestionsCity(getSuggestionsCity(value))
                        }}
                        onSuggestionSelected={(_, {suggestionValue}) =>
                          console.log(suggestionValue)
                        }
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <option value={suggestion}>{suggestion}</option>
                        )}
                        inputProps={{
                          className: 'form-select form-select-solid mb-5 mb-lg-0',
                          placeholder: 'Місто',
                          value: cityValue,
                          onChange: (_, {newValue, method}) => {
                            setCityValue(newValue)
                          },
                        }}
                        highlightFirstSuggestion={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-20px'>
                <div className='col-lg-3 text-gray-800 fs-3 fs-sm-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Посада</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <input
                        ref={positionSelect}
                        type='text'
                        className='form-control form-control-solid'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-20px'>
                <div className='col-lg-3 text-gray-800 fs-3 fs-sm-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Місце роботи</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <input
                        ref={companySelect}
                        type='text'
                        className='form-control form-control-solid'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-20px'>
                <div className='col-lg-3 text-gray-800 fs-3 fs-sm-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Навички</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <Tags
                        tagifyRef={tagifyRef}
                        value={skilsArr}
                        defaultValue={''}
                        onDropdownShow={()=>true}
                        whitelist={allSkillsArr}
                        {...allSkillsArr}
                        showDropdown={true}
                        className='form-control form-control-solid w-100 border-0 min-h-40px'
                        onChange={(e) => {
                          setSkilsArr(
                            (value) => (value = e.detail.tagify.value.map((obj) => obj.value))
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row align-items-center mb-20px pb-20px border-bottom'>
                <div className='col-lg-3 text-gray-800 fs-3 fs-sm-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Років досвіду</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-4 w-50'>
                      <select
                        ref={experienceStartSelect}
                        placeholder='Від'
                        className='form-control form-control-solid mb-5 mb-lg-0'
                        onChange={(e) => {
                          if (experienceStartSelect.current !== null) {
                            experienceStartSelect.current.value = e.target.value
                          }
                        }}
                      >
                        <option value=''>Від</option>
                        {yeas.map((year: string, i: number) => (
                          <option key={i} value={`${year}`}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-lg-4 w-50 '>
                      <select
                        ref={experienceEndSelect}
                        placeholder='До'
                        className='form-control form-control-solid'
                        onChange={(e) => {
                          if (experienceEndSelect.current !== null) {
                            experienceEndSelect.current.value = e.target.value
                          }
                        }}
                      >
                        <option value=''>До</option>
                        {yeas.map((year: string, i: number) => (
                          <option key={i} value={`${year}`}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center justify-content-end'>
                <div className='col-lg-3 d-flex justify-content-center justify-content-lg-end'>
                  <button
                    className='btn btn-primary w-88 fs-3 fs-sm-6  ps-8 pe-8 '
                    onClick={() => createFilterList()}
                  >
                    Знайти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {Search}
