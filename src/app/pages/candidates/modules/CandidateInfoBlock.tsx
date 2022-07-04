import {FC} from 'react'

interface ICandidateInfoBlock{
  id?: number,
  setEditUser?: any,
  user?: any
}


const CandidateInfoBlock: FC<ICandidateInfoBlock> = ({id, setEditUser, user}) => {



  return (
    
      <div className='w-100 mb-10 pe-4'>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='required form-label fw-normal fs-6'>
            Ім'я
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' placeholder="Ім'я" value={user.firstName} onChange={(e)=> setEditUser((user:object) => ({...user, firstName: e.target.value}))} />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='required form-label fw-normal fs-6'>
            Прізвище
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' placeholder="Прізвище" value={user.lastName} onChange={(e)=> setEditUser((user:object) => ({...user, lastName: e.target.value}))} />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
            Країна
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' placeholder="Країна" value={user.location.country} onChange={(e)=> setEditUser((user:{location:object}) => ({...user, location: ({...user.location, country: e.target.value })}))} />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='form-label fw-normal fs-6'>
            Місто
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' placeholder="Місто" value={user.location.city} onChange={(e)=> setEditUser((user:{location:object}) => ({...user, location: ({...user.location, city: e.target.value })}))} />
        </div>
      </div>
      
  )
}

export default CandidateInfoBlock
