import React, {FC, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {SearchComponent} from '../../../assets/ts/components'
import {KTSVG} from '../../../helpers'
import {RootState} from '../../../../app/store'
import {useSelector, useDispatch} from 'react-redux'
import {
  setCountry,
  setCity,
  setCompany,
  setPosition,
  setSkils,
  setYearEnd,
  setYearStart,
} from '../../../../app/features/search/searchSlice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

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

  const countriesSelect = useRef<HTMLSelectElement>(null)
  const citiesSelect = useRef<HTMLSelectElement | null>(null)
  const positionSelect = useRef<HTMLInputElement | null>(null)
  const companySelect = useRef<HTMLInputElement | null>(null)
  const skilsSelect = useRef<HTMLInputElement | null>(null)
  const experienceStartSelect = useRef<HTMLInputElement | null>(null)
  const experienceEndSelect = useRef<HTMLInputElement | null>(null)
  const inputSearch = useRef<HTMLInputElement | null>(null)
  const searchToogleContent = useRef<HTMLDivElement | null>(null)
  const clearFilter = useRef<HTMLButtonElement | null>(null)
  const clearFilter2 = useRef<HTMLButtonElement | null>(null)

  const dispatch = useDispatch()
  const searchObj = useSelector((state: RootState) => state.search)

  const [filterListArr, setFilterListArr] = useState<any>([])

  function createFilterList() {
    let inputValueRes = ''
    let locationValue = ''
    let posinionValue = ''
    let companyValue = ''
    let skilsValue = ''
    let experienceValue = ''
    setFilterListArr([])

    if (inputSearch.current !== null) {
      if (countriesSelect.current?.value !== '' && citiesSelect.current?.value !== '') {
        locationValue = `${countriesSelect.current?.value}, ${citiesSelect.current?.value}`
      } else if (countriesSelect.current?.value !== '' && citiesSelect.current?.value === '') {
        locationValue = `${countriesSelect.current?.value}`
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

      if (skilsSelect.current?.value !== '') {
        skilsValue = `${skilsSelect.current?.value}`
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

      inputValueRes = `${locationValue};${posinionValue};${companyValue};${skilsValue};${experienceValue}`
      setFilterListArr(inputValueRes.split(';'))

      dispatch(setCountry(countriesSelect.current!.value))
      dispatch(setCity(citiesSelect.current!.value))
      dispatch(setPosition(positionSelect.current!.value))
      dispatch(setCompany(companySelect.current!.value))
      dispatch(setSkils(setSkilsArr(skilsSelect.current!.value)))
      dispatch(setYearEnd(+experienceEndSelect.current!.value))
      dispatch(setYearStart(+experienceStartSelect.current!.value))
    }

    document.querySelector('#kt_header_search_toggle')?.classList.remove('active')
    document.querySelector('#kt_header_search_toggle')?.classList.remove('show')
    document.querySelector('#kt_header_search')?.classList.remove('show')
    document.querySelector('#kt_header_search')?.classList.remove('menu-dropdown')
    searchToogleContent.current!.classList.remove('show')
  }

  filterListArr.map((str: string) =>{
    if(str !== ''){
      clearFilter.current!.classList.add('d-sm-block');
      clearFilter2.current!.classList.remove('d-none');
      clearFilter2.current!.classList.add('d-sm-none');
      
    }
  }
    
  )

  function clearSearchForm() {
    countriesSelect.current!.value = ''
    citiesSelect.current!.value = ''
    positionSelect.current!.value = ''
    companySelect.current!.value = ''
    skilsSelect.current!.value = ''
    experienceStartSelect.current!.value = ''
    experienceEndSelect.current!.value = ''
    inputSearch.current!.value = ''

    dispatch(setCountry(''))
    dispatch(setCity(''))
    dispatch(setPosition(''))
    dispatch(setCompany(''))
    dispatch(setSkils([]))
    dispatch(setYearEnd(1))
    dispatch(setYearStart(0))
    setFilterListArr([])
    clearFilter.current!.classList.remove('d-sm-block')
    clearFilter2.current!.classList.add('d-none')
  }

  function setSkilsArr(str: string) {
    let arr = str
      .replaceAll(' ', ',')
      .split(',')
      .filter((str) => str !== '')
    return arr
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
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search')

    // Search handler
    searchObject!.on('kt.search.process', processs)
    // Clear handler
    searchObject!.on('kt.search.clear', clear)
  }, [])

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
          className='d-flex align-items-center position-relative w-100 mw-lg-750px'
          data-kt-search-element='toggle'
          id='kt_header_search_toggle'
        >
          <button className='d-sm-none btn-sm text-gray-500 me-1 p-2 text-active-primary btn btn-active-light-primary'>
            <i className='fas fa-search ms-1 fs-2'></i>
          </button>

          <input
            ref={inputSearch}
            type='text'
            disabled
            className='form-control form-control-solid pe-10 d-none d-sm-block h-40px justify-content-end'
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
            className=' btn p-0 position-absolute cursor-pointer end-10px d-none '
            onClick={() => clearSearchForm()}
          >
            <KTSVG
              path='/media/icons/duotune/abstract/abs012.svg'
              className='svg-icon-1x svg-icon-gray-500 ms-4 '
            />
          </button>
          <div
            ref={searchToogleContent}
            data-kt-search-element='content'
            className='menu menu-sub menu-sub-dropdown mt-4 mt-sm-0 p-7 w-100 position-sm-absolute'
          >
            <div
              className={`${menuState === 'main' ? '' : 'd-none'}`}
              ref={wrapperElement}
              data-kt-search-element='wrapper'
            >
              <div className='row align-items-center mb-4'>
                <div className='position-relative'>
                  <input
                    type='text'
                    className='form-control form-control-solid pe-10 mb-6 d-sm-none h-40px justify-content-end'
                    placeholder='Пошук'
                    disabled
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
                    <KTSVG
                      path='/media/icons/duotune/abstract/abs012.svg'
                      className='svg-icon-1x svg-icon-gray-500 ms-4 '
                    />
                  </button>
                </div>

                <div className='col-lg-3 fs-6'>
                  <label htmlFor='' className='fs-6 mb-5 mb-lg-0'>
                    Локація
                  </label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <select
                        ref={countriesSelect}
                        name='country'
                        id='country'
                        className='form-select form-select-solid mb-5 mb-lg-0'
                        aria-label='Select example'
                        onChange={(e) => {
                          if (countriesSelect.current !== null) {
                            setMyCountry((country) => {
                              country = countries.filter(
                                (country) => country.country === e.target.value
                              )

                              return country
                            })
                            countriesSelect.current.value = e.target.value
                            // dispatch(setCountry(e.target.value))
                          }
                        }}
                      >
                        <option value=''>Країна</option>
                        {countries.map((country, i) => {
                          return (
                            <option key={i} value={country.country}>
                              {country.country}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='col-lg-6'>
                      <select
                        ref={citiesSelect}
                        name='town'
                        id='town'
                        className='form-select form-select-solid mb-5 mb-lg-0'
                        aria-label='Select example'
                        onChange={(e) => {
                          if (citiesSelect.current !== null) {
                            citiesSelect.current.value = e.target.value
                          }
                          // dispatch(setCity(e.target.value))
                        }}
                      >
                        <option value=''>Місто</option>
                        {myTowns.map((town, i) => (
                          <option key={i} value={town}>
                            {town}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-4'>
                <div className='col-lg-3 fs-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Посада</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <input
                        ref={positionSelect}
                        type='text'
                        className='form-control form-control-solid'
                        // onChange={(e)=>dispatch(setPosition(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-4'>
                <div className='col-lg-3 fs-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Місце роботи</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <input
                        ref={companySelect}
                        type='text'
                        className='form-control form-control-solid'
                        // onChange={(e)=>dispatch(setCompany(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-4'>
                <div className='col-lg-3 fs-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Навички</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <input
                        ref={skilsSelect}
                        type='text'
                        className='form-control form-control-solid'
                        // onInput={(e)=> {setSkilsArr(e.currentTarget.value)}
                        // }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row align-items-center mb-4'>
                <div className='col-lg-3 fs-6 mb-5 mb-lg-0'>
                  <label htmlFor=''>Років досвіду</label>
                </div>
                <div className='col-lg-9'>
                  <div className='row'>
                    <div className='col-lg-4 w-50'>
                      <input
                        ref={experienceStartSelect}
                        type='number'
                        placeholder='Від'
                        className='form-control form-control-solid mb-5 mb-lg-0'
                        min={0}
                        max={100}
                        // onChange={(e)=>dispatch(setYearStart(+e.target.value))}
                      />
                    </div>
                    <div className='col-lg-4 w-50 '>
                      <input
                        ref={experienceEndSelect}
                        type='number'
                        placeholder='До'
                        className='form-control form-control-solid'
                        min={1}
                        max={100}
                        // onChange={(e)=>dispatch(setYearEnd(+e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mb-4 justify-content-end'>
                <div className='col-lg-3 d-flex justify-content-center justify-content-lg-end'>
                  <button
                    className='btn btn-primary w-88 fs-5 fs-6 ps-8 pe-8 '
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
