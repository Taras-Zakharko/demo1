/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../helpers'
import {Search} from '../../../partials/index'
import {useLayout} from '../../core'
import {Header} from './Header'
import {Topbar} from './Topbar'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {/* {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )} */}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {/* {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-2.svg')} className='h-30px' />
            </Link>
          </div>
        )} */}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center'>
            <Link to='/' className='d-lg-none me-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 34 34'
                fill='none'
              >
                <circle cx='15' cy='15' r='15' fill='white' />
                <path
                  d='M34 17C34 26.35 26.35 34 17 34C7.65 34 0 26.35 0 17C0 7.65 7.65 0 17 0C26.35 0 34 7.65 34 17ZM17 8.5C14.11 8.5 11.9 10.71 11.9 13.6C11.9 16.49 14.11 18.7 17 18.7C19.89 18.7 22.1 16.49 22.1 13.6C22.1 10.71 19.89 8.5 17 8.5Z'
                  fill='url(#paint0_radial_811_7347)'
                />
                <path
                  d='M17 34C21.42 34 25.5 32.3 28.39 29.58C27.03 25.33 22.44 22.1 17 22.1C11.56 22.1 6.96999 25.33 5.60999 29.58C8.49999 32.3 12.58 34 17 34Z'
                  fill='#181C32'
                />
                <defs>
                  <radialGradient
                    id='paint0_radial_811_7347'
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
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1 w-sm-100 w-75'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}
          <div className='d-flex w-80 justify-content-between'>
            <div className='d-flex align-items-center w-25 w-sm-75'>
              <Search />
            </div>

            <div className='d-flex align-items-stretch flex-shrink-0 w-sm-25 w-75'>
              <Topbar />
            </div>
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
