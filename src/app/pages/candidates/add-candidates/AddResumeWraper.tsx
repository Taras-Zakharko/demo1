import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'

const AddResumeWraper = () => {
  const addFileBtn = useRef<HTMLInputElement | null>(null);
  const addZipBtn = useRef<HTMLInputElement | null>(null);
  const addFileContent = useRef<HTMLDivElement | null>(null);
  const addZipContent = useRef<HTMLDivElement | null>(null);

  const firstZipContent = useRef<HTMLDivElement | null>(null);
  const secondZipContent = useRef<HTMLDivElement | null>(null);
  const thirdZipContent = useRef<HTMLDivElement | null>(null);
  const progresDiv = useRef<HTMLDivElement | null>(null);
  const stopLoad = useRef<HTMLButtonElement | null>(null);

  const [rogresValue, setProgresValue] = useState<number>(0);

  const selectFile = () => {
    addFileContent.current?.setAttribute('data-kt-indicator', 'on');
    setTimeout(() => {
      addFileContent.current?.removeAttribute('data-kt-indicator');
      document.location.href = '/add/check-data';
    }, 4000);
  }

  const selectZip = () => {
    firstZipContent.current?.classList.add('d-none');
    secondZipContent.current?.classList.remove('d-none');

    let progresRun = setInterval(() => {
      setProgresValue((rogresValue) => {
        rogresValue = rogresValue + 1;

        if (rogresValue === 100) {
          clearInterval(progresRun);
          secondZipContent.current?.classList.add('d-none');
          thirdZipContent.current?.classList.remove('d-none');
          setTimeout(() => {
            thirdZipContent.current?.classList.add('d-none');
            firstZipContent.current?.classList.remove('d-none');
            addZipBtn.current!.value = '';
            setProgresValue((value) => (value = 0));
          }, 4000);
        }

        stopLoad.current?.addEventListener('click', () => {
          clearInterval(progresRun);
          firstZipContent.current?.classList.remove('d-none');
          secondZipContent.current?.classList.add('d-none');
          addZipBtn.current!.value = '';
          setProgresValue((value) => (value = 0));
        })
        return rogresValue;
      })
    }, 100);
  }

  return (
    <div className='row'>
      <div className='col-lg-2'></div>
      <div className='col-lg-8 d-flex flex-column flex-center'>
        <h2 className='fs-1 text-center'>Щоб розпочати, додайте кандидатів у свою базу</h2>
        <ul className='nav nav-tabs nav-line-tabs mb-5 fs-5 flex-center mt-10'>
          <li className='nav-item'>
            <a
              className='nav-link active text-uppercase text-active-dark text-primary'
              data-bs-toggle='tab'
              href='#kt_tab_pane_1'
            >
              З файлу
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link text-uppercase text-active-dark text-primary'
              data-bs-toggle='tab'
              href='#kt_tab_pane_2'
            >
              з архіву
            </a>
          </li>
          <li className='nav-item'>
            <Link
              to={'/candidates/user/create'}
              className='nav-link text-uppercase text-active-dark text-primary'
            >
              вручну
            </Link>
          </li>
        </ul>
        <div className='tab-content card w-550px p-10 fs-4' id='myTabContent'>
          <div
            ref={addFileContent}
            className='tab-pane fade active show text-center'
            id='kt_tab_pane_1'
            role='tabpanel'
          >
            <div className='indicator-label'>
              <p>
                Оберіть файл на вашому комп’ютері:
                <br /> Допускаються формати файлів: .doc, .docx, .rtf, .pdf, .odt, .txt
              </p>
              <label htmlFor='file' className='btn btn-sm btn-dark m-4 fs-4'>
                <KTSVG path='/media/icons/duotune/abstract/abs053.svg' className='svg-icon-3' />
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
              <span className='spinner-border spinner-border-sm align-middle ms-2 mb-4 w-50px h-50px'></span>
              <p className='fs-1'>Обробка резюме</p>
            </div>
          </div>
          <div
            ref={addZipContent}
            className='tab-pane fade text-center'
            id='kt_tab_pane_2'
            role='tabpanel'
          >
            <div ref={firstZipContent} className='indicator-label'>
              <p>
                Ви можете перенести вашу поточну базу кандидатів до MyCandidates. Для цього,
                збережіть всі резюме в одній папці і заархівуйте її (створіть zip-архів). Одержаний
                zip файл завантажте на цій сторінці. Резюме будуть оброблені та додані в вашу базу.
              </p>
              <label htmlFor='zip' className='btn btn-sm btn-dark m-4 fs-4'>
                <KTSVG path='/media/icons/duotune/abstract/abs053.svg' className='svg-icon-3' />
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
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <p className='m-0 p-3'>Завантаження архіву </p>
                <button ref={stopLoad} className='btn'>
                  <KTSVG path='/media/icons/duotune/general/gen034.svg' className='svg-icon-3' />
                  <span className='text-uppercase'>скасувати</span>
                </button>
              </div>
              <div className='progres-wraper position-relative mb-15'>
                <div className='w-100 h-15px bg-secondary'></div>
                <div
                  ref={progresDiv}
                  className='h-15px top-0 start-0 bg-primary position-absolute'
                  style={{width: `${rogresValue}%`}}
                ></div>
              </div>
              <p className='text-start mb-10'>
                Якщо у вас виникли проблеми з перенесенням бази резюме,{' '}
                <a href='mailto:#'>напишіть нам</a>.
              </p>
            </div>
            <div ref={thirdZipContent} className='d-none'>
              <svg
                width='100'
                height='100'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  opacity='0.7'
                  d='M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z'
                  fill='green'
                />
                <path
                  d='M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z'
                  fill='green'
                />
              </svg>
              <p className='mt-4'>
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
