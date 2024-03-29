import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import candidatesApi from '../../../../API/candidates'
import {Popover} from 'bootstrap'

export function CandidateProfileWraper() {
  let idUser = +window.location.pathname.slice(
    window.location.pathname.lastIndexOf('candidates/') + 11
  )

  const [user, setUser] = useState<any>({})
  const [gdpr, setGdpr] = useState<number>(1)
  const GDPRSelect = useRef<HTMLSelectElement | null>(null)

  const handleGetOneCandidate = (id: number) => {
    candidatesApi.getSomeCandidate(id).then((response: any) => {
      setUser(response.data)
      setGdpr(response.data.gdpr)
    })
  }

  const handleEditOneCandidate = (user: any) => {
    candidatesApi.editCandidate(user).then(() => {
      handleGetOneCandidate(idUser)
    })
  }

  useEffect(() => {
    handleGetOneCandidate(idUser)
  }, [idUser])

  const allGood = () => {
    setUser((user: any) => ({...user, checked: 1}))
    handleEditOneCandidate({...user, checked: 1})
  }

  function copyContacts(el: any) {
    navigator.clipboard
      .writeText(el.textContent)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Error in copying text: ', err)
      })
  }
  function copyContactsValue(el: any) {
    navigator.clipboard
      .writeText(el)
      .then(() => {
        console.log('Text copied to clipboard')
      })
      .catch((err) => {
        console.error('Error in copying text: ', err)
      })
  }
  useEffect(() => {
    const popover = document.querySelectorAll('.popover-btn')
    popover.forEach((p) => {
      new Popover(p)
    })
  }, [user])

  const navigate = useNavigate()

  if (Array.isArray(user)) {
    navigate('/error/404')
  }

  function openPDF(base64: string, name: string) {
    let pdf_newTab = window.open('')

    pdf_newTab!.document.write(
      `"<html><head><title>${name}</title></head><body><iframe title='MY title'  width='100%' height='100%' src='${base64}'></iframe></body></html>"`
    )
  }

  return (
    <div className='row pt-9'>
      {user.checked === 0 ? (
        <div className='notice p-7 pb-10 p-lg-4 ps-9 pe-9 flex-column flex-lg-row position-absolute w-100 z-index-3 start-0 d-flex justify-content-between align-items-center bg-light-warning rounded border-warning all__good-div'>
          <div className='d-flex fs-6 text-gray-800 align-items-center mb-5 mb-lg-0'>
            <i className='fas fa-exclamation-triangle text-warning me-4'></i>
            Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте
            дані кандидата.
          </div>
          <button
            className='btn btn-light-success cursor-pointer h-40px fs-6 all__good'
            onClick={allGood}
          >
            <i className='fas fa-check fs-6 me-3'></i>
            Все ок, зберегти
          </button>
        </div>
      ) : null}
      <div className='row pt-15 pt-sm-10 position-relative'>
        <div className={user.checked === 0 ? 'card mt-24 mt-lg-20 col-lg-8' : 'card col-lg-8 p-0'}>
          <div className='card-body p-9'>
            <div className='row ms-0 me-0 pb-9 mb-7 align-items-center justify-content-center justify-content-lg-start border-bottom-1 border-bottom-dashed border-secondary postion-relative'>
              <label className='col-lg-2 ps-0 pe-0 w-110px col-12 fw-bold text-muted text-center text-lg-end me-lg-9 mb-7 mb-lg-0'>
                {user.photo ? (
                  <img
                    className='symbol w-100 '
                    src={user.photo && toAbsoluteUrl(`${user.photo}`)}
                    alt=''
                  />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='110'
                    height='110'
                    viewBox='0 0 110 110'
                    fill='none'
                  >
                    <rect width='110' height='110' rx='6' fill='#F3F6F9' />
                    <path
                      opacity='0.3'
                      d='M85.5556 55C85.5556 71.8056 71.8056 85.5556 55 85.5556C38.1945 85.5556 24.4445 71.8056 24.4445 55C24.4445 38.1944 38.1945 24.4444 55 24.4444C71.8056 24.4444 85.5556 38.1944 85.5556 55ZM55 39.7222C49.8056 39.7222 45.8333 43.6944 45.8333 48.8889C45.8333 54.0833 49.8056 58.0556 55 58.0556C60.1945 58.0556 64.1667 54.0833 64.1667 48.8889C64.1667 43.6944 60.1945 39.7222 55 39.7222Z'
                      fill='#A1A5B7'
                    />
                    <path
                      d='M55.0001 85.5555C62.9445 85.5555 70.2779 82.5001 75.4724 77.6112C73.0279 69.9723 64.7779 64.1667 55.0001 64.1667C45.2223 64.1667 36.9723 69.9723 34.5278 77.6112C39.7223 82.5001 47.0556 85.5555 55.0001 85.5555Z'
                      fill='#A1A5B7'
                    />
                  </svg>
                )}
              </label>

              <div className='col-lg-9 col-12 d-flex flex-column align-items-center align-items-lg-start ps-0'>
                <h1 className='fw-boldest fs-21px fs-sm-20px lh-lg text-dark mb-0'>
                  {user.firstName === null && user.lastName === null
                    ? 'Ім’я не розпізнано'
                    : user.firstName !== null && user.lastName === null
                    ? `${user.firstName}`
                    : `${user.firstName} ${user.lastName}`}
                </h1>
                <span className='d-block fs-3 fs-sm-4'>
                  {user.specialty === null ? '' : `${user.specialty}`}
                </span>
                <span className='text-muted fw-bold d-block fs-5 fs-sm-6 mb-3'>
                  {user.location && user.location.country ? `${user.location.country}, ` : ''}{' '}
                  {user.location && user.location.city[0] ? user.location.city[0] : ''}
                </span>
                <div className='d-flex align-items-center justify-content-center justify-content-lg-start'>
                  {gdpr === 0 ? (
                    <i className='fas fa-ban text-danger fs-3 fs-sm-4 me-4'></i>
                  ) : gdpr === 1 ? (
                    <i className='fas fa-question text-gray-500 fs-3 fs-sm-4 me-4'></i>
                  ) : (
                    <i className='fas fa-check text-success fs-3 fs-sm-4 me-4'></i>
                  )}
                  <select
                    ref={GDPRSelect}
                    className={
                      gdpr === 0
                        ? 'form-select p-0 border-top-0 border-start-0 border-end-0 border-danger border-dashed rounded-0 fs-5 fs-sm-6 text-danger cursor-pointer bg-white text-truncate'
                        : gdpr === 1
                        ? ' form-select p-0 border-top-0 border-start-0 border-end-0 border-gray-500 border-dashed rounded-0 fs-5 fs-sm-6 cursor-pointer text-gray-500 bg-white w-60 w-lg-50 text-truncate'
                        : 'form-select p-0 border-top-0 border-start-0 border-end-0 border-success border-dashed rounded-0 fs-5 fs-sm-6 cursor-pointer text-success bg-white text-truncate'
                    }
                    aria-label='Select example'
                    value={gdpr}
                    style={{backgroundImage: 'none'}}
                    onChange={() => setGdpr(+GDPRSelect!.current!.value)}
                  >
                    <option value='1' className=' text-gray-500 '>
                      GDPR статус не визначено
                    </option>
                    <option value='2' className='text-success'>
                      Є згода на використання персональних даних
                    </option>
                    <option value='0' className='text-danger'>
                      Дозвіл не отримано або неможливо отримати
                    </option>
                  </select>
                  <svg
                    width='11'
                    height='8'
                    viewBox='0 0 11 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='ms-3'
                  >
                    <path
                      d='M5.35224 6.94085L0.797328 2.38591C0.577648 2.16623 0.577648 1.81007 0.797328 1.59041L1.32859 1.05916C1.54789 0.839851 1.90332 0.839429 2.12314 1.05822L5.75 4.66809L9.37684 1.05822C9.59666 0.839429 9.95209 0.839851 10.1714 1.05916L10.7026 1.59041C10.9223 1.81009 10.9223 2.16625 10.7026 2.38591L6.14776 6.94085C5.92808 7.1605 5.57192 7.1605 5.35224 6.94085Z'
                      fill='#A1A5B7'
                    />
                  </svg>
                </div>
              </div>

              <Link
                to={`/candidates/${idUser}/edit`}
                className='fs-4 h-40px w-50px btn btn-icon btn-light-primary btn-active-light-primary btn-sm position-absolute end-0 top-0 mt-9 me-9'
              >
                <i className='fas fa-pen fs-4'></i>
              </Link>
            </div>
            <div className='row  ms-0 me-0 pb-4 d-none d-lg-flex mb-7 border-bottom-1 border-bottom-dashed border-secondary'>
              <div className='col-lg-2 w-110px me-9'>
                <div className='w-110px'></div>
              </div>
              <div className='col-lg-9 mb-4 ps-0'>
                <h2 className='fs-4 fw-boldest'>Досвід</h2>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 w-110px ps-0 pe-0 mt-2px me-9 fw-bold text-gray-500 text-lg-end fs-6'>
                  <span>Досвід роботи: </span>
                </label>

                <div className='col-lg-9 fv-row ps-0'>
                  <span className='fw-normal fs-4'>
                    {user.experience ? (
                      `Більше ${user.experience} років`
                    ) : (
                      <span className='fw-normal fs-4 text-gray-500'>не вказано</span>
                    )}
                  </span>
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 w-110px pe-0 me-9 mt-2px fw-bold text-gray-500 text-lg-end fs-6'>
                  Навички:{' '}
                </label>

                <div className='col-lg-9 fv-row ps-0'>
                  <span className='fw-normal fs-4'>
                    {user.skills && user.skills.length > 0 ? (
                      user.skills?.map((skil: any, i: number) =>
                        i !== user.skills.length - 1 ? `${skil}, ` : `${skil}`
                      )
                    ) : (
                      <span className='fw-normal fs-4 text-gray-500'>не вказано</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className='row  ms-0 me-0 d-none d-lg-flex'>
              <div className='col-lg-2 w-110px me-9'>
                <div className='w-110px '></div>
              </div>
              <div className='col-lg-9 mb-4 ps-0'>
                <h2 className='fs-4 fw-boldest'>Резюме і файли </h2>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 w-110px pe-0 me-9 mt-2px fw-bold text-gray-500 text-lg-end fs-6'>
                  Резюме:
                </label>

                <div className='col-lg-9 fv-row ps-0'>
                  <p className='fw-normal fs-4 m-0'>
                    {user.aboutMyself && user.aboutMyself.length > 0 ? (
                      `${user.aboutMyself}`
                    ) : (
                      <span className='fw-normal fs-4 text-gray-500'>не вказано</span>
                    )}
                  </p>
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 w-110px pe-0 me-9 mt-2px fw-bold text-gray-500 text-lg-end fs-6'>
                  Джерело:
                </label>

                <div className='col-lg-9 fv-row ps-0'>
                  <p className='fw-normal fs-4 m-0'>
                    {user.source ? (
                      `${user.source}`
                    ) : (
                      <span className='fw-normal fs-4 text-gray-500'>не вказано</span>
                    )}
                  </p>
                </div>
              </div>

              <div className='row mb-4'>
                <label className='col-lg-2 w-110px pe-0 me-9 mt-2px fw-bold text-gray-500 text-lg-end fs-6'>
                  Файли:
                </label>

                <div className='col-lg-9 fv-row d-flex fs-4 ps-0'>
                  {user.files && user.files.length > 0 ? (
                    <i className='fas fa-paperclip fs-4 mt-2px text-primary me-3'></i>
                  ) : null}

                  <p className='h-100 m-0'>
                    {user.files && user.files.length > 0 ? (
                      user.files.map((file: any, i: number) =>
                        i !== user.files.length - 1 ? (
                          <span
                            key={i}
                            className='fw-normal fs-4 text-primary cursor-pointer'
                            onClick={() => openPDF(file.base64, file.name)}
                          >{`${file.name}, `}</span>
                        ) : (
                          <span
                            key={i}
                            className='fw-normal fs-4 text-primary cursor-pointer'
                            onClick={() => openPDF(file.base64, file.name)}
                          >
                            {file.name}
                          </span>
                        )
                      )
                    ) : (
                      <span className='fw-normal fs-4 text-gray-500'>не вказано</span>
                    )}
                  </p>
                </div>
              </div>
              <div className='row mb-4'>
                <label className='col-lg-2 w-110px pe-0 me-9 mt-2px fw-bold text-gray-500 text-lg-end fs-6'>
                  Додано:
                </label>

                <div className='col-lg-9 fv-row ps-0'>
                  <span className='fw-normal fs-4'>
                    {user.created_at &&
                      user.updated_at &&
                      `${user.created_at
                        .slice(0, user.created_at.indexOf(' '))
                        .replaceAll('-', '.')} (оновлено: ${user.updated_at
                        .slice(0, user.updated_at.indexOf(' '))
                        .replaceAll('-', '.')})`}
                  </span>
                </div>
              </div>
            </div>

            <div className='accordion d-lg-none' id='kt_accordion_1'>
              <div className='accordion-item border-top-0 border-start-0 border-end-0 border-bottom-dotted'>
                <h2 className='accordion-header' id='kt_accordion_1_header_1'>
                  <button
                    className='accordion-button fs-16px ps-0 pe-0 fs-sm-4 fw-boldest collapsed bg-white text-dark'
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
                  <div className='accordion-body ps-0 pe-0'>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Досвід роботи:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-normal fs-16px'>
                          {user.experience ? (
                            `Більше ${user.experience} років`
                          ) : (
                            <span className='text-gray-500'>не вказано</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Навички:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-normal fs-16px'>
                          {user.skills && user.skills.length > 0 ? (
                            user.skills?.map((skil: any, i: number) =>
                              i !== user.skills.length - 1 ? `${skil}, ` : `${skil}`
                            )
                          ) : (
                            <span className='text-gray-500'>не вказано</span>
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
                    className='accordion-button fs-16px ps-0 pe-0 fs-sm-4 fw-boldest collapsed bg-white text-dark'
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
                  <div className='accordion-body ps-0 pe-0'>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Резюме:{' '}
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <p className='fw-normal fs-16px m-0'>
                          {user.aboutMyself && user.aboutMyself.length > 0 ? (
                            `${user.aboutMyself}`
                          ) : (
                            <span className='text-gray-500'>не вказано</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Джерело:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <p className='fw-normal fs-16px m-0'>
                          {user.source ? (
                            `${user.source}`
                          ) : (
                            <span className='text-gray-500'>не вказано</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Файли:
                      </label>

                      <div className='col-lg-10 fv-row d-flex align-items-center'>
                        {user.files && user.files.length > 0 ? (
                          <i className='fas fa-paperclip fs-16px mt-2px text-primary me-3'></i>
                        ) : null}

                        <p className='h-100 m-0'>
                          {user.files && user.files.length > 0 ? (
                            user.files.map((file: any, i: number) =>
                              i !== user.files.length - 1 ? (
                                <span
                                  key={i}
                                  className='fw-normal fs-16px text-primary cursor-pointer'
                                  onClick={() => openPDF(file.base64, file.name)}
                                >{`${file.name}, `}</span>
                              ) : (
                                <span
                                  key={i}
                                  className='fw-normal fs-16px text-primary cursor-pointer'
                                  onClick={() => openPDF(file.base64, file.name)}
                                >
                                  {file.name}
                                </span>
                              )
                            )
                          ) : (
                            <span className='fw-normal fs-16px text-gray-500'>не вказано</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-normal text-gray-500 text-lg-end fs-5'>
                        Додано:
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-normal fs-16px'>
                          {user.created_at &&
                            user.updated_at &&
                            `${user.created_at
                              .slice(0, user.created_at.indexOf(' '))
                              .replaceAll('-', '.')} (оновлено: ${user.updated_at
                              .slice(0, user.updated_at.indexOf(' '))
                              .replaceAll('-', '.')})`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 ps-0 ps-lg-9 pe-0 mt-4 mt-lg-0'>
          <div
            className={
              user.checked === 0 ? 'card card-custom mt-lg-20 p-9' : 'card card-custom p-9'
            }
          >
            <h2 className='mb-7 fs-3 fs-sm-4 fw-boldest'>Контакти</h2>
            <div className='row ms-0 me-0'>
              {user.contacts && user.contacts.email.length > 0 ? (
                <div className='row ms-0 me-0 p-0'>
                  <div
                    className={
                      user.contacts.phone.length > 0
                        ? 'col-12 p-0 d-flex flex-row border-1 border-bottom-dotted border-secondary'
                        : 'col-12 p-0 d-flex flex-row'
                    }
                  >
                    <label className='fw-bold text-gray-500 mt-2px me-15px'>
                      <i className='fas fa-envelope fs-3 fs-sm-4'></i>
                    </label>

                    <div className='fv-row pb-3'>
                      {user.contacts.email.map((email: string, i: number) => (
                        <p key={i} className='d-block fw-bold fs-5 fs-sm-6 mb-0'>
                          <button
                            className='popover-btn btn p-0 text-dark text-hover-primary cursor-pointer'
                            data-bs-toggle='popover'
                            data-bs-trigger='focus'
                            data-bs-custom-class='popover-inverse popover-dark'
                            data-bs-placement='top'
                            title='Скопійовано'
                            onClick={(e) => copyContacts(e.target)}
                          >
                            {email}
                          </button>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              {user.contacts && user.contacts.phone.length > 0 ? (
                <div className='row ms-0 me-0 p-0'>
                  <div
                    className={
                      user.contacts.messengers.length > 0 || user.contacts.socialLinks.length > 0
                        ? 'col-12 p-0 d-flex flex-row mt-3 border-1 border-bottom-dotted border-secondary'
                        : 'col-12 p-0 d-flex flex-row mt-3'
                    }
                  >
                    <label className='fw-bold text-gray-500 mt-2px me-15px'>
                      <i className='fas fa-phone fs-3 fs-sm-4 '></i>
                    </label>

                    <div className='fv-row pb-3'>
                      {user.contacts.phone.map((number: string, i: number) => (
                        <p key={i} className='d-block fw-bold fs-5 fs-sm-6 mb-0'>
                          <button
                            className='popover-btn btn p-0 text-dark text-hover-primary cursor-pointer'
                            data-bs-toggle='popover'
                            data-bs-trigger='focus'
                            data-bs-custom-class='popover-inverse popover-dark'
                            data-bs-placement='top'
                            title='Скопійовано'
                            onClick={(e) => copyContacts(e.target)}
                          >
                            {number}
                          </button>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {user.contacts &&
            (user.contacts.messengers.length > 0 || user.contacts.socialLinks.length > 0) ? (
              <div className='row'>
                <div className='col-12'>
                  {user.contacts &&
                    user.contacts.messengers.map((mess: {name: number; path: string}, i: number) =>
                      mess.name === 3 ? (
                        <button
                          key={i}
                          data-bs-toggle='popover'
                          data-bs-trigger='focus'
                          data-bs-custom-class='popover-inverse popover-dark'
                          data-bs-placement='top'
                          title='Скопійовано'
                          onClick={() => copyContactsValue(mess.path)}
                          className='popover-btn btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mt-20px'
                        >
                          <i className='fab fa-skype fs-3 fs-sm-4'></i>
                        </button>
                      ) : null
                    )}
                  {user.contacts &&
                    user.contacts.socialLinks.map(
                      (link: {name: number; path: string}, i: number) => {
                        if (link.name === 0) {
                          return (
                            <a
                              key={i}
                              href={link.path}
                              target='_blank'
                              rel='noreferrer'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mt-20px'
                            >
                              <i className='fab fa-linkedin fs-3 fs-sm-4'></i>
                            </a>
                          )
                        } else if (link.name === 1) {
                          return (
                            <a
                              key={i}
                              href={link.path}
                              target='_blank'
                              rel='noreferrer'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mt-20px'
                            >
                              <i className='fab fa-github fs-3 fs-sm-4'></i>
                            </a>
                          )
                        } else if (link.name === 2) {
                          return (
                            <a
                              key={i}
                              href={link.path}
                              target='_blank'
                              rel='noreferrer'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mt-20px'
                            >
                              <i className='fab fa-facebook-square fs-3 fs-sm-4'></i>
                            </a>
                          )
                        } else {
                          return (
                            <a
                              key={i}
                              href={link.path}
                              target='_blank'
                              rel='noreferrer'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2 mt-20px'
                            >
                              <i className='fas fa-globe fs-3 fs-sm-4'></i>
                            </a>
                          )
                        }
                      }
                    )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
