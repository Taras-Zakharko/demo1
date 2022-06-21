import React, { useRef } from 'react'

import CandidateContacts from '../../modules/CandidateContacts';
import CandidateExperience from '../../modules/CandidateExperience';
import CandidateInfoBlock from '../../modules/CandidateInfoBlock';
import CandidateResume from '../../modules/CandidateResume';
import PdfWraper from "../../modules/PdfWraper";

const ImportFromFilePage = () => {
  

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <h2 className='fs-1'>Імпорт файлу Oleksandr_Developer.pdf</h2>
        </div>
        <div className='col-lg-6'>
          <div className='col-lg-12'>
            <div className='card p-10 mt-4 mb-6 flex-row'>
              <CandidateInfoBlock id={Date.now()} setEditUser={''} user={{}}/>
            </div>
            <div className='accordion' id='kt_accordion_1'>
              <CandidateExperience />
              <CandidateContacts />
              <CandidateResume />
            </div>
          </div>
          <div className='col-lg-12 d-flex flex-center mt-7'>
            <button className='btn btn-dark w-250px h-50px'>Зберегти</button>
          </div>
        </div>
        <div className='col-lg-6'>
          <PdfWraper />
        </div>
      </div>
    </>
  )
}

export default ImportFromFilePage
