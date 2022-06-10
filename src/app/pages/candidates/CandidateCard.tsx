import React, {useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'

const CandidateCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  return (
    <>
      <tr>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px me-5'>
              <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <Link className='text-dark fw-bolder text-hover-primary fs-6' to={`user/id=1`}>
                Анжеліка Капустянко
              </Link>
              <Outlet />
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                Junior Web designer
              </span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>Київ, Україна</span>
            </div>
          </div>
        </td>
        <td>
          <span className='bg-danger bg-opacity-25 text-gray-800 fw-bold ps-1 pe-1 rounded-all-4 d-block'>
            Потребує перевірки
          </span>
        </td>
        <td>
          <span className='text-muted fw-bold text-muted d-block fs-7'>
            Web design, User experience, Analytics
          </span>
        </td>
        <td>
          <div className='d-flex justify-content-end flex-shrink-0'>
            <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/media/icons/duotune/communication/com016.svg' className='svg-icon-3' />
            </a>
            <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/media/icons/duotune/social/soc011.svg' className='svg-icon-3' />
            </a>

            <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/media/icons/duotune/communication/com015.svg' className='svg-icon-3' />
            </a>
            <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/media/icons/duotune/communication/com017.svg' className='svg-icon-3' />
            </a>
          </div>
        </td>
        <td className='text-end'>
          <div ref={cardRef} className='d-flex justify-content-end flex-shrink-0 position-relative'>
            <button
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              onClick={() => setopenModal(openModal => !openModal)}
              id='open-svg-1'
            >
              <KTSVG path='/media/icons/duotune/general/gen053.svg' className='svg-icon-3' />
            </button>
            {openModal ? (
              <div className='card shadow position-absolute top-100 end-50 w-150px z-index-1 modal__card'>
                <Link to='user/edit' className='w-100 h-50px btn btn-active-secondary'>
                  Редагувати
                </Link>
                <Link to='' className='w-100 h-50px btn btn-active-secondary'>
                  Видалити
                </Link>
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
