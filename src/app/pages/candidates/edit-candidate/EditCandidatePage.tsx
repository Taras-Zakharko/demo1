import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'

import candidatesApi from '../../../../API/candidates'


function EditCandidate() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)   

  const navigate = useNavigate();

  

  let idUser = +window.location.pathname.slice(window.location.pathname.lastIndexOf('id=') + 3)
  const [editUser, setEditUser] = useState<any>({})

  const handleGetOneCandidate = (id:number)=>{
    candidatesApi.getSomeCandidate(id)
    .then((response)=>{
      setEditUser(response.data)
    })
  }

  const handleEditOneCandidate = (user: any)=>{
    candidatesApi.editCandidate(user)
    .then(()=>{
      navigate('/candidates')
    })
  }


  const hendleRemoveCandidate = (id: number)=>{
    candidatesApi.removeCandidate(id)
    .then(()=>{
      navigate('/candidates')
      
    })
  }

  useEffect(() => {
    handleGetOneCandidate(idUser);
  }, [])
  

  return (
    <div className='row'>
      <div className='row pe-0 ps-6'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8 mt-9'>
          <div className='card bg-transparent position-relative'>
            <div className='card-header border-bottom-0 ps-0'>
              <div className='card-title m-0 w-100 h-40px mt-9 mb-9'>
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
          <div ref={infoRef} className='card p-9 row'>
            <CandidateInfoBlock id={idUser} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidatePhoto url={editUser.photo} setEditUser={setEditUser} />
          </div>

          <div className='accordion row' id='kt_accordion_1'>
            <CandidateExperience experienceRef={experienceRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidateContacts contactsRef={contactsRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
            <CandidateResume resumeRef={resumeRef} setEditUser={setEditUser} user={editUser} labelW={3} inputW={9}/>
          </div>
          <div className='row bg-white p-9 d-flex justify-content-end'>
            <div className='col-lg-12 w-100 w-lg-60  d-flex justify-content-between align-items-center'>
              <button className='btn btn-primary h-40px' onClick={() => handleEditOneCandidate({...editUser, checked: 1})}>
                Зберегти
              </button>
              <button
                className='btn text-danger fs-6 pe-0'
                onClick={() => hendleRemoveCandidate(idUser)}
              >
                <i className="fas fa-trash text-danger fs-4 me-3"></i>
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
      {/* <div className='row'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8 card p-9'>
          <div className='row d-flex justify-content-end'>
            <div className='col-lg-12 w-100 w-lg-60  d-flex justify-content-between align-items-center'>
              <button className='btn btn-primary h-40px' onClick={() => handleEditOneCandidate({...editUser, checked: 1})}>
                Зберегти
              </button>
              <button
                className='btn text-danger fs-6 pe-0'
                onClick={() => hendleRemoveCandidate(idUser)}
              >
                <i className="fas fa-trash text-danger fs-4 me-3"></i>
                Видалити
              </button>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div> */}
    </div>
  )
}

export default EditCandidate
