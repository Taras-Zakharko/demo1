/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CandidateCard from '../../../../app/pages/candidates/CandidateCard'
import {KTSVG} from '../../../helpers'


type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const [appState, setAppState] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'https://preview.keenthemes.com/theme-api/api/users/query';
    axios.get(apiUrl).then((resp) => {
      const allPersons = resp.data;
      setAppState(allPersons.data);
    });
  }, [setAppState]);
  console.log(appState);
  
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Кандидати</span>
          <span className='text-muted mt-1 fw-bold fs-7'>123 кандидатів</span>
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
              {appState.map((arr, i) => <CandidateCard key={i}/>)}
              
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
