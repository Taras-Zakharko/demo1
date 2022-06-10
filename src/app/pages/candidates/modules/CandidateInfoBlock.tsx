import {FC} from 'react'

interface ICandidateInfoBlock {
  infoRef?: any
}

const CandidateInfoBlock: FC<ICandidateInfoBlock> = ({infoRef}) => {
  return (
    <div ref={infoRef} className='card p-10 mt-20 mb-6 flex-row'>
      <div className='col-lg-8 mb-10 pe-4'>
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
      <div
        className=' w-100 image-input image-input-outline'
        data-kt-image-input='true'
        style={{backgroundImage: `url(../../media/avatars/blank.svg)`}}
      >
        <div
          className='image-input-wrapper w-100 h-100'
          style={{backgroundImage: `url(../../media/avatars/300-1.jpg)`}}
        >
          <label
            className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            data-bs-dismiss='click'
            title='Change avatar'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
            <input type='hidden' name='avatar_remove' />
          </label>
          <span
            className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='cancel'
            data-bs-toggle='tooltip'
            data-bs-dismiss='click'
            title='Cancel avatar'
          >
            <i className='bi bi-x fs-2'></i>
          </span>
          <span
            className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='remove'
            data-bs-toggle='tooltip'
            data-bs-dismiss='click'
            title='Remove avatar'
          >
            <i className='bi bi-x fs-2'></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CandidateInfoBlock
