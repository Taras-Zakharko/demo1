import React, { FC, useState } from 'react'

import CandidateContacts from '../../modules/CandidateContacts';
import CandidateExperience from '../../modules/CandidateExperience';
import CandidateInfoBlock from '../../modules/CandidateInfoBlock';
import CandidateResume from '../../modules/CandidateResume';
import PdfWraper from "../../modules/PdfWraper";
import './AddResumeWraper.scss'


interface IUserObj {
  id: number,
  photo: string,
  firstName: string,
  lastName: string,
  location: {
    country: string,
    city: string
  },
  specialty: string,
  checked: number,
  experience: object[
    
  ],
  skils: string[],
  contacts: {
    phone: string[],
    email: string[],
    messengers: object[],
    socialLinks: object[]
  },
  aboutMyself: {
    text: string,
    file: object[],
    GDPR: number,
    source: string
  }
}

const ImportFromFilePage = () => {
  
  const newUser = {
    id: Date.now(),
    photo: "",
    firstName: "",
    lastName: "",
    location: {
      country: "",
      city: ""
    },
    specialty: "",
    checked: 1,
    experience: [
      {
        company: '',
        position: '',
        yearsExperience: 0
      }
    ],
    skils: [],
    contacts: {
      phone: [],
      email: [],
      messengers: [
        
      ],
      socialLinks: [
        
      ]
    },
    aboutMyself: {
      text: "",
      file: [],
      GDPR: 0,
      source: ""
    }
  }

  const [editUser, setEditUser] = useState<IUserObj>(newUser)

  return (
    <>
      <div className='row pt-10'>
        <div className='col-lg-12'>
          <h2 className='fs-2 fw-boldest'>Імпорт файлу Oleksandr_Developer.pdf</h2>
        </div>
        <div className='col-lg-6 '>
          <div className='col-lg-12'>
            <div className='bg-white p-10 mt-4 flex-row'>
              <CandidateInfoBlock id={Date.now()} setEditUser={setEditUser} user={editUser}/>
            </div>
            <div className='accordion' id='kt_accordion_1'>
              <CandidateExperience setEditUser={setEditUser} user={editUser}/>
              <CandidateContacts setEditUser={setEditUser} user={editUser}/>
              <CandidateResume setEditUser={setEditUser} user={editUser}/>
            </div>
          </div>
          <div className='col-lg-12 bg-white d-flex flex-center p-9'>
            <button className='btn btn-primary h-50px'>Зберегти</button>
          </div>
        </div>
        <div className='col-lg-6 mt-4'>
          <PdfWraper />
        </div>
      </div>
    </>
  )
}

export default ImportFromFilePage
