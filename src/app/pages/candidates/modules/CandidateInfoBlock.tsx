import {FC} from 'react'



const CandidateInfoBlock: FC = () => {
  return (
    
      <div className='w-100 mb-10 pe-4'>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='required form-label fw-bold fs-6'>
            Ім'я
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='required form-label fw-bold fs-6'>
            Прізвище
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
            Країна
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' />
        </div>
        <div className='name d-flex justify-content-between align-items-center mb-4'>
          <label htmlFor='exampleFormControlInput1' className='form-label fw-bold fs-6'>
            Місто
          </label>
          <input type='text' className='form-control form-control-solid w-75 h-40px' />
        </div>
      </div>
      
  )
}

export default CandidateInfoBlock
