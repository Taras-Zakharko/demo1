import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
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
        <div className='notice d-flex justify-content-between align-items-center bg-light-warning rounded border-warning border border-dashed p-3 all__good-div'>
          <div className='d-flex flex-center fs-6 text-gray-800 '>
            <KTSVG
              path='/media/icons/duotune/files/fil028.svg'
              className='svg-icon-1x svg-icon-warning me-4'
            />
            Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте
            дані кандидата.
          </div>
          <button className='btn btn-light-success cursor-pointer fs-6 all__good' onClick={allGood}>
            <KTSVG
              path='/media/icons/duotune/arrows/arr012.svg'
              className='svg-icon-2x svg-icon-success me-4'
            />
            Все ок, зберегти
          </button>
        </div>
      ) : null}

      <div className='card mb-5 mb-xl-10 position-relative' id='kt_profile_details_view'>
        <div className='card-header border-bottom-0 position-absolute w-100 '>
          <div className='card-title m-0'>
            <Link to='/candidates' className='fw-bolder m-0'>
              <KTSVG
                path='/media/icons/duotune/arrows/arr002.svg'
                className='svg-icon-2x svg-icon-dark me-4'
              />
            </Link>
          </div>
          <Link
            to={`/candidates/edit/user/id=${idUser}`}
            className='d-flex flex-center text-dark fs-4 '
          >
            <KTSVG
              path='/media/icons/duotune/files/fil026.svg'
              className='svg-icon-2x svg-icon-dark me-4'
            />
            Редагувати
          </Link>
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='card-body ms-12 p-9'>
              <div className='row mb-7 align-items-center'>
                <label className='col-lg-4 fw-bold text-muted text-end'>
                  <img className='symbol w-100' src={toAbsoluteUrl(`${user.photo}`)} alt='' />
                </label>

                <div className='col-lg-8'>
                  <h2 className='fw-bolder fs-2 text-dark'>
                    {user.firstName} {user.lastName}
                  </h2>
                  <span className='text-muted text-muted d-block fs-4'>{user.specialty}</span>
                  <span className='text-muted fw-bold text-muted d-block fs-6'>
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              </div>
              <div className='row pb-4 mb-7 border-bottom'>
                <div className='col-lg-4'></div>
                <div className='col-lg-8 mb-4'>
                  <h2 className='fs-4 fw-boldest'>Досвід</h2>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Досвід роботи</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-4'>
                      {' '}
                      {`Більше ${user.experience[0].yearsExperience} років`}{' '}
                    </span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Навички</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-4'>
                      {user.skils.map((skil: any, i: number) =>
                        i !== user.skils.length - 1 ? `${skil}, ` : `${skil}`
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className='row pb-4 mb-7'>
                <div className='col-lg-4'></div>
                <div className='col-lg-8 mb-4'>
                  <h2 className='fs-4 fw-boldest'>Резюме і файли </h2>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Резюме </label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-4'>{user.aboutMyself.text}</span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Джерело</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-4'>{user.aboutMyself.source}</span>
                  </div>
                </div>
                <div className='row mb-4 align-items-center'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-4'>GDPR</label>

                  <div className='col-lg-8 fv-row d-flex align-items-center'>
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr012.svg'
                      className='svg-icon-1tx svg-icon-success'
                    />
                    <select
                      ref={GDPRSelect}
                      className='form-select border-0 text-success fs-4'
                      aria-label='Select example'
                      value={gdpr}
                      onChange={() => setGdpr(+GDPRSelect!.current!.value)}
                    >
                      <option value='1'>
                        Статус дозволу на використання персональних даних не визначено
                      </option>
                      <option value='2'>
                        Кандидат дав згоду на використаня персональних даних
                      </option>
                      <option value='0'>
                        Видалити кандидата, дозвіл не отримано або неможливо отримати
                      </option>
                    </select>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Файли</label>

                  <div className='col-lg-8 fv-row d-flex align-items-center fs-4'>
                    <KTSVG
                      path='/media/icons/duotune/files/fil027.svg'
                      className='svg-icon-1tx svg-icon-primary me-2'
                    />
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
                  <label className='col-lg-4 fw-bold text-muted text-end fs-6'>Додано</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-4'>10.02.2020 (оновлено: 20.20.2021)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 d-flex flex-center'>
            <div className='card card-custom shadow p-6'>
              <h2 className='mb-7 fs-4 fw-boldest'>Контакти</h2>
              <div className='row border-bottom'>
                {user.contacts.email.length > 0 ? (
                  <div className='row mb-4'>
                    <label className='col-lg-2 fw-bold text-muted'>
                      <KTSVG
                        path='/media/icons/duotune/communication/com016.svg'
                        className='svg-icon-3'
                      />
                    </label>

                    <div className='col-lg-10 fv-row'>
                      {user.contacts.email.map((email: string, i: number) => (
                        <span className='d-block fw-bold fs-6'>
                          <a href={'tomail:' + email} className='text-dark text-hover-primary'>
                            {email}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {user.contacts.messengers.map((mess: {name: number; link: string}) =>
                  mess.name === 3 ? (
                    <div className='row mb-4'>
                      <label className='col-lg-2 fw-bold text-muted'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com015.svg'
                          className='svg-icon-3'
                        />
                      </label>

                      <div className='col-lg-10 fv-row'>
                        <span className='fw-bold fs-6'>
                          <a href={'skype:' + mess.link} className='text-dark text-hover-primary'>
                            {mess.link}
                          </a>
                        </span>
                      </div>
                    </div>
                  ) : null
                )}

                <div className='row mb-4'>
                  <label className='col-lg-2 fw-bold text-muted'>
                    <KTSVG
                      path='/media/icons/duotune/communication/com017.svg'
                      className='svg-icon-3'
                    />
                  </label>

                  <div className='col-lg-10 fv-row'>
                    {user.contacts.phone.map((number: string) => (
                      <span className='d-block fw-bold fs-6'>
                        <a href={'tel:' + number} className='text-dark text-hover-primary'>
                          {number}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-lg-12'>
                  {user.contacts.socialLinks.map((link: {name: number; path: string}) => {
                    if (link.name === 0) {
                      return (
                        <a
                          href={link.path}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                        >
                          <KTSVG
                            path='/media/icons/duotune/social/soc012.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      )
                    }
                    if (link.name === 1) {
                      return (
                        <a
                          href={link.path}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                        >
                          <KTSVG
                            path='/media/icons/duotune/social/soc013.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      )
                    }
                    if (link.name === 2) {
                      return (
                        <a
                          href={link.path}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                        >
                          <KTSVG
                            path='/media/icons/duotune/social/soc011.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
