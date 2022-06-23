import React, {FC, useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {useDispatch }from 'react-redux'
import {remove} from '../../features/candidate/candidateSlice'

interface ICandidate {
  user: any
}

const CandidateCard: FC<ICandidate> = ({user}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  const dispatch = useDispatch();

  return (
    <>
      <tr className='border-0' id={user.id}>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px me-5'>
              <img src={toAbsoluteUrl(`${user.photo}`)} alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <Link
                className='text-dark fw-bolder text-hover-primary fs-6'
                to={`user/id=${user.id}`}
              >
                {user.firstName} {user.lastName}
              </Link>
              <Outlet />
              <span className='text-muted fw-bold text-muted d-block fs-7'>{user.specialty}</span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {user.location?.country}, {user.location?.city}
              </span>
            </div>
          </div>
        </td>
        <td>
          {user.checked === 0 ? (
            <span className='bg-danger bg-opacity-25 text-gray-800 fw-bold ps-1 pe-1 rounded-all-4 d-block'>
              Потребує перевірки
            </span>
          ) : null}
        </td>
        <td>
          <span className='text-muted fw-bold text-muted d-block fs-7'>
            {user.skils?.map((skil: any, i: number) =>
              i !== user.skils.length - 1 ? `${skil}, ` : `${skil}`
            )}
          </span>
        </td>
        <td>
          <div className='d-flex justify-content-start flex-shrink-0'>
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
            {user.contacts?.socialLinks.map((link: {name: number; path: string}) =>
              link.name === 0 ? (
                <a
                  href={link.path}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/social/soc011.svg' className='svg-icon-3' />
                </a>
              ) : null
            )}
            {user.contacts?.messengers.map((link: {name: number; link: string}) =>
              link.name === 3 ? (
                <a
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
        <td className='text-end'>
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
                <Link to={`edit/user/id=${user.id}`} className='w-100 h-50px btn btn-active-secondary'>
                  Редагувати
                </Link>
                <button className='w-100 h-50px btn btn-active-secondary' onClick={()=>dispatch(remove(user.id))}>
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
