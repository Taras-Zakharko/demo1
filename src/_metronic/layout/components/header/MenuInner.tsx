import React from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../helpers'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      {/* <img src={toAbsoluteUrl('/media/logos/Logo.png')} alt='metronic' className='h-34px w-34px me-3'/> */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='34'
        height='34'
        viewBox='0 0 34 34'
        fill='none'
        className='me-3'
      >
        <circle cx='15' cy='15' r='15' fill='white' />
        <path
          d='M34 17C34 26.35 26.35 34 17 34C7.65 34 0 26.35 0 17C0 7.65 7.65 0 17 0C26.35 0 34 7.65 34 17ZM17 8.5C14.11 8.5 11.9 10.71 11.9 13.6C11.9 16.49 14.11 18.7 17 18.7C19.89 18.7 22.1 16.49 22.1 13.6C22.1 10.71 19.89 8.5 17 8.5Z'
          fill='url(#paint1_radial_811_7347)'
        />
        <path
          d='M17 34C21.42 34 25.5 32.3 28.39 29.58C27.03 25.33 22.44 22.1 17 22.1C11.56 22.1 6.96999 25.33 5.60999 29.58C8.49999 32.3 12.58 34 17 34Z'
          fill='#181C32'
        />
        <defs>
          <radialGradient
            id='paint1_radial_811_7347'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(4.5 29.5) rotate(-45) scale(34.6482)'
          >
            <stop stop-color='#2E59EC' />
            <stop offset='1' stop-color='#009EF7' />
          </radialGradient>
        </defs>
      </svg>
      <h2 className='mb-0 fs-4 fw-boldest '>MyCandidates</h2>
    </>
  )
}
