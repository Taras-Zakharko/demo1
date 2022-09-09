import React, {FC, useEffect, useRef, useState} from 'react'
import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import '@yaireo/tagify/dist/tagify.css' // Tagify CSS
import './tagifyCustom.scss'
import candidatesApi from '../../../../API/candidates'

interface ICandidateExperience {
  experienceRef?: any
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateExperience: FC<ICandidateExperience> = ({
  experienceRef,
  setEditUser,
  user,
  labelW,
  inputW,
}) => {
  const tagifyRef = useRef()
  const inputYearExperience = useRef<HTMLInputElement | null>(null)
  const [allSkillsArr, setAllSkillsArr] = useState<string[]>([])

  const handleGetSkillsArr = () => {
    candidatesApi.getSkillsArr().then((response: any) => {
      setAllSkillsArr(response.data)
    })
  }

  const [skilsArr, setSkilsArr] = useState<any>([])

  useEffect(() => {
    user.skills && setEditUser((user: any) => ({...user, skills: [...skilsArr]}))
  }, [skilsArr, setEditUser])

  useEffect(() => {
    handleGetSkillsArr()
  }, [])

  return (
    <div ref={experienceRef} className='accordion-item border-0 p-0'>
      <h2
        className='accordion-header border-1 border-top-dashed  border-secondary '
        id='kt_accordion_1_header_1'
      >
        <button
          className='accordion-button fs-16px fs-sm-4 fw-boldest p-8 ps-12 pe-9 pb-7 pb-lg-20px bg-white text-dark shadow-none'
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
        className='accordion-collapse collapse p-4 pt-0 pb-0 show'
        aria-labelledby='kt_accordion_1_header_1'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body ps-8 pt-0 pb-7 pb-lg-0'>
          <div className='row '>
            <div className='row d-flex align-items-center mb-7 mb-lg-20px pe-0 pe-lg-3'>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label fw-normal mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  Поточне місце роботи
                </label>
              </div>
              <div className={'col-lg-' + inputW + ' pe-0 pe-lg-3'}>
                <input
                  type='text'
                  className='form-control form-control-solid h-40px text-gray-800'
                  placeholder='Компанія'
                  value={user.currentCompany && user.currentCompany}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      currentCompany: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className='row d-flex align-items-center mb-7 mb-lg-20px pe-0 pe-lg-3'>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label fw-normal mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  Поточна посада
                </label>
              </div>
              <div className={'col-lg-' + inputW + ' pe-0 pe-lg-3'}>
                <input
                  type='text'
                  className='form-control form-control-solid h-40px text-gray-800'
                  value={user.specialty && user.specialty}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      specialty: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className='row d-flex align-items-center mb-7 mb-lg-20px '>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label fw-normal mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  Років досвіду
                </label>
              </div>
              <div className='col-lg-6'>
                <input
                  ref={inputYearExperience}
                  type='text'
                  className='form-control form-control-solid w-50 w-md-25 h-40px text-gray-800'
                  value={user.experience && user.experience}
                  onChange={(e) => {
                    e.target.value = e.target.value.replaceAll(/\D/gi, '')
                    setEditUser((user: any) => ({
                      ...user,
                      experience: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-start mb-lg-20px pe-0 pe-lg-3'>
              <div className={'col-lg-' + labelW}>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label pt-lg-3 fw-normal mb-5 mb-lg-2 fs-5 fs-sm-6'
                >
                  Навички
                </label>
              </div>
              <div className={'col-lg-' + inputW + ' pe-0 pe-lg-3'}>
                <Tags
                  tagifyRef={tagifyRef}
                  value={user.skills}
                  onDropdownShow={() => true}
                  whitelist={allSkillsArr}
                  {...allSkillsArr}
                  showDropdown={true}
                  className='form-control form-control-solid min-h-40px'
                  onChange={(e) => {
                    setSkilsArr(e.detail.tagify.value.map((obj) => obj.value))
                  }}
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
