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
  const inputYearExperience = useRef<HTMLInputElement | null>(null)
  

  const [skilsArr, setSkilsArr] = useState<any>([])

  useEffect(() => { 
    (user.skills)&&  setEditUser((user: any) => ({...user, skills: [...skilsArr]}))
    
  }, [skilsArr, setEditUser])

  // useEffect(()=>{
  //   console.log(inputYearExperience!.current!.value);
    
  //   if(inputYearExperience!.current!.value === '0'){
  //     inputYearExperience!.current!.value = ''
  //   };
  // }, [inputYearExperience])

  return (
    <div ref={experienceRef} className='accordion-item p-0'>
      <h2 className='accordion-header' id='kt_accordion_1_header_1'>
        <button
          className='accordion-button fs-16px fs-sm-4 fw-boldest p-8 ps-12 pe-9 bg-white text-dark'
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
        <div className='accordion-body ps-8'>
          <div className='row mb-4'>
            <div className='row d-flex align-items-center mb-6'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-5 fs-sm-6'>
                  Поточне місце роботи
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  placeholder='Компанія'
                  // value={(user.expanded)&&user.experience.at(-1).company}
                  // onChange={(e) =>
                  //   setEditUser((user: any) => ({
                  //     ...user,
                  //     experience: [
                  //       ...user.experience.map((obj: any, i: number) =>
                  //         i === user.experience.length - 1 ? {...obj, company: e.target.value} : obj
                  //       ),
                  //     ],
                  //   }))
                  // }
                />
              </div>
              
            </div>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label required fw-normal fs-5 fs-sm-6'>
                  Поточна посада
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <input
                  type='text'
                  className='form-control form-control-solid w-100 h-40px'
                  value={(user.specialty) && user.specialty}
                  onChange={(e) =>
                    setEditUser((user: any) => ({
                      ...user,
                      specialty: e.target.value,
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
                  ref={inputYearExperience}
                  type='text'
                  className='form-control form-control-solid w-50 w-md-25 h-40px'
                  // value={(user.experience)&&user.experience.at(-1).yearsExperience}
                  onChange={(e) =>
                    e.target.value = e.target.value.replaceAll(/\D/gi,'')
                    // setEditUser((user: any) => ({
                    //   ...user,
                    //   experience: [
                    //     ...user.experience.map((obj: any, i: number) =>
                    //       i === user.experience.length - 1
                    //         ? {...obj, yearsExperience: e.target.value}
                    //         : obj
                    //     ),
                    //   ],
                    // }))
                  }
                />
              </div>
              
            </div>
          </div>
          <div className='row'>
            <div className='row d-flex align-items-center mb-4'>
              <div className={'col-lg-'+labelW}>
                <label htmlFor='exampleFormControlInput1' className='form-label required fw-normal fs-6'>
                  Навички
                </label>
              </div>
              <div className={'col-lg-'+inputW}>
                <Tags
                  tagifyRef={tagifyRef}                    
                  value={user.skills}
                  className='form-control form-control-solid w-100 min-h-40px'
                  onChange={(e)=> {
                    setSkilsArr(e.detail.tagify.value.map(obj=>obj.value))
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
