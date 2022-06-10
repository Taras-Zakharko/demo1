/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
// import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {TablesWidget10} from '../../../_metronic/partials/widgets'

const CandidatesPage: FC = () => <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />

const CandidatesWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>MyCandidates</PageTitle>
      <CandidatesPage />
    </>
  )
}

export {CandidatesWrapper}
