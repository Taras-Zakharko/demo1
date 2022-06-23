import React, {FC, useEffect, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

interface ICandidateContacts {
  contactsRef?: any
  setEditUser?: any
  user?: any
}

const CandidateContacts: FC<ICandidateContacts> = ({contactsRef, setEditUser, user}) => {
  const [phoneNumber, setPhoneNumber] = useState<string[]>(user.contacts.phone)
  const [email, setEmail] = useState<string[]>(user.contacts.email)
  const [messenger, setMessenger] = useState<{[key: string]: string | number}[]>(
    user.contacts.messengers
  )
  const [userLinks, setUserLinks] = useState<{[key: string]: string | number}[]>(
    user.contacts.socialLinks
  )

  useEffect(() => {
    setPhoneNumber(user.contacts.phone)
    setEmail(user.contacts.email)
    setMessenger(user.contacts.messengers)
    setUserLinks(user.contacts.socialLinks)
  }, [user])
  

  function handleChangeSelect(
    id: number,
    value: string | number,
    key: string,
    funk: any,
    arrayState: any,
    wrap: string
  ) {
    const arr = arrayState.map((obj: any) => {
      if (obj.id === id) {
        return {...obj, [key]: value}
      } else {
        return obj
      }
    })
    funk(arr)
    setEditUser((user: any) => ({...user, contacts: {...user.contacts, [wrap]: [...arr]}}))
  }

  function removeSelect(funk: any, index: number, key: string) {
    funk((arr: any) => {
      arr.splice(index, 1)
      setEditUser((user: any) => ({...user, contacts: {...user.contacts, [key]: [...arr]}}))
      return arr
    })
  }

  function removeArray(index: number, funk:any, key: string) {
    funk((arr:string[]) => {
      arr.splice(index, 1)
      setEditUser((user: any) => ({...user, contacts: {...user.contacts, [key]: [...arr]}}))
      return arr
    })
  }

  function cangeArray(e: any, i: number, array:string[], funk:any, key:string) {
    const arr = array.map((num, ind) => (ind === i ? (num = e.target.value) : num))
    funk(arr)
    setEditUser((user: any) => ({...user, contacts: {...user.contacts, [key]: [...arr]}}))
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
                      value={number}
                      onChange={(e) => cangeArray(e, i, phoneNumber, setPhoneNumber, 'phone')}
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
                          value={number}
                          onChange={(e) => cangeArray(e, i, phoneNumber, setPhoneNumber, 'phone')}
                        />
                      </div>
                      <div className='col-lg-2 position-absolute start-100 top-25'>
                        <button className='btn p-0 cursor-pointer' onClick={() => removeArray(i, setPhoneNumber, 'phone')}>
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
                      value={adres}
                      onChange={(e) => cangeArray(e, i, email, setEmail, 'email')}
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
                          value={adres}
                          onChange={(e) => cangeArray(e, i, email, setEmail, 'email')}
                        />
                      </div>
                      <div className='col-lg-2 position-absolute start-100 top-25'>
                        <button className='btn p-0 cursor-pointer' onClick={() => removeArray(i, setEmail, 'email')}>
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
                            handleChangeSelect(
                              +mess.id,
                              +e.target.value,
                              'name',
                              setMessenger,
                              messenger,
                              'messengers'
                            )
                          }
                          value={mess.name}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                          <option value='3'>Skype</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(
                              +mess.id,
                              e.target.value,
                              'link',
                              setMessenger,
                              messenger,
                              'messengers'
                            )
                          }
                          value={mess.link}
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
                            handleChangeSelect(
                              +mess.id,
                              +e.target.value,
                              'name',
                              setMessenger,
                              messenger,
                              'messengers'
                            )
                          }
                          value={mess.name}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                          <option value='3'>Skype</option>
                        </select>
                      </div>
                      <div className='col-lg-6'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          onChange={(e) =>
                            handleChangeSelect(
                              +mess.id,
                              e.target.value,
                              'link',
                              setMessenger,
                              messenger,
                              'messengers'
                            )
                          }
                          value={mess.link}
                          placeholder='ID'
                        />
                      </div>
                      <div className='col-lg-1'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => removeSelect(setMessenger, i, 'messengers')}
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
                  setMessenger((mess) => mess.concat({id: Date.now(), name: 0, link: ''}))
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
                            handleChangeSelect(
                              +link.id,
                              +e.target.value,
                              'name',
                              setUserLinks,
                              userLinks,
                              'socialLinks'
                            )
                          }
                          value={link.name}
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
                            handleChangeSelect(
                              +link.id,
                              e.target.value,
                              'path',
                              setUserLinks,
                              userLinks,
                              'socialLinks'
                            )
                          }
                          value={link.path}
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
                            handleChangeSelect(
                              +link.id,
                              +e.target.value,
                              'name',
                              setUserLinks,
                              userLinks,
                              'socialLinks'
                            )
                          }
                          value={link.name}
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
                            handleChangeSelect(
                              +link.id,
                              e.target.value,
                              'path',
                              setUserLinks,
                              userLinks,
                              'socialLinks'
                            )
                          }
                          value={link.path}
                          placeholder='URL'
                        />
                      </div>
                      <div className='col-lg-1'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => removeSelect(setUserLinks, i, 'socialLinks')}
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
                  setUserLinks((link) => link.concat({id: Date.now(), name: 0, path: ''}))
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
