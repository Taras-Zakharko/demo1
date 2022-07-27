import React, {useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import candidatesApi from '../../../../../API/candidates'

import CandidateContacts from '../../modules/CandidateContacts'
import CandidateExperience from '../../modules/CandidateExperience'
import CandidateInfoBlock from '../../modules/CandidateInfoBlock'
import CandidateResume from '../../modules/CandidateResume'
import PdfWraper from '../../modules/PdfWraper'
import './AddResumeWraper.scss'

const ImportFromFilePage = () => {
  let idUser = +window.location.pathname.slice(
    window.location.pathname.lastIndexOf('/check-data/') + 12
  )
  const [editUser, setEditUser] = useState<any>({})
  const navigate = useNavigate()

  const handleGetOneCandidate = (id: number) => {
    candidatesApi.getSomeCandidate(id).then((response) => {
      setEditUser(response.data)
    })
  }

  const handleEditOneCandidate = (user: any) => {
    candidatesApi.editCandidate(user).then(() => {
      navigate('/candidates')
    })
  }

  useEffect(() => {
    handleGetOneCandidate(idUser)
  }, [])

  let fileName = localStorage.getItem('importFileName') 
  
  console.log(editUser);
  

  return (
    <>
      <div className='row pt-10'>
        <div className='col-lg-12'>
          <h2 className='fs-2 fw-boldest'>Імпорт файлу {(editUser.files)&&editUser.files[0].name}</h2>
        </div>
        <div className='col-lg-6 '>
          <div className='col-lg-12'>
            <div className='bg-white p-10 pb-1 mt-4 flex-row'>
              <CandidateInfoBlock
                id={Date.now()}
                setEditUser={setEditUser}
                user={editUser}
                labelW={4}
                inputW={8}
              />
            </div>
            <div className='accordion' id='kt_accordion_1'>
              <CandidateExperience
                setEditUser={setEditUser}
                user={editUser}
                labelW={4}
                inputW={8}
              />
              <CandidateContacts setEditUser={setEditUser} user={editUser} labelW={4} inputW={8} />
              <CandidateResume setEditUser={setEditUser} user={editUser} labelW={4} inputW={8} />
            </div>
          </div>
          <div className='col-lg-12 bg-white d-flex flex-center p-9'>
            <button
              className='btn btn-primary h-50px'
              onClick={() => handleEditOneCandidate({...editUser, checked: 1})}
            >
              Зберегти
            </button>
          </div>
        </div>
        <div className='col-lg-6 mt-4'>
          <PdfWraper fileBase={(editUser.files)&&editUser.files[0].base64}/>          
        </div>
      </div>
    </>
  )
}

export default ImportFromFilePage
