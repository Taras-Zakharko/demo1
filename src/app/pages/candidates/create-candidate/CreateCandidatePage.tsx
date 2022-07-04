import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'


import { useDispatch } from 'react-redux'
import { create} from '../../../features/candidate/candidateSlice'

interface IUserObj {
  id: number,
  photo: string,
  firstName: string,
  lastName: string,
  location: {
    country: string,
    city: string
  },
  specialty: string,
  checked: number,
  experience: object[
    
  ],
  skils: string[],
  contacts: {
    phone: string[],
    email: string[],
    messengers: object[],
    socialLinks: object[]
  },
  aboutMyself: {
    text: string,
    file: object[],
    GDPR: number,
    source: string
  }
}



function CreateCandidatePage() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)
  const newUser = {
    id: Date.now(),
    photo: "",
    firstName: "",
    lastName: "",
    location: {
      country: "",
      city: ""
    },
    specialty: "",
    checked: 1,
    experience: [
      {
        company: '',
        position: '',
        yearsExperience: 0
      }
    ],
    skils: [],
    contacts: {
      phone: [],
      email: [],
      messengers: [
        
      ],
      socialLinks: [
        
      ]
    },
    aboutMyself: {
      text: "",
      file: [],
      GDPR: 0,
      source: ""
    }
  }

  const [editUser, setEditUser] = useState<IUserObj>(newUser)



  const dispatch = useDispatch()

  return (
    <div className='row'>
      <div className='row'>
        <div className='col-lg-1'></div>
        <div className='col-lg-9'>
          <div className='card mb-5 mb-xl-10 position-relative'>
            <div className='card-header border-bottom-0 position-absolute z-index-1 w-100 p-0'>
              <div className='card-title m-0 w-100 justify-content-between'>
                <Link to='/candidates' className='fw-bolder m-0 position-fixed end-85'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr002.svg'
                    className='svg-icon-2x svg-icon-dark me-4'
                  />
                </Link>
                <h2 className='fs-2 fw-boldest'>Новий кандидат</h2>
                <Link to={'/add'} className='btn btn-sm btn-light-primary fs-5'>
                <KTSVG
                    path='/media/icons/duotune/files/fil029.svg'
                    className='svg-icon-1x svg-icon-dark me-4'
                  />
                  Імпортувати з файлу
                </Link>
              </div>
            </div>
          </div>
          <div ref={infoRef} className='card p-10 mt-20 flex-row'>
            <CandidateInfoBlock id={Date.now()} setEditUser={setEditUser} user={editUser}/>
            <CandidatePhoto url={'/media/avatars/blank.png'} setEditUser={setEditUser}/>
          </div>
          <div className='accordion' id='kt_accordion_1'>
            <CandidateExperience experienceRef={experienceRef} setEditUser={setEditUser} user={editUser}/>
            <CandidateContacts contactsRef={contactsRef} setEditUser={setEditUser} user={editUser}/>
            <CandidateResume resumeRef={resumeRef} setEditUser={setEditUser} user={editUser}/>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='row position-fixed top-25'>
            <button
              onClick={() => infoRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})}
              className='btn p-0 pt-3 text-start text-dark text-hover-primary ms-3 fs-8'
            >
              Персональна інформація
            </button>
            <button
              onClick={() =>
                experienceRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-dark text-hover-primary ms-3 fs-8'
            >
              Досвід
            </button>
            <button
              onClick={() =>
                contactsRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-dark text-hover-primary ms-3 fs-8'
            >
              Контакти
            </button>
            <button
              onClick={() =>
                resumeRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-0 pt-3 text-start text-dark text-hover-primary ms-3 fs-8'
            >
              Додаткова інформація
            </button>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8'>
          <div className='row'>
            <div className='col-lg-12 d-flex flex-center'>
              <Link to={'/candidates'} className='btn btn-primary h-50px ' onClick={() => dispatch(create(editUser))}>Зберегти кандидата</Link>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  )
}

export default CreateCandidatePage
