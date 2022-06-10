/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/candidates'
        icon='/media/icons/duotune/communication/com014.svg'
        title='MyCandidates'
        fontIcon='bi-app-indicator'
      />
      
    </>
  )
}
