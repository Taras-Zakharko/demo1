import React from 'react'

const PdfWraper = () => {
  return (
    <embed
      src='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      type='application/pdf'
      className='w-100 h-750px'
    />
  )
}

export default PdfWraper
