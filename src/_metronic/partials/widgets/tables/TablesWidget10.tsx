/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import CandidateCard from '../../../../app/pages/candidates/CandidateCard'
import {KTSVG} from '../../../helpers'
import {RootState} from '../../../../app/store'
import {useSelector} from 'react-redux'

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
      endYear === 1
    ) {
      setFilterUsers(allUsers)
    }
    if (country !== '') {
      setFilterUsers(allUsers.filter((user) => user.location.country.includes(country)))
    }
    if (city !== '') {
      setFilterUsers(allUsers.filter((user) => user.location.city.includes(city)))
    }
    if (position !== '') {
      setFilterUsers(allUsers.filter((user) => user.experience[0].position.includes(position)))
    }
    if (company !== '') {
      setFilterUsers(allUsers.filter((user) => user.experience[0].company.includes(company)))
    }
    if ((startYear !== 0 && endYear !== 0) || (startYear !== 0 && endYear !== 1)) {
      setFilterUsers(
        allUsers.filter(
          (user) =>
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

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Кандидати</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{allUsers.length} кандидатів</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <Link to={'/candidates/user/create'} className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/abstract/abs053.svg' className='svg-icon-3' />
            Новий кандидат
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body h-auto py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}

            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {filterUsers.map((user: any) => (
                <CandidateCard key={user.id} user={user} />
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
