import React, {useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'
import Swal from 'sweetalert2'

import candidatesApi from '../../../../API/candidates'



function CreateCandidatePage() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)
  const newUser = {
    firstName: '',
    lastName: '',
    location: {
      country: '',
      city: ['']
    },
    files: [],
    specialty: '',
    checked: 1,
    contacts: {
      phone: [''],
      email: [''],
      messengers: [{name:0, path: ''}],
      socialLinks: [{name:0, path: ''}],
    },
    aboutMyself: [],
    positions: [],
    skills: [],
    source: '',
    gdpr: 1
  }

  const [editUser, setEditUser] = useState<any>(newUser)

  const navigate = useNavigate()

  const handleCreateNewCandidate = (user: any) => {
    candidatesApi.createCandidate(user).then((res) => {
      saveCandidate()
      
    }).catch((required)=>{Swal.fire({
      text: `${required.message}`,
      icon: 'error',
      buttonsStyling: false,
      confirmButtonText: 'Добре, зрозумів',
      customClass: {
        confirmButton: 'swal2-confirm btn fw-bold btn-danger mt-5 me-2',
        icon: 'text-danger border-danger',
      },
    });
    })
  }

  function saveCandidate(){
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
      result.isConfirmed && navigate('/candidates')
    })
  }

  return (
    <div className='row'>
      <div className='row pe-0 ps-6'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8 mt-9'>
          <div className='card bg-transparent position-relative'>
            <div className='row card-header border-bottom-0 p-0'>
              <div className='card-title m-0 w-100 justify-content-between h-40px mt-9 mb-9 p-0'>
                <div className='d-flex'>
                  <Link to='/candidates' className='fw-bolder position-lg-absolute end-100 m-0'>
                    <i className='fas fa-arrow-left text-primary fs-4 me-6'></i>
                  </Link>
                  <h2 className='fs-2 fw-boldest'>Новий кандидат</h2>
                </div>

                <Link to={'/add'} className='btn btn-sm btn-light-primary fs-5'>
                  <i className='fas fa-file-import fs-4 me-lg-4'></i>
                  <span className='d-none d-lg-inline-block'>Імпортувати з файлу</span>
                </Link>
              </div>
            </div>
          </div>
          <div ref={infoRef} className='card p-9 pt-8 pt-sm-9 row'>
            <CandidateInfoBlock
              id={Date.now()}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
            <CandidatePhoto url={''} setEditUser={setEditUser} />
          </div>
          <div className='accordion row' id='kt_accordion_1'>
            <CandidateExperience
              experienceRef={experienceRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
            <CandidateContacts
              contactsRef={contactsRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
            <CandidateResume
              resumeRef={resumeRef}
              setEditUser={setEditUser}
              user={editUser}
              labelW={3}
              inputW={9}
            />
          </div>
          <div className='row bg-white p-9 d-flex justify-content-end'>
        <div className='col-lg-12 d-flex flex-center'>
              <button
                className='btn btn-primary d-flex flex-center h-40px '
                onClick={() => handleCreateNewCandidate(editUser)}
              >
                Зберегти кандидата
              </button>
            </div>
          </div>
        </div>
        
        <div className='col-lg-2'>
          <div className='row position-fixed top-25 d-none d-lg-block'>
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

export default CreateCandidatePage
