import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {RootState} from '../../../../app/store'
import {useSelector, useDispatch} from 'react-redux'
import {edit} from '../../../features/candidate/candidateSlice'

export function CandidateProfileWraper() {
  let idUser = +window.location.pathname.slice(window.location.pathname.lastIndexOf('id=') + 3)
  const allUsers = useSelector((state: RootState) => state.candidates.users)
  const [user, setUser] = useState<any>(allUsers[0])
  const [gdpr, setGdpr] = useState<number>(0)
  const GDPRSelect = useRef<HTMLSelectElement | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    for (const user of allUsers) {
      if (user.id === idUser) {
        setUser(user)
        setGdpr(user.aboutMyself.GDPR)
      }
    }
  }, [setUser, allUsers, idUser])

  function allGood() {
    setUser((user: any) => ({...user, checked: 1}))
  }

  useEffect(() => {
    dispatch(edit(user))
  }, [user, dispatch])

  return (
    <>
    {user.checked === 0 ? (
          <div className='notice p-7 p-lg-4 ps-9 pe-9 flex-column flex-lg-row position-absolute w-100 z-index-3 start-0 d-flex justify-content-between align-items-center bg-light-warning rounded border-warning all__good-div'>
            <div className='d-flex fs-6 text-gray-800 align-items-center mb-5 mb-lg-0'>
              <i className="fas fa-exclamation-triangle text-warning me-4"></i>
              Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка,
              перепровірте дані кандидата.
            </div>
            <button
              className='btn btn-light-success cursor-pointer h-40px fs-6 all__good mb-6 mb-lg-0'
              onClick={allGood}
            >
              <i className='fas fa-check fs-6 me-3'></i>
              Все ок, зберегти
            </button>
          </div>
        ) : null}
      <div className='row pt-15 pt-sm-10  position-relative'>
        <div className={(user.checked === 0)?'card mt-24 mt-lg-20 col-lg-8':'card col-lg-8'}>
          <div className='card-body '>
            <div className='row pb-9 mb-7 align-items-center border-bottom postion-relative'>
              <label className='col-lg-2 col-12 fw-bold text-muted text-center me-9 mb-7 mb-lg-0'>
                <img className='symbol w-110px' src={toAbsoluteUrl(`${user.photo}`)} alt='' />
              </label>

              <div className='col-lg-9 col-12 d-flex flex-column align-items-center align-items-lg-start'>
                <h2 className='fw-bolder fs-2 text-dark'>
                  {user.firstName} {user.lastName}
                </h2>
                <span className='d-block fs-4'>
                  {user.experience[0].position} в {user.experience[0].company}
                </span>
                <span className='text-muted fw-bold d-block fs-6'>
                  {user.location.city}, {user.location.country}
                </span>
                <div className='d-flex align-items-center'>
                  {gdpr === 0 ? (
                    <i className="fas fa-ban text-danger fs-4"></i>
                  ) : gdpr === 1 ? (
                    <i className="fas fa-question text-gray-500 fs-6"></i>
                  ) : (
                    <i className='fas fa-check text-success fs-6'></i>
                  )}
                  <select
                    ref={GDPRSelect}
                    className={
                      gdpr === 0
                        ? 'form-select border-0 fs-6 text-danger bg-white'
                        : gdpr === 1
                        ? ' form-select border-0 fs-6 text-gray-500 bg-white'
                        : 'form-select border-0 fs-6 text-success bg-white'
                    }
                    aria-label='Select example'
                    value={gdpr}
                    disabled
                    onChange={() => setGdpr(+GDPRSelect!.current!.value)}
                  >
                    <option value='1' className=' text-gray-500'>
                      GDPR статус не визначено
                    </option>
                    <option value='2' className='text-success'>
                      Є згода на використання персональних даних
                    </option>
                    <option value='0' className='text-danger'>
                      Дозвіл не отримано або неможливо отримати
                    </option>
                  </select>
                </div>
              </div>

              <Link
                to={`/candidates/edit/user/id=${idUser}`}
                className='fs-4 h-40px w-50px btn btn-icon btn-light-primary btn-active-light-primary btn-sm position-absolute end-5 top-5'
              >
                <i className="fas fa-pen fs-4"></i>
              </Link>
            </div>
            <div className='row pb-4 d-none d-lg-flex mb-7 border-bottom'>
              <div className='col-lg-2'></div>
              <div className='col-lg-10 mb-4'>
                <h2 className='fs-4 fw-boldest'>Досвід</h2>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                  Досвід роботи:
                </label>

                <div className='col-lg-10 fv-row'>
                  <span className='fw-bold fs-4'>
                    {' '}
                    {`Більше ${user.experience[0].yearsExperience} років`}{' '}
                  </span>
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Навички:</label>

                <div className='col-lg-10 fv-row'>
                  <span className='fw-bold fs-4'>
                    {user.skils.map((skil: any, i: number) =>
                      i !== user.skils.length - 1 ? `${skil}, ` : `${skil}`
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className='row pb-4 d-none d-lg-flex mb-7'>
              <div className='col-lg-2'></div>
              <div className='col-lg-10 mb-4'>
                <h2 className='fs-4 fw-boldest'>Резюме і файли </h2>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Резюме: </label>

                <div className='col-lg-10 fv-row'>
                  <span className='fw-bold fs-4'>{user.aboutMyself.text}</span>
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Джерело:</label>

                <div className='col-lg-10 fv-row'>
                  <span className='fw-bold fs-4'>{user.aboutMyself.source}</span>
                </div>
              </div>

              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Файли:</label>

                <div className='col-lg-10 fv-row d-flex align-items-center fs-4'>
                <i className="fas fa-paperclip fs-4 text-primary"></i>
                  {user.aboutMyself.file.map((file: any, i: number) =>
                    i !== user.aboutMyself.file.length - 1 ? (
                      <a className='fw-bold fs-6'>{`${file[i].name}, `}</a>
                    ) : (
                      <a className='fw-bold fs-6 ms-1'>{file[i].name}</a>
                    )
                  )}
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Додано:</label>

                <div className='col-lg-10 fv-row'>
                  <span className='fw-bold fs-4'>10.02.2020 (оновлено: 20.20.2021)</span>
                </div>
              </div>
            </div>

            <div className='accordion d-lg-none' id='kt_accordion_1'>
              <div className='accordion-item border-top-0 border-start-0 border-end-0 border-bottom-dotted'>
                <h2 className='accordion-header' id='kt_accordion_1_header_1'>
                  <button
                    className='accordion-button fs-4 fw-boldest collapsed'
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
                  className='accordion-collapse collapse'
                  aria-labelledby='kt_accordion_1_header_1'
                  data-bs-parent='#kt_accordion_1'
                >
                  <div className='accordion-body'>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                        Досвід роботи:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-4'>
                          {' '}
                          {`Більше ${user.experience[0].yearsExperience} років`}{' '}
                        </span>
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                        Навички:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-4'>
                          {user.skils.map((skil: any, i: number) =>
                            i !== user.skils.length - 1 ? `${skil}, ` : `${skil}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='accordion-item border-0'>
                <h2 className='accordion-header' id='kt_accordion_1_header_2'>
                  <button
                    className='accordion-button fs-4 fw-boldest collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#kt_accordion_1_body_2'
                    aria-expanded='false'
                    aria-controls='kt_accordion_1_body_2'
                  >
                    Резюме і файли
                  </button>
                </h2>
                <div
                  id='kt_accordion_1_body_2'
                  className='accordion-collapse collapse'
                  aria-labelledby='kt_accordion_1_header_2'
                  data-bs-parent='#kt_accordion_1'
                >
                  <div className='accordion-body'>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                        Резюме:{' '}
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-4'>{user.aboutMyself.text}</span>
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                        Джерело:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-4'>{user.aboutMyself.source}</span>
                      </div>
                    </div>

                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>Файли:</label>

                      <div className='col-lg-10 fv-row d-flex align-items-center fs-4'>
                      <i className="fas fa-paperclip fs-4 text-primary"></i>
                        {user.aboutMyself.file.map((file: any, i: number) =>
                          i !== user.aboutMyself.file.length - 1 ? (
                            <a className='fw-bold fs-6'>{`${file[i].name}, `}</a>
                          ) : (
                            <a className='fw-bold fs-6 ms-1'>{file[i].name}</a>
                          )
                        )}
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted text-lg-end fs-6'>
                        Додано:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-4'>10.02.2020 (оновлено: 20.20.2021)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 ps-9 mt-4 mt-lg-0'>
          <div className={(user.checked === 0)?'card card-custom mt-lg-20 shadow p-6':'card card-custom shadow p-6'}>
            <h2 className='mb-7 fs-4 fw-boldest'>Контакти</h2>
            <div className='row border-bottom'>
              {user.contacts.email.length > 0 ? (
                <div className='row mb-4'>
                  <label className='col-1 col-lg-2 fw-bold text-gray-500 border-bottom-dotted border-1 border-secondary'>
                    <i className="fas fa-envelope fs-4"></i>
                  </label>

                  <div className='col-11 col-lg-10 fv-row border-bottom-dotted border-1 border-secondary'>
                    {user.contacts.email.map((email: string, i: number) => (
                      <span key={i} className='d-block fw-bold fs-6'>
                        <a href={'tomail:' + email} className='text-dark text-hover-primary'>
                          {email}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {user.contacts.phone.length > 0 ? (
                <div className='row mb-4'>
                  <label className='col-1 col-lg-2 fw-bold'>
                    <i className="fas fa-phone fs-4"></i>
                  </label>

                  <div className='col-11 col-lg-10 fv-row'>
                    {user.contacts.phone.map((number: string, i: number) => (
                      <span key={i} className='d-block fw-bold fs-6'>
                        <a href={'tel:' + number} className='text-dark text-hover-primary'>
                          {number}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className='row mt-4'>
              <div className='col-12'>
                {user.contacts.messengers.map((mess: {name: number; link: string}, i: number) =>
                  mess.name === 3 ? (
                    <a
                      key={i}
                      href={'skype:' + mess.link}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                    >
                      <i className="fab fa-skype fs-4"></i>
                    </a>
                  ) : null
                )}
                {user.contacts.socialLinks.map((link: {name: number; path: string}, i: number) => {
                  if (link.name === 0) {
                    return (
                      <a
                        key={i}
                        href={link.path}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                      >
                        <i className="fab fa-linkedin fs-4"></i>
                      </a>
                    )
                  } else if (link.name === 1) {
                    return (
                      <a
                        key={i}
                        href={link.path}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                      >
                        <i className="fab fa-github fs-4"></i>
                      </a>
                    )
                  } else if (link.name === 2) {
                    return (
                      <a
                        key={i}
                        href={link.path}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                      >
                        <i className="fab fa-facebook-square fs-4"></i>
                      </a>
                    )
                  } else {
                    return (
                      <a
                        key={i}
                        href={link.path}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                      >
                        {/* <KTSVG
                          path='/media/icons/duotune/social/soc014.svg'
                          className='svg-icon-3'
                        /> */}
                        <i className="fas fa-globe fs-4"></i>
                      </a>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
