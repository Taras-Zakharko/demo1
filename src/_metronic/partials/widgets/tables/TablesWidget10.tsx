/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import CandidateCard from '../../../../app/pages/candidates/CandidateCard'
import {toAbsoluteUrl} from '../../../helpers'
import {RootState} from '../../../../app/store'
import {useSelector, useDispatch} from 'react-redux'
import {setUsers} from '../../../../app/features/candidate/candidateSlice'
import candidatesApi from '../../../../API/candidates'

type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const allUsers = useSelector((state: RootState) => state.candidates.users)
  const searchObj = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)


  const handleGetAllCandidate=(city:string, specialty: string, skills: string[])=>{
    candidatesApi.getCandidate(city, specialty, skills)
    .then((response)=>{
      dispatch(setUsers(response.data))
    })
  }

  useEffect(() => {
    
    handleGetAllCandidate(searchObj.city, searchObj.position, searchObj.skils);
    setCurrentPage(1)
  }, [searchObj])

  
  
  const [perPage] = useState(6)
  const lastIndex = currentPage * perPage
  const firstIndex = lastIndex - perPage

  const currentUser = allUsers.slice(firstIndex, lastIndex)

  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(allUsers.length / perPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNum: number) => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage((prew) => prew + 1)
  const prevPage = () => setCurrentPage((prev) => prev - 1)

  let down = 0
  let up = 0

  useEffect(()=>{    
    if(!pageNumbers.includes(currentPage)){
      setCurrentPage(pageNumbers[pageNumbers.length-1])
    }
  }, [allUsers.length])
  
  
  
  
  return (
    <div className={`card ${className} bg-transparent`}>
      {/* begin::Header */}
      <div className='card-header border-0 p-0  w-100'>
        <h3 className='card-title align-items-start flex-column m-0'>
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
          <Link
            to={'/candidates/user/create'}
            className='btn btn-sm d-flex flex-center h-40px btn-primary fs-6'
          >
            <i className='fas fa-plus fs-6 me-sm-4'></i>
            <span className='d-none d-sm-inline-block'>Новий кандидат</span>
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      {allUsers.length > 0 ? (
        <div className='card card-body mt-6 py-3'>
          {/* begin::Table container */}
          <div className='table'>
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
                  if ((down - up) >= 50 && currentPage !== pageNumbers[pageNumbers.length - 1]) {
                    
                    nextPage()
                  }
                  if ((up-down) >= 50 && currentPage !== 1) {
                    prevPage()
                  }
                }}
              >
                {currentUser.map((user: any, i: number) => (
                  <CandidateCard key={i} user={user} />
                ))}
              </tbody>

              {/* end::Table body */}
            </table>
            {allUsers.length > perPage ? (
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

            {/* begin::Table */}

            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
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

      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
