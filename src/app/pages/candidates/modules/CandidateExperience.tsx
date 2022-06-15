import React, {createElement, FC, useLayoutEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

interface ICandidateExperience {
  experienceRef?: any
}

const CandidateExperience: FC<ICandidateExperience> = ({experienceRef}) => {
  const skilsInputRef = useRef<HTMLInputElement>(null)

  const [skilsArr, setSkilsArr] = useState<string[]>(['Web-design', 'Marketing'])

  function addSkilFunk() {
    if (skilsInputRef.current !== null) {
      if (skilsInputRef.current.value !== '') {
        setSkilsArr((arr: string[]) => {
          if (skilsInputRef.current !== null) {
            return arr.concat(skilsInputRef.current.value)
          } else {
            return arr
          }
        })
      }
    }
  }


  return (
    <div ref={experienceRef} className='accordion-item mb-4'>
      <h2 className='accordion-header' id='kt_accordion_1_header_1'>
        <button
          className='accordion-button fs-4 fw-bold'
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
          <div className='row border-bottom mb-4'>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Поточне місце роботи
                </label>
              </div>
              <div className='col-lg-6'>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  placeholder='Компанія'
                />
              </div>
              <div className='col-lg-3'></div>
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Поточна посада
                </label>
              </div>
              <div className='col-lg-6'>
                <input type='text' className='form-control form-control-solid w-100 h-40px' />
              </div>
              <div className='col-lg-3'></div>
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Років досвіду
                </label>
              </div>
              <div className='col-lg-6'>
                <input type='number' className='form-control form-control-solid w-25 h-40px' />
              </div>
              <div className='col-lg-3'></div>
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
                  Навички
                </label>
              </div>
              <div className='col-lg-6'>
                <input
                  ref={skilsInputRef}
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  placeholder='Наприклад, маркетинг'
                />
              </div>
              <div className='col-lg-3'>
                <button
                  className='btn btn-light-primary'
                  onClick={() => {
                    addSkilFunk()
                    if (skilsInputRef.current !== null) {
                      skilsInputRef.current.value = ''
                    }
                  }}
                >
                  Додати
                </button>
              </div>
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className='col-lg-3'></div>
              <div className='col-lg-6'>
                <div className='skils'>
                  {skilsArr.map((skil: string, i: number) => {
                    return (
                      <li key={i} id={'skil-' + i} className='d-flex align-items-center py-2'>
                        {skil}{' '}
                        <button className='btn p-0' onClick={()=> document.querySelector(`#skil-${i}`)?.remove()}>
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-1tx svg-icon-dark ms-4'
                          />
                        </button>
                      </li>
                    )
                  })}
                </div>
              </div>
              <div className='col-lg-3'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateExperience
