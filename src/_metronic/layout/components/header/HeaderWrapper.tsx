/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
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
            <Link to='/' className='d-lg-none'>
              <img
                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                alt='metronic'
                className='rounded-circle w-30px h-30px me-3'
              />
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
