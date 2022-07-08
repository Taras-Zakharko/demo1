/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import CandidateCard from '../../../../app/pages/candidates/CandidateCard'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {RootState} from '../../../../app/store'
import {useSelector} from 'react-redux'
import { useAuth } from '../../../../app/modules/auth'

type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const allUsers = useSelector((state: RootState) => state.candidates.users)
  const searchObj = useSelector((state: RootState) => state.search)


  const [filterUsers, setFilterUsers] = useState<any>(allUsers)

  function filterUsersFunk(
    country: string,
    city: string,
    position: string,
    company: string,
    skils: string[],
    startYear: number,
    endYear: number
  ) {
    if (
      country === '' &&
      city === '' &&
      position === '' &&
      company === '' &&
      skils.length === 0 &&
      startYear === 0 &&
      (endYear === 0 || endYear === 1)
    ) {
      setFilterUsers(allUsers)
    } else if (startYear === 0 && endYear === 0) {
      setFilterUsers(
        allUsers.filter(
          (user: any) =>
            user.location.country.includes(country) &&
            user.location.city.includes(city) &&
            user.experience[0].position.toLowerCase().includes(position.toLowerCase()) &&
            user.experience[0].company.toLowerCase().includes(company.toLowerCase())
        )
      )
    } else {
      setFilterUsers(
        allUsers.filter(
          (user: any) =>
            user.location.country.includes(country) &&
            user.location.city.includes(city) &&
            user.experience[0].position.toLowerCase().includes(position.toLowerCase()) &&
            user.experience[0].company.toLowerCase().includes(company.toLowerCase()) &&
            user.experience[0].yearsExperience >= startYear &&
            user.experience[0].yearsExperience <= endYear
        )
      )
    }
  }

  useEffect(() => {
    filterUsersFunk(
      searchObj.country,
      searchObj.city,
      searchObj.position,
      searchObj.company,
      searchObj.skils,
      searchObj.yearStart,
      searchObj.yearEnd
    )
  }, [searchObj])

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(6)
  const lastIndex = currentPage * perPage
  const firstIndex = lastIndex - perPage

  const currentUser = filterUsers.slice(firstIndex, lastIndex)

  const pageNumbers: any[] = []

  for (let i = 1; i <= Math.ceil(filterUsers.length / perPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNum: number) => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage((prew) => prew + 1)
  const prevPage = () => setCurrentPage((prev) => prev - 1)

  let down = 0
  let up = 0

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-2 mb-1'>Кандидати</span>
          <span className='text-muted mt-1 fw-bold fs-6'>{allUsers.length} кандидатів</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <Link to={'/candidates/user/create'} className='btn btn-sm btn-primary fs-6'>
            <KTSVG path='/media/icons/duotune/abstract/abs053.svg' className='svg-icon-3' />
            <span className='d-none d-sm-inline-block'>Новий кандидат</span>
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body h-auto py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {filterUsers.length > 0 ? (
            <>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 candidate__list'>
                {/* begin::Table head */}

                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody
                  onTouchStart={(e) => {
                    down = e.changedTouches[0].clientX
                  }}
                  onTouchEnd={(e) => {
                    up = e.changedTouches[0].clientX
                    if (down > up && currentPage !== 1) {
                      prevPage()
                    }
                    if (down < up && currentPage !== pageNumbers[pageNumbers.length - 1]) {
                      nextPage()
                    }
                  }}
                >
                  {currentUser.map((user: any) => (
                    <CandidateCard key={user.id} user={user} />
                  ))}
                </tbody>

                {/* end::Table body */}
              </table>
              {filterUsers.length > perPage ? (
                <ul className='pagination '>
                  {currentPage === 1 ? (
                    <li className='page-item previous disabled'>
                      <a href='#' className='page-link' onClick={() => prevPage()}>
                        <i className='previous'></i>
                      </a>
                    </li>
                  ) : (
                    <li className='page-item previous'>
                      <a href='#' className='page-link' onClick={() => prevPage()}>
                        <i className='previous'></i>
                      </a>
                    </li>
                  )}
                  {pageNumbers.map((num) => {
                    return currentPage === num ? (
                      <li key={num} className='page-item active'>
                        <a href='#' className='page-link' onClick={() => paginate(num)}>
                          {num}
                        </a>
                      </li>
                    ) : (
                      <li key={num} className='page-item'>
                        <a href='#' className='page-link' onClick={() => paginate(num)}>
                          {num}
                        </a>
                      </li>
                    )
                  })}
                  {currentPage === pageNumbers[pageNumbers.length - 1] ? (
                    <li className='page-item next disabled'>
                      <a href='#' className='page-link' onClick={() => nextPage()}>
                        <i className='next'></i>
                      </a>
                    </li>
                  ) : (
                    <li className='page-item next'>
                      <a href='#' className='page-link' onClick={() => nextPage()}>
                        <i className='next'></i>
                      </a>
                    </li>
                  )}
                </ul>
              ) : null}
            </>
          ) : (
            <div className='w-100 d-flex flex-center flex-column h-500px'>
              <img
                src={toAbsoluteUrl(`media/avatars/blank.png`)}
                alt=''
                className='w-100px h-100px rounded-circle'
              />
              <p className='fs-4 text-muted mt-3'>Не знайдено жодного кандидата</p>
            </div>
          )}
          {/* begin::Table */}

          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
