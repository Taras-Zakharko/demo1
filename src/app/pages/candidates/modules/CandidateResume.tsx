import React, {FC} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

interface ICandidateContacts {
  resumeRef?: any
  setEditUser?: any
  user?: any
}

const CandidateResume: FC<ICandidateContacts> = ({resumeRef, setEditUser, user}) => {
  

  

  return (
    <div ref={resumeRef} className='accordion-item w-100'>
      <h2 className='accordion-header' id='kt_accordion_1_header_3'>
        <button
          className='accordion-button fs-4 fw-boldest'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_accordion_1_body_3'
          aria-expanded='false'
          aria-controls='kt_accordion_1_body_3'
        >
          Резюме
        </button>
      </h2>
      <div
        id='kt_accordion_1_body_3'
        className='accordion-collapse collapse show'
        aria-labelledby='kt_accordion_1_header_3'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body'>
          <div className='row border-bottom mb-4'>
            <div className='col-lg-12'>
              <textarea
                name='resume'
                id='resume'
                className='w-100 h-150px p-3 form-control form-control-solid'
                onChange={(e)=>setEditUser((user: any) => ({...user, aboutMyself: ({...user.aboutMyself, text: e.target.value})}))}
                value={user.aboutMyself.text}
              ></textarea>
            </div>
            <div className='col-lg-12'>
              <label htmlFor="addFileResume" className='btn text-primary ps-0'>
                <KTSVG
                  path='/media/icons/duotune/communication/com008.svg'
                  className='svg-icon-2x svg-icon-primary me-4'
                />
                Прикріпити файл</label>
              <input type='file' id='addFileResume' name='addFileResume' className='d-none' accept='.txt, .doc, .docx' onChange={(e)=>setEditUser((user: any) => ({...user, aboutMyself: ({...user.aboutMyself, file: ([...user.aboutMyself.file, e.target.files])})}))}>
                
              </input>
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mb-4 mt-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  GDPR
                </label>
              </div>
              <div className='col-lg-8'>
                <select
                  className='form-select form-select-solid border-0 text-muted'
                  aria-label='Select example'
                  onChange={(e)=>setEditUser((user: any) => ({...user, aboutMyself: ({...user.aboutMyself, GDPR: e.target.value})}))}
                  value={user.aboutMyself.GDPR}
                >
                  <option value='1'>
                    Статус дозволу на використання персональних даних не визначено
                  </option>
                  <option value='2'>Кандидат дав згоду на використаня персональних даних</option>
                  <option value='0'>
                    Видалити кандидата, дозвіл не отримано або неможливо отримати
                  </option>
                </select>
              </div>
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Джерело
                </label>
              </div>
              <div className='col-lg-6'>
                <input
                  type='text'
                  className='form-control form-control-solid w-75 h-40px'
                  onChange={(e)=>setEditUser((user: any) => ({...user, aboutMyself: ({...user.aboutMyself, source: e.target.value})}))}
                  value={user.aboutMyself.source}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateResume
