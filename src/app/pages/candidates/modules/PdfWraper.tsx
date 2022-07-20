import React, { FC } from 'react'

interface IPdfWraper{
  fileBase?:string
}

const PdfWraper: FC<IPdfWraper> = ({fileBase}) => {
  
  return (
    <embed
      src={(fileBase) ? fileBase: ''}
      type='application/pdf'
      className='w-100 h-750px'
    />
  )
}

export default PdfWraper
