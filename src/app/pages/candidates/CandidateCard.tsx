import React, {FC, useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useDispatch} from 'react-redux'
import {setUsers} from '../../features/candidate/candidateSlice'
import './CandidateCard.scss'
import candidatesApi from '../../../API/candidates'


interface ICandidate {
  user: any
}

const CandidateCard: FC<ICandidate> = ({user}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)

  const handleGetAllCandidate=()=>{
    candidatesApi.getCandidate()
    .then((response)=>{
      dispatch(setUsers(response.data))
    })
  }

  const hendleRemoveCandidate = (id: number)=>{
    candidatesApi.removeCandidate(id)
    .then(()=>{
      setopenModal(false);
      handleGetAllCandidate();
    })
  }

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  const dispatch = useDispatch()
  

  return (
    <>
      <tr className='border-0' id={user.id}>
        <td className='col-12 col-sm-4'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-60px me-5'>
              <img src={(user.photo) ? toAbsoluteUrl(`${user.photo}`) : toAbsoluteUrl(`/media/avatars/blank.png`)} alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <div className='d-flex align-items-center'>
                <Link
                  className='text-dark fw-bolder text-hover-primary fs-4'
                  to={`user/id=${user.id}`}
                >
                  {(user.firstName ===null && user.lastName === null) ? 'Ім’я не розпізнано' : (user.firstName !==null && user.lastName === null) ?`${user.firstName}` :`${user.firstName} ${user.lastName}`}
                </Link>
                <Outlet />
                {user.checked === 0 ? 
                  <div className='tool'>
                  <i className="fas fa-exclamation-triangle text-warning me-4 ms-3"></i>
                    <span className='tooltiptext card shadow fs-6 text-gray-500'>Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте дані кандидата. </span>
                  </div>
                
                 : null}
              </div>

              <span className='text-gray-800 d-block fs-6'>
                {(user.specialty === null ) ? '' : `${user.specialty}`}
              </span>
              <span className='text-gray-500 d-block fs-6'>
                {(user.location && user.location.length > 1) ? `${user.location[0]}, ${user.location[1]}` : ''}
              </span>
            </div>
          </div>
        </td>
        <td className='d-none d-md-table-cell col-lg-5'>
          <span className='fw-bold text-gray-800 d-block fs-6'>
            {user.skills?.map((skil: any, i: number) =>
              i !== user.skills.length - 1 ? `${skil}, ` : `${skil}`
            )}
          </span>
        </td>
        <td className='d-none d-sm-table-cell col-lg-3'>
          <div className='d-flex justify-content-end flex-shrink-0'>
            {user.contacts?.email.length > 0 ? (
              <a
                href={'mailto:' + user.contacts.email[0]}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
              >
                <i className="fas fa-envelope fs-4"></i>
              </a>
            ) : null}
            {user.contacts?.socialLinks.map((link: {name: number; path: string}, i: number) =>
              link.name === 0 ? (
                <a
                  key={i}
                  href={link.path}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                >
                  <i className="fab fa-facebook-square fs-4"></i>
                </a>
              ) : null
            )}
            {user.contacts?.messengers.map((link: {name: number; link: string}, i: number) =>
              link.name === 3 ? (
                <a
                  key={i}
                  href={'skype:' + link.link}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
                >
                  <i className="fab fa-skype fs-4"></i>
                </a>
              ) : null
            )}
            {user.contacts?.phone.length > 0 ? (
              <a
                href={'tel:' + user.contacts?.phone[0]}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-3'
              >
                <i className="fas fa-phone fs-4"></i>
              </a>
            ) : null}
          </div>
        </td>
        <td className='text-end d-none d-sm-table-cell col-lg-1'>
          <div ref={cardRef} className='d-flex justify-content-end flex-shrink-0 position-relative'>
            <button
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              onClick={() => setopenModal((openModal) => !openModal)}
              id='open-svg-1'
            >
              <i className="fas fa-ellipsis-v fs-4"></i>
            </button>
            {openModal ? (
              <div className='card shadow position-absolute top-100 end-15px w-150px z-index-1 modal__card'>
                <Link
                  to={`edit/user/id=${user.id}`}
                  className='w-100 h-50px btn btn-active-primary'
                >
                  Редагувати
                </Link>
                <button
                  className='w-100 h-50px btn btn-active-primary'
                  onClick={() => hendleRemoveCandidate(user.id)}
                >
                  Видалити
                </button>
                <Outlet />
              </div>
            ) : null}
          </div>
        </td>
      </tr>
    </>
  )
}

export default CandidateCard
