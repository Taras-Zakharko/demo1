import React, {FC, useEffect, useRef, useState} from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import '@yaireo/tagify/dist/tagify.css' // Tagify CSS

interface ICandidateExperience {
  experienceRef?: any
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateExperience: FC<ICandidateExperience> = ({experienceRef, setEditUser, user, labelW, inputW}) => {

  const tagifyRef = useRef()

  const [skilsArr, setSkilsArr] = useState<any[]>(user.skils)

  useEffect(() => {    
    setEditUser((user: any) => ({...user, skils: [...skilsArr]}))
  }, [skilsArr, setEditUser])

  return (
    <div ref={experienceRef} className='accordion-item p-0'>
      <h2 className='accordion-header' id='kt_accordion_1_header_1'>
        <button
          className='accordion-button fs-4 fw-boldest'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_accordion_1_body_1'
          aria-expanded='false'
          aria-controls='kt_accordion_1_body_1'
        >
          Досвід
        </button>
      </h2>
      <div
        id='kt_accordion_1_body_1'
        className='accordion-collapse collapse p-4 show'
        aria-labelledby='kt_accordion_1_header_1'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body'>
          <div className='row mb-4'>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
                  Поточне місце роботи
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  placeholder='Компанія'
                  value={user.experience.at(-1).company}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      experience: [
                        ...user.experience.map((obj: any, i: number) =>
                          i === user.experience.length - 1 ? {...obj, company: e.target.value} : obj
                        ),
                      ],
                    }))
                  }
                />
              </div>
              
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
                  Поточна посада
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  value={user.experience[0].position}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      experience: [
                        ...user.experience.map((obj: any, i: number) =>
                          i === user.experience.length - 1
                            ? {...obj, position: e.target.value}
                            : obj
                        ),
                      ],
                    }))
                  }
                />
              </div>
              
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
                  Років досвіду
                </label>
              </div>
              <div className='col-lg-6'>
                <input
                  type='number'
                  className='form-control form-control-solid w-50 w-md-25 h-40px'
                  min='0'
                  value={user.experience.at(-1).yearsExperience}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      experience: [
                        ...user.experience.map((obj: any, i: number) =>
                          i === user.experience.length - 1
                            ? {...obj, yearsExperience: e.target.value}
                            : obj
                        ),
                      ],
                    }))
                  }
                />
              </div>
              
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
                  Навички
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <Tags
                  tagifyRef={tagifyRef}                    
                  value={skilsArr}
                  className='form-control form-control-solid w-100 h-40px'
                  onChange={(e)=> setSkilsArr(e.detail.tagify.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateExperience
