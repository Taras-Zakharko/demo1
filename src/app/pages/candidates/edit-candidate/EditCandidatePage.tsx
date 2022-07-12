import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'

import { RootState } from '../../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import {edit, remove} from '../../../features/candidate/candidateSlice'

interface IUserObj {
  id: number
  photo: string
  firstName: string
  lastName: string
  location: {
    country: string
    city: string
  }
  specialty: string
  checked: number
  experience: [
    {
      company: string
      position: string
      startWorking: number
      endWorking: number
    }
  ]
  skils: [string]
  contacts: {
    phone: [string]
    email: [string]
    messengers: [
      {
        name: number
        link: string
      }
    ]
    socialLinks: [
      {
        name: number
        path: string
      }
    ]
  }
  aboutMyself: {
    text: string
    file: {}
    GDPR: number
    source: string
  }
}

function EditCandidate() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)

  const dispatch = useDispatch()

  let idUser = +window.location.pathname.slice(window.location.pathname.lastIndexOf('id=') + 3)
  const allUsers = useSelector((state: RootState) => state.candidates.users);
  const [editUser, setEditUser] = useState<IUserObj>(allUsers[0])

  useEffect(()=>{
    allUsers.map((user:any) => (user.id === idUser) ? setEditUser(user) : user)
  }, [allUsers, idUser])

  
  

  return (
    <div className='row'>
      <div className='row'>
        <div className='col-lg-1'></div>
        <div className='col-lg-9'>
          <div className='card mb-5 mb-xl-10 position-relative'>
            <div className='card-header border-bottom-0 position-absolute z-index-1 w-100 ps-0'>
              <div className='card-title m-0 w-100'>
                <Link
                  to={`/candidates/user/id=${idUser}`}
                  className='fw-bolder m-0 position-lg-absolute end-100'
                >
                  <i className="fas fa-arrow-left text-primary fs-4 me-6"></i>
                </Link>
                <h2 className='fs-2 fw-boldest'>Редагування картки кандидата</h2>
              </div>
            </div>
          </div>
          <div ref={infoRef} className='card p-10 mt-20 row'>
            <CandidateInfoBlock id={idUser} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidatePhoto url={editUser.photo} setEditUser={setEditUser} />
          </div>

          <div className='accordion row' id='kt_accordion_1'>
            <CandidateExperience experienceRef={experienceRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidateContacts contactsRef={contactsRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidateResume resumeRef={resumeRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
          </div>
        </div>
        <div className='col-lg-2'>
        <div className='row position-fixed top-25 d-none d-lg-block'>
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
      <div className='row'>
        <div className='col-lg-1'></div>
        <div className='col-lg-9 card p-9'>
          <div className='row d-flex justify-content-end'>
            <div className='col-lg-12 w-100 w-lg-60  d-flex justify-content-between align-items-center'>
              <Link to={'/candidates'} className='btn btn-primary h-40px' onClick={() => dispatch(edit(editUser))}>
                Зберегти
              </Link>
              <Link
                to={'/candidates'}
                className='btn text-danger fs-6 pe-0'
                onClick={() => dispatch(remove(idUser))}
              >
                <i className="fas fa-trash text-danger fs-4 me-3"></i>
                Видалити
              </Link>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  )
}

export default EditCandidate
