/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'

const QuickLinks: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-290px'
    data-kt-menu='true'
  >
    <div className='d-flex flex-column p-9 ps-6 pe-6 pb-8 flex-center '>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        className='mb-3'
      >
        <circle cx='20' cy='20' r='20' fill='url(#paint0_radial_327_3076)' />
        <mask
          id='mask0_327_3076'
          style={{mask:'alpha'}}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='40'
          height='40'
        >
          <circle cx='20' cy='20' r='20' fill='#2E59EC' />
        </mask>
        <g mask='url(#mask0_327_3076)'>
          <path
            d='M36.1171 32.8235L28.9406 25.647C28.1171 26.9412 26.9406 28.1176 25.6465 28.9411L32.8229 36.1176C34.192 37.4866 37.3394 34.0458 36.1171 32.8235Z'
            fill='#181C32'
          />
        </g>
        <path
          d='M20.0003 30.5882C14.118 30.5882 9.41211 25.8824 9.41211 20C9.41211 14.1177 14.118 9.41177 20.0003 9.41177C25.8827 9.41177 30.5886 14.1177 30.5886 20C30.5886 25.8824 25.8827 30.5882 20.0003 30.5882ZM20.0003 11.7647C15.4121 11.7647 11.7651 15.4118 11.7651 20C11.7651 24.5882 15.4121 28.2353 20.0003 28.2353C24.5886 28.2353 28.2356 24.5882 28.2356 20C28.2356 15.4118 24.5886 11.7647 20.0003 11.7647ZM16.4709 20C16.4709 18 18.0003 16.4706 20.0003 16.4706C20.7062 16.4706 21.1768 16 21.1768 15.2941C21.1768 14.5882 20.7062 14.1177 20.0003 14.1177C16.7062 14.1177 14.118 16.7059 14.118 20C14.118 20.7059 14.5886 21.1765 15.2945 21.1765C16.0003 21.1765 16.4709 20.7059 16.4709 20Z'
          fill='white'
        />
        <defs>
          <radialGradient
            id='paint0_radial_327_3076'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(5.29412 34.7059) rotate(-45) scale(40.7626)'
          >
            <stop stop-color='#2E59EC' />
            <stop offset='1' stop-color='#009EF7' />
          </radialGradient>
        </defs>
      </svg>
      <a
        href={'https://app.turbohiring.co/'}
        target='_blank'
        rel='noreferrer'
        className='fs-16px fs-sm-4 text-gray-800 cursor-pointer mb-2'
      >
        TurboHiring Sourcing Tool
      </a>
      <p className='fs-5 fs-sm-6 text-gray-500 mb-0 text-center'>
        Знаходьте у 3 рази швидше контакти потрібного спеціаліста серед 500 000+ кандидатів
      </p>
    </div>
  </div>
)

export {QuickLinks}
