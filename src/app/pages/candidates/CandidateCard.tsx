import React, {FC, useRef, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useClickOutside} from '../../../hooks'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {setUsers} from '../../features/candidate/candidateSlice'
import candidatesApi from '../../../API/candidates'
import {RootState} from '../../store'
import Swal from 'sweetalert2'

interface ICandidate {
  user: any
  page: number
}

const CandidateCard: FC<ICandidate> = ({user, page}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setopenModal] = useState<boolean>(false)
  const searchObj = useSelector((state: RootState) => state.search)

  const handleGetAllCandidate = (city: string, specialty: string, skills: string[]) => {
    candidatesApi.getCandidate(city, specialty, skills,page).then((response: any) => {
      dispatch(setUsers(response.data))
    })
  }

  const hendleRemoveCandidate = (id: number) => {
    candidatesApi.removeCandidate(id).then(() => {
      setopenModal(false)
      Swal.fire({
        text: `Ви видалили ${user.firstName} ${user.lastName}!`,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Добре',
        customClass: {
          confirmButton: 'swal2-confirm btn fw-bold btn-primary mt-5 me-2',
          icon: 'text-success border-success',
        },
      })
      
      handleGetAllCandidate(searchObj.city, searchObj.position, searchObj.skils)
    })
  }

  useClickOutside([cardRef], () => {
    setopenModal(false)
  })

  const dispatch = useDispatch()

  function deleteCandidateFunk(btn: any) {
    Swal.fire({
      text: `Ви точно хочете видалити кандидата!`,
      icon: 'error',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Так, видалити',
      cancelButtonText: 'Ні',
      customClass: {
        confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-5 me-2',
        cancelButton: 'swal2-cancel btn fw-bold btn-primary mt-5 ms-2',
        icon: 'text-danger border-danger',
      },
    }).then((result) => {
      result.isConfirmed && hendleRemoveCandidate(user.id)
    })
  }

  function copyContacts(el: any) {
    navigator.clipboard
      .writeText(el.value)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Error in copying text: ', err)
      })
  }
  

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
                  to={(user.checked === 1) ? `${user.id}`: `/add/check-data/${user.id}`}
                >
                  {user.firstName === null && user.lastName === null
                    ? 'Ім’я не розпізнано'
                    : user.firstName !== null && user.lastName === null
                    ? `${user.firstName}`
                    : `${user.firstName} ${user.lastName}`}
                </Link>
                <Outlet />
                {user.checked === 0 ? (
                  <span
                    className='tt'
                    data-bs-placement='top'
                    title='Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте дані кандидата.'
                  >
                    <i
                      className='fas fa-exclamation-triangle text-warning me-4 ms-3 fs-6'
                      data-bs-toggle='tooltip'
                      title='Some tooltip text!'
                    ></i>
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
              let str = ''
              if (i < 15 && i !== user.skills.length - 1) {
                str += `${skil}, `
              } else if (i < 15 && i === user.skills.length - 1) {
                str += `${skil}.`
              } else if (i === 15 && i !== user.skills.length - 1) {
                str += `${skil} ...`
              } else if (i > 15) {
                return
              }

              return str
            })}
          </span>
        </td>
        <td className='d-none d-sm-table-cell col-lg-3'>
          <div className='d-flex justify-content-end flex-shrink-0'>
            {user.contacts?.email.length > 0 ? (
              <button
                className='popover-btn btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                data-bs-toggle='popover'
                data-bs-trigger='focus'
                data-bs-custom-class='popover-inverse popover-dark'
                data-bs-placement='top'
                title='Скопійовано'
                onClick={(e) => copyContacts(e.target)}
              >
                <i className='fas fa-envelope fs-4'></i>
              </button>
            ) : null}
            {user.contacts?.socialLinks.map((link: {name: number; path: string}, i: number) =>
              link.name === 0 ? (
                <a
                  key={i}
                  href={link.path}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                >
                  <i className='fab fa-facebook-square fs-4'></i>
                </a>
              ) : null
            )}
            {user.contacts?.messengers.map((link: {name: number; link: string}, i: number) =>
              link.name === 3 ? (
                <button
                  key={i}
                  value={link.link}
                  className='btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                  data-bs-toggle='popover'
                  data-bs-trigger='focus'
                  data-bs-custom-class='popover-inverse popover-dark'
                  data-bs-placement='top'
                  title='Скопійовано'
                  onClick={(e) => copyContacts(e.target)}
                >
                  <i className='fab fa-skype fs-4'></i>
                </button>
              ) : null
            )}
            {user.contacts?.phone.length > 0 ? (
              <button
                type='button'
                value={user.contacts?.phone[0]}
                className='popover-btn btn btn-icon btn-bg-light bg-hover-light-primary btn-active-color-primary btn-sm me-3'
                data-bs-toggle='popover'
                data-bs-trigger='focus'
                data-bs-custom-class='popover-inverse popover-dark'
                data-bs-placement='top'
                title='Скопійовано'
                onClick={(e) => copyContacts(e.target)}
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
              <div
                className='menu menu-sub menu-sub-dropdown menu-column position-absolute top-100 end-0 w-150px z-index-1 modal__card menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show'
                data-kt-menu='true'
                data-popper-placement='bottom-end'
                data-popper-reference-hidden=''
              >
                <div className='menu-item px-3'>
                  <Link to={`${user.id}/edit`} className='menu-link px-3'>
                    Редагувати
                  </Link>
                </div>

                <div className='menu-item px-3'>
                  <a
                    className='menu-link px-3 fs-7'
                    onClick={(e) => deleteCandidateFunk(e.target)}
                    data-kt-users-table-filter='delete_row'
                  >
                    Видалити
                  </a>
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
