import React from 'react'
import {useIntl} from 'react-intl'
import { toAbsoluteUrl } from '../../../helpers'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='metronic' className='rounded-circle w-30px h-30px me-3'/>
      <h2 className='mb-0 fs-4 fw-boldest '>MyCandidates</h2>
    </>
  )
}
