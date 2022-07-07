import {FC, useRef, useState} from 'react'

interface ICandidatePhoto {
  url?: string
  setEditUser?: any
}

const CandidatePhoto: FC<ICandidatePhoto> = ({url, setEditUser}) => {
  const [imgName, setImgName] = useState<string>('')

  const img = useRef<HTMLInputElement | null>(null)
  const imgRemove = useRef<HTMLInputElement | null>(null)
  const imgEmpty = useRef<HTMLDivElement | null>(null)

  function choiceImg() {
    setImgName((name) => (name = img.current!.files![0]!.name))
    setEditUser((user: any) => ({...user, photo: `/media/avatars/${img.current!.files![0]!.name}`}))
    imgEmpty.current?.classList.remove('image-input-empty')
  }

  function removeImg() {
    imgEmpty.current?.classList.add('image-input-empty')
    setEditUser((user: any) => ({...user, photo: ``}))
    setImgName('')
  }

  return (
    <div className='row d-flex align-items-center justify-content-center justify-content-lg-start'>
      <label htmlFor='exampleFormControlInput1' className='col-lg-3 form-label fw-normal fs-6'>
        Фото
      </label>

      <div
        ref={imgEmpty}
        className={(url === '/media/avatars/blank.png') ? 'col-lg-9 h-100px w-100px ms-4 image-input image-input-empty bgi-position-center' : 'col-lg-9 h-100px w-100px ms-4 image-input bgi-position-center p-0'}
        data-kt-image-input='true'
        style={{backgroundImage: url !== '' ? `url(${url})` : `url(/media/avatars/blank.png)`}}
      >
        <div
          className='image-input-wrapper w-100 h-100 bgi-position-center'
          style={{backgroundImage: imgName !== '' ? `url(/media/avatars/${imgName})` : `url(${url})`}}
        >
          <label
            className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            data-bs-dismiss='click'
            title='Change avatar'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              ref={img}
              type='file'
              name='avatar'
              accept='.png, .jpg, .jpeg'
              onChange={choiceImg}
            />
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
            ref={imgRemove}
            className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='remove'
            data-bs-toggle='tooltip'
            data-bs-dismiss='click'
            title='Remove avatar'
            onClick={removeImg}
          >
            <i className='bi bi-x fs-2'></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CandidatePhoto
