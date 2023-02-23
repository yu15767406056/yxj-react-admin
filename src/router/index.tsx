import Error from '@/views/error'
import { DiyRouteObject } from '@/types/user'
import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, useMemo, useState } from 'react'
import { store } from '@/redux/store'
import { userRouter } from '@/api/types/user'
import BaseLayout from '@/layout'

const baseRoutesConfig: DiyRouteObject[] = [{ path: '404', element: <Error /> }]
const formatRouter = (router: userRouter[], path = ''): DiyRouteObject[] => {
  const overRouter: DiyRouteObject[] = []
  let setIndex = false
  for (let i = 0; i < router.length; i++) {
    const item = router[i]
    if (!setIndex && item.type !== 2) {
      setIndex = true
      path += item.path === '/' ? item.path : `/${item.path}`
      overRouter.unshift({ index: true, element: <Navigate to={path} /> })
    }
    if (item.type !== 2) {
      const LazyElement = lazy(() => import('@/views/' + item.component))
      overRouter.push({
        path: item.path,
        title: item.title,
        element:
          item.component === 'BaseLayout' ? (
            <BaseLayout />
          ) : item.component ? (
            <LazyElement />
          ) : undefined,
        children: item.childern ? formatRouter(item.childern, path) : [],
      })
    }
  }
  return overRouter
}

const RouterComponent = () => {
  //   const [routes, setRoutes] = useState([
  //     ...baseRoutesConfig,
  //     ...formatRouter(store.getState().user.router),
  //   ])
  //   store.subscribe(() => {
  //     setRoutes([...baseRoutesConfig, ...formatRouter(store.getState().user.router)])
  //     console.log('重新设置了路由', routes)
  //   })
  const routes = useMemo(
    () => [...baseRoutesConfig, ...formatRouter(store.getState().user.router)],
    [store.getState().user.router],
  )
  console.log('我看看名称2')

  return useRoutes(routes)
}

export default RouterComponent
