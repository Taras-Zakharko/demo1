import React, {FC, useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {setUsers} from '../../features/candidate/candidateSlice'
import './CandidateCard.scss'
import candidatesApi from '../../../API/candidates'
import {RootState} from '../../store'


interface ICandidate {
  user: any
}

const CandidateCard: FC<ICandidate> = ({user}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)
  const searchObj = useSelector((state: RootState) => state.search)

  const handleGetAllCandidate = (city: string, specialty: string, skills: string[]) => {
    candidatesApi.getCandidate(city, specialty, skills).then((response) => {
      dispatch(setUsers(response.data))
    })
  }

  const hendleRemoveCandidate = (id: number) => {
    candidatesApi.removeCandidate(id).then(() => {
      setopenModal(false)
      handleGetAllCandidate(searchObj.city, searchObj.position, searchObj.skils)
    })
  }

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  const dispatch = useDispatch()

  return (
    <>
      <tr className='border-bottom border-dashed pt-20px h-100px pb-20px' id={user.id}>
        <td className='col-12 col-sm-4'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-60px me-5'>
              <img
                src={
                  user.photo
                    ? toAbsoluteUrl(`${user.photo}`)
                    : toAbsoluteUrl(`/media/avatars/blank.png`)
                }
                alt=''
              />
            </div>
            <div className='d-flex justify-content-start flex-column '>
              <div className='d-flex align-items-center '>
                <Link
                  className='text-dark fw-boldest text-hover-primary  fs-3 fs-sm-4'
                  to={`user/id=${user.id}`}
                >
                  {user.firstName === null && user.lastName === null
                    ? '????????? ???? ????????????????????'
                    : user.firstName !== null && user.lastName === null
                    ? `${user.firstName}`
                    : `${user.firstName} ${user.lastName}`}
                </Link>
                <Outlet />
                {user.checked === 0 ? (
                  <span className='tt' data-bs-placement='top' title='???? ???????????? ???????? ???????????? ??????????????????????, ?????? ???????? ?????????????? ??????????????????. ???????? ??????????, ???????????????????????? ???????? ??????????????????.'>
                    <i className="fas fa-exclamation-triangle text-warning me-4 ms-3 fs-6" data-bs-toggle='tooltip' title='Some tooltip text!'></i>
                  </span>
                ) : null}
              </div>

              <span className='text-gray-800 d-block fs-5 fs-sm-6'>
                {user.specialty === null ? '' : `${user.specialty}`}
              </span>
              <span className='text-gray-500 d-block fs-5 fs-sm-6'>
                {user.location.country && user.location.city.length > 0
                  ? `${user.location.country}, ${user.location.city[0]}`
                  : !user.location.country && user.location.city.length > 0
                  ? `${user.location.city[0]}`
                  : user.location.country && user.location.city.length < 1
                  ? `${user.location.country}`
                  : ''}
              </span>
            </div>
          </div>
        </td>
        <td className='d-none d-md-table-cell col-lg-5'>
          <span className='fw-bold text-gray-800 d-block fs-6 '>
            {user.skills?.map((skil: any, i: number) => {
              let str = '';
              if(i<15 && i!==user.skills.length-1){
                str+= `${skil}, `
              } else if(i<15 && i===user.skills.length-1){
                str+=`${skil}.`
              } else if(i===15 && i!==user.skills.length-1){
                str+=`${skil} ...`
              } else if(i>15) {
                return
              }

              return str;
            }
              
            )}
          </span>
        </td>
        <td className='d-none d-sm-table-cell col-lg-3'>
          <div className='d-flex justify-content-end flex-shrink-0'>
            {user.contacts?.email.length > 0 ? (
              <a
                href={'mailto:' + user.contacts.email[0]}
                className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
              >
                <i className='fas fa-envelope fs-4'></i>
              </a>
            ) : null}
            {user.contacts?.socialLinks.map((link: {name: number; path: string}, i: number) =>
              link.name === 0 ? (
                <a
                  key={i}
                  href={link.path}
                  className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                >
                  <i className='fab fa-facebook-square fs-4'></i>
                </a>
              ) : null
            )}
            {user.contacts?.messengers.map((link: {name: number; link: string}, i: number) =>
              link.name === 3 ? (
                <a
                  key={i}
                  href={'skype:' + link.link}
                  className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                >
                  <i className='fab fa-skype fs-4'></i>
                </a>
              ) : null
            )}
            {user.contacts?.phone.length > 0 ? (
              <button
                value={user.contacts?.phone[0]}
                className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
              >
                <i className='fas fa-phone fs-4'></i>
              </button>
            ) : null}
          </div>
        </td>
        <td className='text-end d-none d-sm-table-cell col-lg-1'>
          <div ref={cardRef} className='d-flex justify-content-end flex-shrink-0 position-relative'>
            <button
              className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-1'
              onClick={() => setopenModal((openModal) => !openModal)}
              id='open-svg-1'
            >
              <i className='fas fa-ellipsis-v fs-4'></i>
            </button>
            {openModal ? (
              // <div className='card shadow position-absolute top-100 end-15px w-150px z-index-1 modal__card'>
              //   <Link
              //     to={`edit/user/id=${user.id}`}
              //     className='w-100 h-50px btn btn-active-primary d-flex align-items-center'
              //   >
              //     ????????????????????
              //   </Link>
              //   <button
              //     className='w-100 h-50px btn btn-active-primary text-start'
              //     onClick={() => hendleRemoveCandidate(user.id)}
              //   >
              //     ????????????????
              //   </button>
              //   <Outlet />
              // </div>
              <div className="menu menu-sub menu-sub-dropdown menu-column position-absolute top-100 end-0 w-150px z-index-1 modal__card menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show" data-kt-menu="true" data-popper-placement="bottom-end"  data-popper-reference-hidden="">
																<div className="menu-item px-3">
																	<Link to={`edit/user/id=${user.id}`} className="menu-link px-3">????????????????????</Link>
																</div>
																
																<div className="menu-item px-3">
																	<a className="menu-link px-3"  onClick={() => hendleRemoveCandidate(user.id)} data-kt-users-table-filter="delete_row">????????????????</a>
																</div>
																
															</div>
            ) : null}
          </div>
        </td>
      </tr>
    </>
  )
}

export default CandidateCard
