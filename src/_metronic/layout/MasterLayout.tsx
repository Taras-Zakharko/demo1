import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
// import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
// import {Toolbar} from './components/toolbar/Toolbar'
// import {RightToolbar} from '../partials/layout/RightToolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider} from './core'
import {useLocation} from 'react-router-dom'
import { Main, InviteUsers, UpgradePlan} from '../partials'
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

  // const dispatch = useDispatch();
  // const url = 'https://turbohiring.dotcode.pp.ua/api/candidates'

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then(function (response) {
  //       // handle success
  //       dispatch(setUsers(response.data.data))
  //       console.log(response.data.data)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error)
  //     })
  //     .then(function () {
  //       // always executed
  //     })
  // }, [dispatch])

  return (
    <PageDataProvider>
      {/* <AsideDefault /> */}
      <div className='wrapper d-flex flex-column flex-row-fluid pt-10 ps-0' id='kt_wrapper'>
        <HeaderWrapper />

        <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
          {/* <Toolbar /> */}
          <div className='post d-flex flex-column-fluid' id='kt_post'>
            <Content>
              <Outlet />
            </Content>
          </div>
        </div>
        <Footer />
      </div>

      {/* begin:: Drawers */}
      {/* <ActivityDrawer /> */}
      {/* <RightToolbar /> */}
      {/* <DrawerMessenger /> */}
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
