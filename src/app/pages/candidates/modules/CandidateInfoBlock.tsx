import {FC, useEffect, useRef, useState} from 'react'

interface ICandidateInfoBlock {
  id?: number
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateInfoBlock: FC<ICandidateInfoBlock> = ({id, setEditUser, user, labelW, inputW}) => {


  return (
    <div className='col-lg-12 mb-10'>
      <div className='row name d-flex justify-content-between align-items-center'>
        <label
          htmlFor='exampleFormControlInput1'
          className={'col-lg-' + labelW + ' required form-label fw-normal mb-4 fs-5 fs-sm-6'}
        >
          Ім'я
        </label>
        <div
          className={'col-lg-' + inputW + ' d-flex justify-content-between flex-column flex-lg-row'}
        >
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 mb-6 h-40px text-gray-800'
            placeholder="Ім'я"
            value={user.firstName}
            onChange={(e) => setEditUser((user: object) => ({...user, firstName: e.target.value}))}
          />
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 h-40px text-gray-800'
            placeholder='Прізвище'
            value={user.lastName}
            onChange={(e) => setEditUser((user: object) => ({...user, lastName: e.target.value}))}
          />
        </div>
      </div>
      <div className='row name d-flex justify-content-between align-items-center mb-4'>
        <label
          htmlFor='exampleFormControlInput1'
          className={'col-lg-' + labelW + ' required form-label fw-normal mb-4 fs-6'}
        >
          Місцезнаходження
        </label>
        <div
          className={'col-lg-' + inputW + ' d-flex justify-content-between flex-column flex-lg-row'}
        >
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 mb-4 h-40px text-gray-800'
            placeholder='Країна'
            value={(user.location)?user.location.country:''}
            onChange={(e) =>
              setEditUser((user: {location: any}) => ({
                ...user,
                location: {...user.location, country: e.target.value},
              }))
            }
          />
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 h-40px text-gray-800'
            placeholder='Місто'
            value={(user.location)?user.location.city[0]:''}
            onChange={(e) =>{
              setEditUser((user: {location: any})=>({
                ...user, location: {...user.location, city: user.location.city.map((city:string, i: number)=>(i===0)?city=e.target.value: city)}
              }))
            }
              
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CandidateInfoBlock
