import React, {FC, useEffect, useState} from 'react'

interface ICandidateContacts {
  contactsRef?: any
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateContacts: FC<ICandidateContacts> = ({contactsRef, setEditUser, user, labelW, inputW}) => {
  const [phoneNumber, setPhoneNumber] = useState<string[]>([])
  const [email, setEmail] = useState<string[]>([])
  const [messenger, setMessenger] = useState<{[key: string]: string | number}[]>(
    []
  )
  const [userLinks, setUserLinks] = useState<{[key: string]: string | number}[]>(
    []
  )

  useEffect(() => {
    if(user.contacts){
      setPhoneNumber(user.contacts.phone)
      setEmail(user.contacts.email)
      setMessenger(user.contacts.messengers)
      setUserLinks(user.contacts.socialLinks)
    }
    
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
    <div ref={contactsRef} className='accordion-item p-0'>
      <h2 className='accordion-header' id='kt_accordion_1_header_2'>
        <button
          className='accordion-button fs-4 fw-boldest p-8 ps-12 pe-9 bg-white text-dark '
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_accordion_1_body_2'
          aria-expanded='false'
          aria-controls='kt_accordion_1_body_2'
        >
          ????????????????
        </button>
      </h2>
      <div
        id='kt_accordion_1_body_2'
        className='accordion-collapse collapse p-4 show'
        aria-labelledby='kt_accordion_1_header_2'
        data-bs-parent='#kt_accordion_1'
      >
        <div className='accordion-body ps-8'>
          <div className='row d-flex mb-4'>
            <div className={'col-lg-'+labelW+' d-flex justify-content-between'}>
              <label htmlFor='exampleFormControlInput1' className='form-label required fw-normal pt-3 fs-6'>
                ??????????????
              </label>
              <button
                className='btn ps-0 pt-0 text-primary d-block d-lg-none fs-7'
                onClick={() => setPhoneNumber((phone) => phone.concat(''))}
              >
                ???????????? ????
              </button>
            </div>
            <div className='col-lg-5'>
              {(phoneNumber.length>0)?phoneNumber.map((number, i) => {
                if (i === 0) {
                  return (
                    <div key={i} className='col-12 col-lg-11'>
                        <input
                          type='text'
                          className='form-control form-control-solid h-40px mb-4'
                          value={number}
                          onChange={(e) => cangeArray(e, i, phoneNumber, setPhoneNumber, 'phone')}
                        />
                      </div>
                  )
                } else {
                  return (
                    <div key={i} className='row position-relative' id={'phone-' + i}>
                      <div className='col-11'>
                        <input
                          type='text'
                          className='form-control form-control-solid h-40px mb-4'
                          value={number}
                          onChange={(e) => cangeArray(e, i, phoneNumber, setPhoneNumber, 'phone')}
                        />
                      </div>
                      <div className='col-1 d-flex flex-center mb-4'>
                        <button className='btn p-0 cursor-pointer' onClick={() => removeArray(i, setPhoneNumber, 'phone')}>
                          <i className="fas fa-trash text-gray-500 fs-4"></i>
                        </button>
                      </div>
                    </div>
                  )
                }
              }): setPhoneNumber((phone) => phone.concat(''))}
              <button
                className='btn ps-0 pt-0 d-none d-lg-block text-primary fs-7'
                onClick={() => setPhoneNumber((phone) => phone.concat(''))}
              >
                ???????????? ????
              </button>
            </div>
          </div>
          <div className='row d-flex mb-4'>
            <div className={'col-lg-'+labelW+' d-flex justify-content-between'}>
              <label htmlFor='exampleFormControlInput1' className='form-label required fw-normal pt-3 fs-6'>
                ????. ??????????
              </label>
              <button
                className='btn ps-0 pt-0 text-primary d-block d-lg-none fs-7'
                onClick={() => setEmail((adres) => adres.concat(''))}
              >
                ???????????? ????
              </button>
            </div>
            <div className='col-lg-5'>
              {(email.length> 0)?email.map((adres, i) => {
                if (i === 0) {
                  return (
                    <div key={i} className='col-12 col-lg-11'>
                        <input
                          type='email'
                          className='form-control form-control-solid h-40px mb-4'
                          value={adres}
                          onChange={(e) => cangeArray(e, i, email, setEmail, 'email')}
                        />
                      </div>
                  )
                } else {
                  return (
                    <div key={i} className='row position-relative' id={'email-' + i}>
                      <div className='col-12 col-lg-11'>
                        <input
                          type='email'
                          className='form-control form-control-solid h-40px mb-4'
                          value={adres}
                          onChange={(e) => cangeArray(e, i, email, setEmail, 'email')}
                        />
                      </div>
                      <div className='col-1 d-flex flex-center mb-4'>
                        <button className='btn p-0 cursor-pointer' onClick={() => removeArray(i, setEmail, 'email')}>
                        <i className="fas fa-trash text-gray-500 fs-4"></i>
                        </button>
                      </div>
                    </div>
                  )
                }
              }): setEmail((adres) => adres.concat(''))}

              <button
                className='btn ps-0 pt-0 text-primary d-none d-lg-block fs-7'
                onClick={() => setEmail((adres) => adres.concat(''))}
              >
                ???????????? ????
              </button>
            </div>
          </div>
          <div className='row d-flex mb-4'>
            <div className={'col-lg-'+labelW+' d-flex justify-content-between'}>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-normal pt-3 fs-6'>
                ????????????????????
              </label>
              <button
                className='btn ps-0 text-primary d-block d-lg-none fs-7'
                onClick={() =>
                  setMessenger((mess) => mess.concat({id: Date.now(), name: 0, link: ''}))
                }
              >
                ???????????? ????
              </button>
            </div>
            <div className={'col-lg-'+inputW}>
              {(messenger.length>0)?messenger.map((mess, i) => {
                if (i === 0) {
                  return (
                    <div key={i} className='row mb-6 align-items-center'>
                      <div className='col-lg-4 mb-4 mb-lg-0'>
                        <select
                          className='form-select form-select-solid pe-9'
                          aria-label='Select example'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +mess.id,
                          //     +e.target.value,
                          //     'name',
                          //     setMessenger,
                          //     messenger,
                          //     'messengers'
                          //   )
                          // }
                          // value={mess.name}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                          <option value='3'>Skype</option>
                        </select>
                      </div>
                      <div className='col-lg-7'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +mess.id,
                          //     e.target.value,
                          //     'link',
                          //     setMessenger,
                          //     messenger,
                          //     'messengers'
                          //   )
                          // }
                          // value={mess.link}
                          placeholder='ID'
                        />
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={i} className='row mb-6 align-items-center' id={'messenger-' + mess.id}>
                      <div className='col-lg-4 mb-4 mb-lg-0'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +mess.id,
                          //     +e.target.value,
                          //     'name',
                          //     setMessenger,
                          //     messenger,
                          //     'messengers'
                          //   )
                          // }
                          // value={mess.name}
                        >
                          <option value='0'>Telegram</option>
                          <option value='1'>Viber</option>
                          <option value='2'>Messenger</option>
                          <option value='3'>Skype</option>
                        </select>
                      </div>
                      <div className='col-11 col-lg-7'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +mess.id,
                          //     e.target.value,
                          //     'link',
                          //     setMessenger,
                          //     messenger,
                          //     'messengers'
                          //   )
                          // }
                          // value={mess.link}
                          placeholder='ID'
                        />
                      </div>
                      <div className='col-1 text-center'>
                        <button
                          className='btn p-0 cursor-pointer '
                          onClick={() => removeSelect(setMessenger, i, 'messengers')}
                        >
                          <i className="fas fa-trash text-gray-500 fs-4"></i>
                        </button>
                      </div>
                    </div>
                  )
                }
              }): setMessenger((mess) => mess.concat({id: Date.now(), name: 0, link: ''})) }
              <button
                className='btn ps-0 text-primary d-none d-lg-block fs-7'
                onClick={() =>
                  setMessenger((mess) => mess.concat({id: Date.now(), name: 0, link: ''}))
                }
              >
                ???????????? ????
              </button>
            </div>
          </div>
          <div className='row d-flex mb-4'>
            <div className={'col-lg-'+labelW+' d-flex justify-content-between'}>
              <label htmlFor='exampleFormControlInput1' className='form-label fw-normal pt-3 fs-6'>
                ??????????????????
              </label>
              <button
                className='btn ps-0 text-primary d-block d-lg-none fs-7'
                onClick={() =>
                  setUserLinks((link) => link.concat({id: Date.now(), name: 0, path: ''}))
                }
              >
                ???????????? ????
              </button>
            </div>
            <div className={'col-lg-'+inputW}>
              {(userLinks.length>0)?userLinks.map((link, i) => {
                if (i === 0) {
                  return (
                    <div key={i} className='row mb-6 align-items-center'>
                      <div className='col-lg-4 mb-4 mb-lg-0'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +link.id,
                          //     +e.target.value,
                          //     'name',
                          //     setUserLinks,
                          //     userLinks,
                          //     'socialLinks'
                          //   )
                          // }
                          // value={link.name}
                        >
                          <option value='0'>LinkedIn</option>
                          <option value='1'>GitHub</option>
                          <option value='2'>Facebook</option>
                        </select>
                      </div>
                      <div className='col-lg-7'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +link.id,
                          //     e.target.value,
                          //     'path',
                          //     setUserLinks,
                          //     userLinks,
                          //     'socialLinks'
                          //   )
                          // }
                          // value={link.path}
                          placeholder='URL'
                        />
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={i} className='row mb-6 align-items-center' id={'user-link-' + link.id}>
                      <div className='col-lg-4 mb-4 mb-lg-0'>
                        <select
                          className='form-select form-select-solid'
                          aria-label='Select example'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +link.id,
                          //     +e.target.value,
                          //     'name',
                          //     setUserLinks,
                          //     userLinks,
                          //     'socialLinks'
                          //   )
                          // }
                          // value={link.name}
                        >
                          <option value='0'>LinkedIn</option>
                          <option value='1'>GitHub</option>
                          <option value='2'>Facebook</option>
                        </select>
                      </div>
                      <div className='col-11 col-lg-7'>
                        <input
                          type='text'
                          className='form-control form-control-solid w-100 h-40px'
                          // onChange={(e) =>
                          //   handleChangeSelect(
                          //     +link.id,
                          //     e.target.value,
                          //     'path',
                          //     setUserLinks,
                          //     userLinks,
                          //     'socialLinks'
                          //   )
                          // }
                          // value={link.path}
                          placeholder='URL'
                        />
                      </div>
                      <div className='col-1 text-center'>
                        <button
                          className='btn p-0 cursor-pointer'
                          onClick={() => removeSelect(setUserLinks, i, 'socialLinks')}
                        >
                          <i className="fas fa-trash text-gray-500 fs-4"></i>
                        </button>
                      </div>
                    </div>
                  )
                }
              }):setUserLinks((link) => link.concat({id: Date.now(), name: 0, path: ''})) }

              <button
                className='btn ps-0 text-primary d-none d-lg-block fs-7'
                onClick={() =>
                  setUserLinks((link) => link.concat({id: Date.now(), name: 0, path: ''}))
                }
              >
                ???????????? ????
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateContacts
