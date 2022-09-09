import React, {FC} from 'react'



interface IPdfWraper {
  fileBase?: string
}

const PdfWraper:FC<IPdfWraper> = ({fileBase}) => {
 

  
  
  // return <object data={`${fileBase}`} type="application/pdf" width="100%" height="1000px" />
  return <iframe title='pdf' src={fileBase ? fileBase : ''} className='w-100 h-750px'></iframe>
  // return <embed title='pdf' src={fileBase ? fileBase : ''} className='w-100 h-750px'></embed>
  
  
}

export default PdfWraper
