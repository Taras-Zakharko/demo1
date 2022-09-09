import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'
import Swal from 'sweetalert2'
import candidatesApi from '../../../../API/candidates'

function EditCandidate() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)
  const deleteCandidate = useRef<HTMLButtonElement | null>(null)

  const navigate = useNavigate()

  let idUser = +window.location.pathname.slice(
    +window.location.pathname.lastIndexOf('candidates/') + 11,
    +window.location.pathname.lastIndexOf('/edit')
  )
  const [editUser, setEditUser] = useState<any>({})

  const handleGetOneCandidate = (id: number) => {
    candidatesApi.getSomeCandidate(id).then((response: any) => {
      setEditUser(response.data)
    })
  }

  const handleEditOneCandidate = (user: any) => {
    candidatesApi
      .editCandidate(user)
      .then(() => {
        saveCandidate()
      })
      .catch((required) => {
        Swal.fire({
          text: `${required.message}`,
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Добре, зрозумів',
          customClass: {
            confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-5 me-2',
            icon: 'text-danger border-danger',
          },
        })
      })
  }

  const hendleRemoveCandidate = (id: number) => {
    candidatesApi.removeCandidate(id).then(() => {
      Swal.fire({
        text: `Ви видалили ${editUser.firstName} ${editUser.lastName}!`,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Добре',
        customClass: {
          confirmButton: 'swal2-confirm btn fw-bold btn-primary mt-5 me-2',
          icon: 'text-success border-success',
        },
      }).then((result) => {
        result.isConfirmed && navigate('/candidates')
      })
    })
  }

  useEffect(() => {
    handleGetOneCandidate(idUser)
  }, [])

  if (Array.isArray(editUser)) {
    navigate('/error/404')
  }

  function deleteCandidateFunk() {
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
      result.isConfirmed && hendleRemoveCandidate(editUser.id)
    })
  }

  function saveCandidate() {
    Swal.fire({
      text: `Ви зберегли дані цього кандидата!`,
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Добре, зрозумів',
      customClass: {
        confirmButton: 'swal2-confirm btn fw-bold btn-primary mt-5 me-2',
        icon: 'text-success border-success',
      },
    }).then((result) => {
      result.isConfirmed && navigate(`/candidates/${idUser}`)
    })
  }

  return (
    <div className='row'>
      <div className='row pe-0 ps-6'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8 mt-9'>
          <div className='card bg-transparent position-relative'>
            <div className='card-header border-bottom-0 ps-0'>
              <div className='card-title m-0 w-100 h-40px mt-9 mb-9'>
                <Link
                  to={`/candidates/${idUser}`}
                  className='fw-bolder m-0 position-lg-absolute end-100'
                >
                  <i className='fas fa-arrow-left text-primary fs-4 me-6'></i>
                </Link>
                <h2 className='fs-2 fw-boldest'>Редагування картки кандидата</h2>
              </div>
            </div>
          </div>
          <div ref={infoRef} className='card p-9 pt-8 pt-sm-9 row'>
            <CandidateInfoBlock
              id={idUser}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
            <CandidatePhoto url={editUser.photo} setEditUser={setEditUser} />
          </div>

          <div className='accordion row' id='kt_accordion_1'>
            <CandidateExperience
              experienceRef={experienceRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
          </div>
          <div className='accordion row' id='kt_accordion_2'>
            <CandidateContacts
              contactsRef={contactsRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
          </div>
          <div className='accordion row' id='kt_accordion_3'>
            <CandidateResume
              resumeRef={resumeRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
          </div>
          <div className='row bg-white p-9 d-flex justify-content-end'>
            <div className='col-lg-12 w-100 w-lg-60  d-flex justify-content-between align-items-center'>
              <button
                className='btn btn-primary d-flex flex-center h-40px'
                onClick={() => handleEditOneCandidate({...editUser, checked: 1})}
              >
                Зберегти
              </button>
              <button
                ref={deleteCandidate}
                type='button'
                id='kt_docs_sweetalert_state_warning'
                className='btn text-danger d-flex flex-center fs-5 fs-sm-6 pe-0'
                onClick={() => deleteCandidateFunk()}
              >
                <i className='fas fa-trash text-danger fs-3 fs-sm-4 me-3'></i>
                Видалити
              </button>
            </div>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='row position-fixed top-25 d-none  d-lg-block'>
            <button
              onClick={() => infoRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})}
              className='btn p-0 pt-3 text-start text-gray-800 fw-normal text-hover-primary ms-9 fs-7'
            >
              Персональна інформація
            </button>
            <button
              onClick={() =>
                experienceRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-gray-800 fw-normal text-hover-primary ms-9 fs-7'
            >
              Досвід
            </button>
            <button
              onClick={() =>
                contactsRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-gray-800 fw-normal text-hover-primary ms-9 fs-7'
            >
              Контакти
            </button>
            <button
              onClick={() =>
                resumeRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-gray-800 fw-normal text-hover-primary ms-9 fs-7'
            >
              Додаткова інформація
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCandidate
