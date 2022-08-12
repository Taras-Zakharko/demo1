import Tags from '@yaireo/tagify/dist/react.tagify'
import React, {FC, useEffect, useRef, useState} from 'react'
import {fileURLToPath} from 'url'
import './tagifyCustom.scss'

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
  const tagifyRef = useRef()

  const [files, setFiles] = useState<any[]>([])
  const [newFiles, setNewFiles] = useState<any[]>(user.files)
  const [array, setArray] = useState<any[]>(user.files)

  useEffect(() => {
    let userFilesName: any = []

    user.files &&
      user.files.length > 0 &&
      user.files.forEach((file: any) => {
        userFilesName.push(file.name)
      })
    setNewFiles(user.files)
    setFiles(userFilesName)
  }, [user])

  useEffect(() => {
    let newArr: any[] = []
    if (
      newFiles &&
      files &&
      newFiles.length > 0 &&
      files.length > 0 &&
      newFiles.length !== files.length
    ) {
      newFiles.forEach((a) => {
        files.forEach((b) => {
          if (a.name === b) {
            newArr.push(a)
          }
        })
      })
      setArray(newArr)
    }
  }, [files])

  useEffect(() => {
    if (array && array.length > 0) {
      setEditUser((user: any) => ({
        ...user,
        files: [...array],
      }))
    }
  }, [array])

  return (
    <div
      ref={resumeRef}
      className='accordion-item border-start-0 border-end-0 border-bottom-dashed p-0'
    >
      <h2
        className='accordion-header border-1 border-top-dashed border-secondary'
        id='kt_accordion_1_header_3'
      >
        <button
          className='accordion-button fs-16px fs-sm-4 fw-boldest p-8 ps-12 pe-9 pb-7 pb-lg-20px bg-white text-dark shadow-none'
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
        className='accordion-collapse collapse p-4 pt-0 pb-0 show'
        aria-labelledby='kt_accordion_1_header_3'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body ps-8 pt-0 pb-7 pb-lg-20px'>
          <div className='row border-bottom-dashed border-1 border-secondary mb-lg-4'>
            <div className='col-lg-12'>
              <textarea
                name='resume'
                id='resume'
                className='w-100 h-150px p-3 mb-7 mb-lg-20px form-control form-control-solid text-gray-800'
                onChange={(e) =>
                  setEditUser((user: any) => ({
                    ...user,
                    aboutMyself: [`${e.target.value}`],
                  }))
                }
                value={user.aboutMyself && user.aboutMyself[0]}
              ></textarea>
            </div>
            <div className='col-lg-12 d-flex flex-column flex-lg-row align-items-lg-center'>
              <label
                htmlFor='addFileResume'
                className='btn text-primary fs-5 fs-sm-6 p-0 mb-7 mb-lg-20px text-start'
              >
                <i className='fas fa-paperclip fs-16px fs-sm-4 text-primary'></i>
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
                          files: [...user.files, {name: file.name, base64: reader.result}],
                        }))
                      }

                      reader.readAsDataURL(file)
                    }
                  }
                }}
              ></input>
              {files.length > 0 && (
                <div className='ms-lg-9 h-100'>
                  <Tags
                    tagifyRef={tagifyRef}
                    value={files}
                    className='form-control form-control-solid bg-white border-0 min-h-40px '
                    onChange={(e) => {
                      setFiles(e.detail.tagify.value.map((obj) => obj.value))
                      if(e.detail.tagify.value.length===0){
                        setEditUser((user: any) => ({
                          ...user,
                          files: [],
                        }))
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mt-7 mt-lg-20px pe-0'>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label fw-bold mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  GDPR
                </label>
              </div>
              <div className={'col-lg-' + inputW + ' pe-0'}>
                <select
                  className='form-select form-select-solid border-0 text-gray-800'
                  aria-label='Select example'
                  onChange={(e) => setEditUser((user: any) => ({...user, gdpr: e.target.value}))}
                  value={user.gdpr}
                >
                  <option value='1'>GDPR статус не визначено</option>
                  <option value='2'>Є згода на використання персональних даних</option>
                  <option value='0'>Дозвіл не отримано або неможливо отримати</option>
                </select>
              </div>
            </div>
            <div className='row d-flex align-items-center align-items-lg-start mt-7 mt-lg-20px pe-0'>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label pt-lg-3 fw-bold mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  Джерело
                </label>
              </div>
              <div className='col-12 col-lg-6 pe-0'>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 w-lg-75 h-40px mb-3 text-gray-800'
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      source: e.target.value,
                    }))
                  }
                  value={user.source}
                />
                <span className='text-gray-500 fs-6 fs-sm-7'>Де знайшли цього кандидата</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateResume
