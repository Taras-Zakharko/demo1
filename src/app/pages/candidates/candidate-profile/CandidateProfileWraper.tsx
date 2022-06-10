/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'

export function CandidateProfileWraper() {
 function allGood(){
   if(document.querySelector('.all__good-div')){
    document.querySelector('.all__good-div')?.classList.add('d-none')
   }
   
 }


  return (
    <>
      <div className='notice d-flex justify-content-between align-items-center bg-light-warning rounded border-warning border border-dashed p-3 all__good-div'>
        <div className='d-flex flex-center fs-6 text-gray-600 '>
          <KTSVG
            path='/media/icons/duotune/general/gen044.svg'
            className='svg-icon-2tx svg-icon-warning me-4'
          />
          Це резюме було додано автоматично, всі дані внесені програмою. Будь ласка, перепровірте
          дані кандидата.
        </div>
        <a className='text-success cursor-pointer fs-6 all__good' onClick={allGood}>
          <KTSVG
            path='/media/icons/duotune/arrows/arr012.svg'
            className='svg-icon-2tx svg-icon-success me-4'
          />
          Все ок, зберегти
        </a>
      </div>
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
          <Link to='edit' className='d-flex flex-center text-dark fs-4 '>
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
                  <img
                    className='symbol w-100'
                    src={toAbsoluteUrl('/media/avatars/300-14.jpg')}
                    alt=''
                  />
                </label>

                <div className='col-lg-8'>
                  <h2 className='fw-bolder fs-3 text-dark'>Анжеліка Капустянко</h2>
                  <span className='text-muted text-muted d-block fs-5'>Junior Web designer</span>
                  <span className='text-muted fw-bold text-muted d-block fs-5'>Київ, Україна</span>
                </div>
              </div>
              <div className='row pb-4 mb-7 border-bottom'>
                <div className='col-lg-4'></div>
                <div className='col-lg-8 mb-4'>
                  <h2>Досвід</h2>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>Досвід роботи</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>Більше 12 років</span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>Навички</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>Web design, User experience, Analytics</span>
                  </div>
                </div>
              </div>

              <div className='row pb-4 mb-7'>
                <div className='col-lg-4'></div>
                <div className='col-lg-8 mb-4'>
                  <h2>Резюме і файли </h2>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>Резюме і файли </label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>
                      Hey! I'm Max. I'm a product ux/ui and digital designer. I help teams,
                      companies, and enterprises to design and launch.
                    </span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>Джерело</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>LinkedIn</span>
                  </div>
                </div>
                <div className='row mb-4 align-items-center'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>GDPR</label>

                  <div className='col-lg-8 fv-row d-flex align-items-center'>
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr012.svg'
                      className='svg-icon-1tx svg-icon-success'
                    />
                    <select
                      className='form-select border-0 text-success'
                      aria-label='Select example'
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
                  <label className='col-lg-4 fw-bold text-muted text-end'>Прикріплені файли</label>

                  <div className='col-lg-8 fv-row d-flex align-items-center'>
                    <KTSVG
                      path='/media/icons/duotune/files/fil027.svg'
                      className='svg-icon-1tx svg-icon-primary me-2'
                    />
                    <a className='fw-bold fs-6'>Head of design</a>
                    {', '} <a className='fw-bold fs-6 ms-1'>MacPaw.pdf</a>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-4 fw-bold text-muted text-end'>Додано</label>

                  <div className='col-lg-8 fv-row'>
                    <span className='fw-bold fs-6'>10.02.2020 (оновлено: 20.20.2021)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 d-flex flex-center'>
            <div className='card card-custom shadow p-6'>
              <h2 className='mb-7'>Контакти</h2>
              <div className='row border-bottom'>
                <div className='row mb-4'>
                  <label className='col-lg-2 fw-bold text-muted'>
                  <KTSVG path='/media/icons/duotune/communication/com016.svg' className='svg-icon-3' />
                  </label>

                  <div className='col-lg-10 fv-row'>
                    <span className='fw-bold fs-6'><a href='tomail:a.kapustanko@gmail.com' className='text-dark'>a.kapustanko@gmail.com</a></span><br/>
                    <span className='fw-bold fs-6'><a href='tomail:kapustanko@company.com' className='text-dark'>kapustanko@company.com</a></span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-2 fw-bold text-muted'>
                  <KTSVG path='/media/icons/duotune/communication/com015.svg' className='svg-icon-3' />
                  </label>

                  <div className='col-lg-10 fv-row'>
                    <span className='fw-bold fs-6'><a href='skype:a.kapustanko' className='text-dark'>a.kapustanko</a></span>
                  </div>
                </div>
                <div className='row mb-4'>
                  <label className='col-lg-2 fw-bold text-muted'>
                  <KTSVG path='/media/icons/duotune/communication/com017.svg' className='svg-icon-3' />
                  </label>

                  <div className='col-lg-10 fv-row'>
                    <span className='fw-bold fs-6'><a href='tel:+38 099 890 09 09' className='text-dark'>+38 099 890 09 09</a></span>
                  </div>
                </div>
              </div>
              <div className='row mt-4'>
                  <div className="col-lg-12">
                  <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/social/soc011.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/social/soc012.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/social/soc013.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
