/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CandidateCard from '../../../../app/pages/candidates/CandidateCard'
import {KTSVG} from '../../../helpers'
import { RootState } from '../../../../app/store'
import { useSelector, useDispatch } from 'react-redux'


type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const allUsers = useSelector((state: RootState) => state.candidates.users)
  
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
              {allUsers.map((arr) => <CandidateCard key={arr.id} user={arr}/>)}
              
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
