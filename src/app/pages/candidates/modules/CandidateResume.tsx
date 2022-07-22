import React, {FC, useEffect, useState} from 'react'

interface ICandidateContacts {
  resumeRef?: any
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateResume: FC<ICandidateContacts> = ({
  resumeRef,
  setEditUser,
  user,
  labelW,
  inputW,
}) => {

  

  return (
    <div ref={resumeRef} className='accordion-item p-0'>
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
                onChange={(e) =>
                  setEditUser((user: any) => ({
                    ...user,
                    aboutMyself: {...user.aboutMyself, text: e.target.value},
                  }))
                }
                value={user.aboutMyself}
              ></textarea>
            </div>
            <div className='col-lg-12'>
              <label htmlFor='addFileResume' className='btn text-primary ps-0'>
                <i className='fas fa-paperclip fs-4 text-primary'></i>
                Прикріпити файл
              </label>
              <input
                type='file'
                id='addFileResume'
                name='addFileResume'
                multiple
                className='d-none'
                accept='.txt, .doc, .docx, .pdf'
                onChange={(e) => {
                  if (e.target.files !== null) {
                    for (let i = 0; i < e.target.files.length; i++) {
                      const file = e.target.files[i]

                      const reader = new FileReader()

                      reader.onload = () => {
                        
                        setEditUser((user: any) => ({
                          ...user,
                          files: [...user.files, {name: file.name, base64: reader.result}]
                        }))
                      }

                      reader.readAsDataURL(file)
                    }
                  }
                }}
              ></input>
              <p className='ms-3 h-100'>
                  {(user.files && user.files.length>0)&&user.files.map((file: any, i: number) =>
                    i !== user.files.length - 1 ? (
                      <span key={i} className='fw-bold fs-6 text-primary'>{`${file.name}, `}</span>
                    ) : (
                      <span key={i} className='fw-bold fs-6 text-primary'>{file.name}</span>
                    )
                  )}
                  </p>
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mb-4 mt-4 pe-0'>
              <div className={'col-lg-' + labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  GDPR
                </label>
              </div>
              <div className={'col-lg-' + inputW + ' pe-0'}>
                <select
                  className='form-select form-select-solid border-0 text-muted'
                  aria-label='Select example'
                  // onChange={(e)=>setEditUser((user: any) => ({...user, aboutMyself: ({...user.aboutMyself, GDPR: e.target.value})}))}
                  // value={user.aboutMyself}
                >
                  <option value='1'>GDPR статус не визначено</option>
                  <option value='2'>Є згода на використання персональних даних</option>
                  <option value='0'>Дозвіл не отримано або неможливо отримати</option>
                </select>
              </div>
            </div>
            <div className='row d-flex align-items-center mb-4 pe-0'>
              <div className={'col-lg-' + labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Джерело
                </label>
              </div>
              <div className='col-12 col-lg-6 pe-0'>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 w-lg-75 h-40px mb-3'
                  // onChange={(e) =>
                  //   setEditUser((user: any) => ({
                  //     ...user,
                  //     aboutMyself: {...user.aboutMyself, source: e.target.value},
                  //   }))
                  // }
                  // value={user.aboutMyself}
                />
                <span className='text-gray-500 fs-7'>Де знайшли цього кандидата</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateResume
