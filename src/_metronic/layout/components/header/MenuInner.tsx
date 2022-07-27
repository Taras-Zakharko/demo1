import React from 'react'
import {useIntl} from 'react-intl'
import { toAbsoluteUrl } from '../../../helpers'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <img src={toAbsoluteUrl('/media/logos/Logo.png')} alt='metronic' className='h-34px w-34px me-3'/>
      <h2 className='mb-0 fs-4 fw-boldest '>MyCandidates</h2>
    </>
  )
}
