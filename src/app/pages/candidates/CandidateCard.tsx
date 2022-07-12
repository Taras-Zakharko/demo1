import React, {FC, useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {useDispatch} from 'react-redux'
import {remove} from '../../features/candidate/candidateSlice'
import './CandidateCard.scss'

interface ICandidate {
  user: any
}

const CandidateCard: FC<ICandidate> = ({user}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  const dispatch = useDispatch()

  return (
    <>
      <tr className='border-0' id={user.id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-60px me-5'>
              <img src={toAbsoluteUrl(`${user.photo}`)} alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <div className='d-flex align-items-center'>
                <Link
                  className='text-dark fw-bolder text-hover-primary fs-4'
                  to={`user/id=${user.id}`}
                >
                  {user.firstName} {user.lastName}
                </Link>
                <Outlet />
                {user.checked === 0 ? 
                  <div className='tool'>
                  <KTSVG
                      path='/media/icons/duotune/files/fil028.svg'
                      className='svg-icon-3 ms-3 text-warning'
                    />
                    <span className='tooltiptext card shadow fs-6 text-gray-500'>Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте дані кандидата. </span>
                  </div>
                
                 : null}
              </div>

              <span className='text-muted text-muted text-gray-900 d-block fs-6'>
                {user.specialty}
              </span>
              <span className='text-muted text-muted d-block fs-6'>
                {user.location?.country}, {user.location?.city}
              </span>
            </div>
          </div>
        </td>
        <td className='d-none d-sm-table-cell'>
          <span className='text-muted fw-bold text-muted d-block fs-6'>
            {user.skils?.map((skil: any, i: number) =>
              i !== user.skils.length - 1 ? `${skil}, ` : `${skil}`
            )}
          </span>
        </td>
        <td className='d-none d-sm-table-cell'>
          <div className='d-flex justify-content-end flex-shrink-0'>
            {user.contacts?.email.length > 0 ? (
              <a
                href={'mailto:' + user.contacts.email[0]}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <KTSVG
                  path='/media/icons/duotune/communication/com016.svg'
                  className='svg-icon-3'
                />
              </a>
            ) : null}
            {user.contacts?.socialLinks.map((link: {name: number; path: string}, i: number) =>
              link.name === 0 ? (
                <a
                  key={i}
                  href={link.path}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/social/soc011.svg' className='svg-icon-3' />
                </a>
              ) : null
            )}
            {user.contacts?.messengers.map((link: {name: number; link: string}, i: number) =>
              link.name === 3 ? (
                <a
                  key={i}
                  href={'skype:' + link.link}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG
                    path='/media/icons/duotune/communication/com015.svg'
                    className='svg-icon-3'
                  />
                </a>
              ) : null
            )}
            {user.contacts?.phone.length > 0 ? (
              <a
                href={'tel:' + user.contacts.phone[0]}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <KTSVG
                  path='/media/icons/duotune/communication/com017.svg'
                  className='svg-icon-3'
                />
              </a>
            ) : null}
          </div>
        </td>
        <td className='text-end d-none d-sm-table-cell'>
          <div ref={cardRef} className='d-flex justify-content-end flex-shrink-0 position-relative'>
            <button
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              onClick={() => setopenModal((openModal) => !openModal)}
              id='open-svg-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen053.svg' className='svg-icon-3' />
            </button>
            {openModal ? (
              <div className='card shadow position-absolute top-100 end-50 w-150px z-index-1 modal__card'>
                <Link
                  to={`edit/user/id=${user.id}`}
                  className='w-100 h-50px btn btn-active-primary'
                >
                  Редагувати
                </Link>
                <button
                  className='w-100 h-50px btn btn-active-primary'
                  onClick={() => dispatch(remove(user.id))}
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
