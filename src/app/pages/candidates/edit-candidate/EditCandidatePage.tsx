import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'


function EditCandidate() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)

  

  return (
    <div className='row'>
      <div className='row'>
        <div className='col-lg-2'></div>
        <div className='col-lg-8'>
          <div className='card mb-5 mb-xl-10 position-relative'>
            <div className='card-header border-bottom-0 position-absolute z-index-1 w-100 ps-0'>
              <div className='card-title m-0'>
                <Link to='/candidates/user/*' className='fw-bolder m-0 position-fixed end-75'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr002.svg'
                    className='svg-icon-2x svg-icon-dark me-4'
                  />
                </Link>
                <h2 className='fs-1'>Редагувати картку кандидата</h2>
              </div>
            </div>
          </div>
          <CandidateInfoBlock infoRef={infoRef} />
          <div className='accordion' id='kt_accordion_1'>
            <CandidateExperience experienceRef={experienceRef} />
            <CandidateContacts contactsRef={contactsRef} />
            <CandidateResume resumeRef={resumeRef} />
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='row position-fixed bottom-50'>
            <button
              onClick={() => infoRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})}
              className='btn p-3 text-start ms-3'
            >
              Персональна інформація
            </button>
            <button
              onClick={() =>
                experienceRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-3 text-start ms-3'
            >
              Досвід
            </button>
            <button
              onClick={() =>
                contactsRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-3 text-start ms-3'
            >
              Контакти
            </button>
            <button
              onClick={() =>
                resumeRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
              }
              className='btn p-3 text-start ms-3'
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
            <div className='col-lg-12 d-flex justify-content-between'>
              <button className='btn btn-dark w-250px h-50px'>Зберегти зміни</button>
              <button className='btn text-danger pe-0'>
                <KTSVG
                  path='/media/icons/duotune/general/gen027.svg'
                  className='svg-icon-2x svg-icon-danger ms-4'
                />
                Видалити з бази
              </button>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  )
}

export default EditCandidate
