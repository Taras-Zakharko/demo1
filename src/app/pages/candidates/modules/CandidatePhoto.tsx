import {FC, useRef, useState} from 'react'

interface ICandidatePhoto {
  url?: any
}

const CandidatePhoto: FC<ICandidatePhoto> = ({url}) => {
  const [imgName, setImgName] = useState<string>('')

  const img = useRef<HTMLInputElement | null>(null)
  const imgRemove = useRef<HTMLInputElement | null>(null)
  const imgEmpty = useRef<HTMLDivElement | null>(null)

  function choiceImg(){
    setImgName(name => name = img.current!.files![0]!.name)
    imgEmpty.current?.classList.remove('image-input-empty')
  }

  function removeImg() {
    imgEmpty.current?.classList.add('image-input-empty');
    setImgName('')
  }
  return (
    <div 
      ref={imgEmpty}
      className='col-lg-4 image-input image-input-empty'
      data-kt-image-input='true'
      style={{backgroundImage: (url) ? `url(${url})` : `url(../../media/avatars/blank.png)`}}
    >
      <div
        className='image-input-wrapper w-100 h-100'
        style={{backgroundImage: (imgName!=='') ? `url(../../media/avatars/${imgName})` : `url(../../media/avatars/blank.png)`}}
      >
        <label
          className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='change'
          data-bs-toggle='tooltip'
          data-bs-dismiss='click'
          title='Change avatar'
        >
          <i className='bi bi-pencil-fill fs-7'></i>
          <input ref={img} type='file' name='avatar' accept='.png, .jpg, .jpeg' onChange={choiceImg}/>
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
  )
}

export default CandidatePhoto
