import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import CandidateInfoBlock from '../modules/CandidateInfoBlock'
import CandidateExperience from '../modules/CandidateExperience'
import CandidateContacts from '../modules/CandidateContacts'
import CandidateResume from '../modules/CandidateResume'
import CandidatePhoto from '../modules/CandidatePhoto'

function CreateCandidatePage() {
  const infoRef = useRef<any>(null)
  const experienceRef = useRef<any>(null)
  const contactsRef = useRef<any>(null)
  const resumeRef = useRef<any>(null)

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
                <h2 className='fs-1'>Новий кандидат</h2>
                <Link to={'/add'} className='btn btn-sm btn-light-primary fs-5'>
                  Імпортувати з файлу
                </Link>
              </div>
            </div>
          </div>
          <div ref={infoRef} className='card p-10 mt-20 mb-6 flex-row'>
            <CandidateInfoBlock />
            <CandidatePhoto url={'/media/avatars/blank.png'}/>
          </div>
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
            <div className='col-lg-12 d-flex flex-center'>
              <button className='btn btn-dark w-250px h-50px '>Створити кандидата</button>
            </div>
          </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  )
}

export default CreateCandidatePage
