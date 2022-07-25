import React, {FC} from 'react'

interface IPdfWraper {
  fileBase?: string
}

const PdfWraper: FC<IPdfWraper> = ({fileBase}) => {
  return <iframe src={fileBase ? fileBase : ''} className='w-100 h-750px'></iframe>
}

export default PdfWraper
