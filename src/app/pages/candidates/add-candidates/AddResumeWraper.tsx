import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import candidatesApi from '../../../../API/candidates'

const AddResumeWraper = () => {
  const addFileBtn = useRef<HTMLInputElement | null>(null)
  const addZipBtn = useRef<HTMLInputElement | null>(null)
  const addFileContent = useRef<HTMLDivElement | null>(null)
  const addZipContent = useRef<HTMLDivElement | null>(null)

  const firstZipContent = useRef<HTMLDivElement | null>(null)
  const secondZipContent = useRef<HTMLDivElement | null>(null)
  const thirdZipContent = useRef<HTMLDivElement | null>(null)
  const progresDiv = useRef<HTMLDivElement | null>(null)
  const stopLoad = useRef<HTMLButtonElement | null>(null)

  const [progresValue, setProgresValue] = useState<number>(0)

  const handleAddResumeFile = (file: any, name: string) => {
    candidatesApi.addResumeFileCandidate(file, name).then((response: any) => {
      if (response.data) {
        addFileContent.current?.removeAttribute('data-kt-indicator')
        navigate(`/add/check-data/${response.data.id}`)
      } else {
        let firstNum = response.toString().indexOf('id":') + 4
        let lastNum = response.toString().indexOf(',"first')
        let id = response.toString().slice(firstNum, lastNum)

        addFileContent.current?.removeAttribute('data-kt-indicator')
        navigate(`/add/check-data/${id}`)
      }
    })
  }

  const handleAddResumeZip = (file: any) => {
    candidatesApi.addResumeZipCandidates(file).then((response: any) => {
      let progresRun = setInterval(() => {
        setProgresValue((progresValue) => {
          progresValue = progresValue + 1

          if (progresValue === 100) {
            clearInterval(progresRun)
            secondZipContent.current?.classList.add('d-none')
            thirdZipContent.current?.classList.remove('d-none')
            document.addEventListener('click', function endReadMessege() {
              thirdZipContent.current?.classList.add('d-none')
              firstZipContent.current?.classList.remove('d-none')
              document.removeEventListener('click', endReadMessege)
            })
            addZipBtn.current!.value = ''
            setProgresValue((value) => (value = 0))
          }

          stopLoad.current?.addEventListener('click', function stopEvent() {
            clearInterval(progresRun)
            firstZipContent.current?.classList.remove('d-none')
            secondZipContent.current?.classList.add('d-none')
            addZipBtn.current!.value = ''
            setProgresValue((value) => (value = 0))
            stopLoad.current!.removeEventListener('click', stopEvent)
          })
          return progresValue
        })
      }, 50)
    })
  }

  const navigate = useNavigate()

  const selectFile = (e: any) => {
    addFileContent.current?.setAttribute('data-kt-indicator', 'on')
    const reader = new FileReader()

    reader.onload = (e) => {
      window.localStorage.setItem('importFileName', addFileBtn.current!.files!.item(0)!.name)
      handleAddResumeFile(e!.target!.result, addFileBtn.current!.files!.item(0)!.name)
    }

    reader.readAsDataURL(addFileBtn.current!.files![0])
  }

  const selectZip = () => {
    firstZipContent.current?.classList.add('d-none')
    secondZipContent.current?.classList.remove('d-none')
    const reader = new FileReader()

    reader.onload = () => {
      handleAddResumeZip(reader.result)
    }

    reader.readAsDataURL(addZipBtn.current!.files![0])
  }

  return (
    <div className='row pt-10 h-100'>
      <div className='col-lg-2'></div>
      <div className='col-lg-8 d-flex flex-column flex-center'>
        <h2 className='fs-1 fs-lg-20px fw-boldest text-center'>
          Щоб розпочати, додайте кандидатів у свою базу
        </h2>
        <ul className='nav nav-tabs nav-line-tabs fs-4 flex-center mt-10'>
          <li className='nav-item'>
            <a
              className='nav-link active text-active-primary pb-5 text-gray-600'
              data-bs-toggle='tab'
              href='#kt_tab_pane_1'
            >
              З файлу
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link text-active-primary pb-5 text-gray-600'
              data-bs-toggle='tab'
              href='#kt_tab_pane_2'
            >
              З архіву
            </a>
          </li>
          <li className='nav-item'>
            <Link
              to={'/candidates/user/create'}
              className='nav-link text-active-primary pb-5 text-gray-600'
            >
              Вручну
            </Link>
          </li>
        </ul>
        <div
          className='tab-content card w-md-600px ps-10 pe-10 p-15 ps-lg-15 pe-lg-15 fs-4'
          id='myTabContent'
        >
          <div
            ref={addFileContent}
            className='tab-pane fade active show text-center'
            id='kt_tab_pane_1'
            role='tabpanel'
          >
            <div className='indicator-label ps-5 pe-5 p-lg-0'>
              <p className='fs-16px fs-sm-4 mb-0'>
                Оберіть файл на вашому комп’ютері:
                <br /> Допускаються формати файлів: .doc, .docx, .rtf, .pdf, .odt, .txt
              </p>
              <label htmlFor='file' className='btn btn-sm btn-primary mt-9 fs-16px fs-sm-4'>
                Завантажити резюме
                <input
                  ref={addFileBtn}
                  onChange={selectFile}
                  type='file'
                  name='file'
                  id='file'
                  className='d-none'
                  accept='.doc, .docx, .rtf,
              .pdf, .odt, .txt'
                ></input>
              </label>
            </div>
            <div className='indicator-progress'>
              <div className='sk-fading-circle'>
                <div className='sk-circle1 sk-circle'></div>
                <div className='sk-circle2 sk-circle'></div>
                <div className='sk-circle3 sk-circle'></div>
                <div className='sk-circle4 sk-circle'></div>
                <div className='sk-circle5 sk-circle'></div>
                <div className='sk-circle6 sk-circle'></div>
                <div className='sk-circle7 sk-circle'></div>
                <div className='sk-circle8 sk-circle'></div>
                <div className='sk-circle9 sk-circle'></div>
                <div className='sk-circle10 sk-circle'></div>
                <div className='sk-circle11 sk-circle'></div>
                <div className='sk-circle12 sk-circle'></div>
              </div>
              <p className='fs-16px fs-sm-4'>Обробка резюме</p>
            </div>
          </div>
          <div
            ref={addZipContent}
            className='tab-pane fade text-center'
            id='kt_tab_pane_2'
            role='tabpanel'
          >
            <div ref={firstZipContent} className='indicator-label ps-5 pe-5 p-lg-0'>
              <p className='fs-16px fs-sm-4 mb-0'>
                Ви можете перенести вашу поточну базу кандидатів до MyCandidates. Для цього,
                збережіть всі резюме в одній папці і заархівуйте її (створіть zip-архів). Одержаний
                zip файл завантажте на цій сторінці. Резюме будуть оброблені та додані в вашу базу.
              </p>
              <label htmlFor='zip' className='btn btn-sm btn-primary mt-9 fs-16px fs-sm-4'>
                Завантажити ZIP-архів
                <input
                  ref={addZipBtn}
                  onChange={selectZip}
                  type='file'
                  name='zip'
                  id='zip'
                  className='d-none'
                  accept='.zip, .zipx, .rar'
                ></input>
              </label>
            </div>
            <div ref={secondZipContent} className='d-none'>
              <div className='d-flex justify-content-between align-items-center mb-8'>
                <p className='m-0 p-0 fs-5 fs-sm-6'>Завантаження архіву </p>
                <button ref={stopLoad} className='btn p-0'>
                  <i className='fas fa-stop-circle fs-5 fs-sm-6 text-gray-500'></i>
                  <span className='text-gray-500 fs-5 fs-sm-6 fw-normal'>Cкасувати</span>
                </button>
              </div>
              <div className='progres-wraper position-relative mb-14'>
                <div className='w-100 h-15px bg-light-success rounded-pill'></div>
                <div
                  ref={progresDiv}
                  className='h-15px top-0 start-0 bg-success position-absolute rounded-pill'
                  style={{width: `${progresValue}%`}}
                ></div>
              </div>
              <p className='text-start text-muted mb-0 fs-5 fs-sm-6'>
                Якщо у вас виникли проблеми з перенесенням бази резюме,{' '}
                <br className='d-none d-sm-block' />
                <a href='mailto:#' className='text-primary'>
                  напишіть нам
                </a>
                .
              </p>
            </div>
            <div ref={thirdZipContent} className='d-none ps-5 pe-5 p-lg-0'>
              <i className='fas fa-check-circle text-success mb-20px fs-3x'></i>
              <p className='m-0 fs-16px fs-sm-4 text-justify'>
                Архів успішно завантажено та поставлено в чергу на обробку. Обробка триватиме певний
                час. Ви отримаєте повідомлення на електронну пошту, коли всі резюме з архіву буде
                додано.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-2'></div>
    </div>
  )
}

export default AddResumeWraper
