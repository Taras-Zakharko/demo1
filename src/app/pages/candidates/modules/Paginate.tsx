import React, {FC} from 'react'

interface IPaginate {
  setCurrentPage: any
  currentPage: number
  lastPage: number
}

const Paginate: FC<IPaginate> = ({setCurrentPage, currentPage, lastPage}) => {
  const paginate = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  let pageNumbers: any = Array.from({length: lastPage}, (v, k) => k + 1)

  return (
    <ul className='pagination'>
      {currentPage === 1 ? (
        <li className='page-item previous disabled w-37px h-36px'>
          <a className='page-link h-100' onClick={() => setCurrentPage(currentPage - 1)}>
            <i className='previous'></i>
          </a>
        </li>
      ) : (
        <li className='page-item previous cursor-pointer w-37px h-36px'>
          <a className='page-link h-100' onClick={() => setCurrentPage(currentPage - 1)}>
            <i className='previous'></i>
          </a>
        </li>
      )}
      {pageNumbers.map((num: number) => {
        return currentPage === num ? (
          <li key={num} className='page-item cursor-pointer active w-37px h-36px'>
            <a className='page-link h-100 text-hover-inverse-primary' onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ) : currentPage === 1 && num < 4 ? (
          <li key={num} className='page-item cursor-pointer w-37px h-36px'>
            <a className='page-link h-100' onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ) : currentPage === pageNumbers[pageNumbers.length - 1] &&
          num > pageNumbers[pageNumbers.length - 4] ? (
          <li key={num} className='page-item cursor-pointer w-37px h-36px'>
            <a className='page-link h-100' onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ) : currentPage - num === 1 || num - currentPage === 1 ? (
          <li key={num} className='page-item cursor-pointer w-37px h-36px'>
            <a className='page-link h-100' onClick={() => paginate(num)}>
              {num}
            </a>
          </li>
        ) : null
      })}
      {currentPage === lastPage ? (
        <li className='page-item next disabled w-37px h-36px'>
          <a className='page-link h-100' onClick={() => setCurrentPage(currentPage + 1)}>
            <i className='next'></i>
          </a>
        </li>
      ) : (
        <li className='page-item next cursor-pointer w-37px h-36px'>
          <a className='page-link h-100' onClick={() => setCurrentPage(currentPage + 1)}>
            <i className='next'></i>
          </a>
        </li>
      )}
    </ul>
  )
}

export default Paginate
