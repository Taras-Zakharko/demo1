/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'

const QuickLinks: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-290px'
    data-kt-menu='true'
  >
    <div className='d-flex flex-column p-9 pb-8 flex-center '>
      <img
        src={toAbsoluteUrl('/media/logos/turbohiringLogo.jpg')}
        alt=''
        className='w-40px h-40px mb-3'
      />
      <a href={'https://app.turbohiring.co/'} className='fs-4 text-gray-800 cursor-pointer mb-2'>TurboHiring Sourcing Tool</a>
      <p className='fs-6 text-gray-500 text-center'>Знаходьте у 3 рази швидше контакти потрібного спеціаліста серед 500 000+ кандидатів</p>
    </div>
  </div>
)

export {QuickLinks}
