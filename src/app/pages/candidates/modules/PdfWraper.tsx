import React, {FC} from 'react'

interface IPdfWraper {
  fileBase?: string
}

const PdfWraper: FC<IPdfWraper> = ({fileBase}) => {
  return <iframe title='pdf' src={fileBase ? fileBase : ''} className='w-100 h-750px'></iframe>
}

export default PdfWraper
