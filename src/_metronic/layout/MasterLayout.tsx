import {useEffect} from 'react'
import {Outlet,useLocation} from 'react-router-dom'

import {HeaderWrapper} from './components/header/HeaderWrapper'

import {Content} from './components/Content'
import {PageDataProvider} from './core'


import {MenuComponent} from '../assets/ts/components'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])


  return (
    <PageDataProvider>
      {/* <AsideDefault /> */}
      <div className='wrapper d-flex flex-column flex-row-fluid p-0' id='kt_wrapper'>
        <HeaderWrapper />

        <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
          {/* <Toolbar /> */}
          <div className='post d-flex flex-column-fluid pt-6' id='kt_post'>
            <Content>
              <Outlet />
            </Content>
          </div>
        </div>
        {/* <Footer /> */}
      </div>

      {/* begin:: Drawers */}
      {/* <ActivityDrawer /> */}
      {/* <RightToolbar /> */}
      {/* <DrawerMessenger /> */}
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      {/* <Main /> */}
      {/* <InviteUsers /> */}
      {/* <UpgradePlan /> */}
      {/* end:: Modals */}
      {/* <ScrollTop /> */}
    </PageDataProvider>
  )
}

export {MasterLayout}
