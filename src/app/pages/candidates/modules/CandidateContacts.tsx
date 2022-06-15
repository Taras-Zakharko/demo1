import {mapToStyles} from '@popperjs/core/lib/modifiers/computeStyles'
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

interface ICandidateContacts {
  contactsRef?: any
}

const CandidateContacts: FC<ICandidateContacts> = ({contactsRef}) => {
  const [phoneNumber, setPhoneNumber] = useState<string[]>([''])
  const [email, setEmail] = useState<string[]>([''])
  const [messenger, setMessenger] = useState<{[key: string]: string | number}[]>([
    {id: 1, type: 1, value: '380945858432'},
  ])
  const [userLinks, setUserLinks] = useState<{[key: string]: string | number}[]>([
    {
      id: 1,
      type: 2,
      value:
        'https://uk-ua.facebook.com/people/%D0%9F%D0%B5%D1%82%D1%80%D0%BE-%D0%9F%D0%B5%D1%82%D1%80%D0%BE/100081560331704/',
    },
  ])

  function handleChangeSelect(id: number, value: string, key: string, funk: any) {
    funk((curState: any[]) =>
      curState.map((obj) => {
        if (obj.id === id) {
          return {...obj, [key]: value}
        } else {
          return obj
        }
      })
    )
  }

  return (
    <div ref={contactsRef} className='accordion-item mb-4'>
      <h2 className='accordion-header' id='kt_accordion_1_header_2'>
        <button
          className='accordion-button fs-4 fw-bold'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_accordion_1_body_2'
          aria-expanded='false'
          aria-controls='kt_accordion_1_body_2'
        >
          Контакти
        </button>
      </h2>
      <div
        id='kt_accordion_1_body_2'
        className='accordion-collapse collapse show'
        aria-labelledby='kt_accordion_1_header_2'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body'>
          <div className='row d-flex mb-4'>
            <div className='col-lg-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-bold pt-3 fs-6'>
                Телефон
              </label>
            </div>
            <div className='col-lg-6'>
              {phoneNumber.map((number, i) => {
                if (i === 0) {
                  return (
                    <input
                      key={i}
                      type='text'
                      className='form-control form-control-solid w-100 h-40px mb-4'
                    />
                  )
                } else {
                  return (
                    <div className='row position-relative' id={'phone-' + i}>
                      <div className='col-lg-12'>
                        <input
                          key={i}
                          type='text'
                          className='form-control form-control-solid w-100 h-40px mb-4'
                        />
                      </div>
                      <div className='col-lg-2 position-absolute start-100 top-25'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => document.querySelector(`#phone-${i}`)?.remove()}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-1tx svg-icon-dark ms-4'
                          />
                        </button>
                      </div>
                    </div>
                  )
                }
              })}

              <button
                className='btn ps-0 pt-0 text-primary fs-7'
                onClick={() => setPhoneNumber((phone) => phone.concat(''))}
              >
                Додати ще
              </button>
            </div>
            <div className='col-lg-3'></div>
          </div>
          <div className='row d-flex mb-4'>
            <div className='col-lg-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-bold pt-3 fs-6'>
                Ел. пошта
              </label>
            </div>
            <div className='col-lg-6'>
              {email.map((adres, i) => {
                if (i === 0) {
                  return (
                    <input
                      key={i}
                      type='email'
                      className='form-control form-control-solid w-100 h-40px mb-4'
                    />
                  )
                } else {
                  return (
                    <div className='row position-relative' id={'email-' + i}>
                      <div className='col-lg-12'>
                        <input
                          key={i}
                          type='email'
                          className='form-control form-control-solid w-100 h-40px mb-4'
                        />
                      </div>
                      <div className='col-lg-2 position-absolute start-100 top-25'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => document.querySelector(`#email-${i}`)?.remove()}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-1tx svg-icon-dark ms-4'
                          />
                        </button>
                      </div>
                    </div>
                  )
                }
              })}

              <button
                className='btn ps-0 pt-0 text-primary fs-7'
                onClick={() => setEmail((adres) => adres.concat(''))}
              >
                Додати ще
              </button>
            </div>
            <div className='col-lg-3'></div>
          </div>
          <div className='row d-flex mb-4'>
            <div className='col-lg-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-bold pt-3 fs-6'>
                Месенджери
              </label>
            </div>
            <div className='col-lg-9'>
              {messenger.map((mess, i) => {
                if (i === 0) {
                  return (
                    <div className='row mb-4 align-items-center'>
                      <div className='col-lg-4'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          onChange={(e) =>
                            handleChangeSelect(+mess.id, e.target.value, 'type', setMessenger)
                          }
                          value={mess.type}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(+mess.id, e.target.value, 'value', setMessenger)
                          }
                          value={mess.value}
                        />
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='row mb-4 align-items-center' id={'messenger-' + mess.id}>
                      <div className='col-lg-4'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          onChange={(e) =>
                            handleChangeSelect(+mess.id, e.target.value, 'type', setMessenger)
                          }
                          value={mess.type}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(+mess.id, e.target.value, 'value', setMessenger)
                          }
                          value={mess.value}
                          placeholder='ID'
                        />
                      </div>
                      <div className='col-lg-1'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => document.querySelector(`#messenger-${mess.id}`)?.remove()}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-1tx svg-icon-dark ms-4'
                          />
                        </button>
                      </div>
                    </div>
                  )
                }
              })}
              <button
                className='btn ps-0 text-primary fs-7'
                onClick={() =>
                  setMessenger((mess) => mess.concat({id: Date.now(), type: 0, value: ''}))
                }
              >
                Додати ще
              </button>
            </div>
          </div>
          <div className='row d-flex mb-4'>
            <div className='col-lg-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-bold pt-3 fs-6'>
                Посилання
              </label>
            </div>
            <div className='col-lg-9'>
              {userLinks.map((link, i) => {
                if (i === 0) {
                  return (
                    <div className='row mb-4 align-items-center'>
                      <div className='col-lg-4'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          onChange={(e) =>
                            handleChangeSelect(+link.id, e.target.value, 'type', setUserLinks)
                          }
                          value={link.type}
                        >
                          <option value='0'>LinkedIn</option>
                          <option value='1'>GitHub</option>
                          <option value='2'>Facebook</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(+link.id, e.target.value, 'value', setUserLinks)
                          }
                          value={link.value}
                          placeholder='URL'
                        />
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='row mb-4 align-items-center' id={'user-link-' + link.id}>
                      <div className='col-lg-4'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          onChange={(e) =>
                            handleChangeSelect(+link.id, e.target.value, 'type', setUserLinks)
                          }
                          value={link.type}
                        >
                          <option value='0'>LinkedIn</option>
                          <option value='1'>GitHub</option>
                          <option value='2'>Facebook</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(+link.id, e.target.value, 'value', setUserLinks)
                          }
                          value={link.value}
                          placeholder='URL'
                        />
                      </div>
                      <div className='col-lg-1'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => document.querySelector(`#user-link-${link.id}`)?.remove()}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-1tx svg-icon-dark ms-4'
                          />
                        </button>
                      </div>
                    </div>
                  )
                }
              })}

              <button
                className='btn ps-0 text-primary fs-7'
                onClick={() =>
                  setUserLinks((link) => link.concat({id: Date.now(), type: 0, value: ''}))
                }
              >
                Додати ще
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateContacts
