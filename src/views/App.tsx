import './App.css'
// import Layout from "../layout";
// import BaseLayout from "../layout";
import { BrowserRouter, useRoutes, Routes } from 'react-router-dom'
import { useMemo } from 'react'
import { store } from '@src/redux/store'
import { fetchRouter } from '@src/redux/reducer/user'
import routesConfig from '@src/router'
import { DiyRouteObject } from '@src/types/user'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import BaseLayout from '@src/layout'
import { userRouter } from '@src/api/types/user'
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
      const LazyElement = lazy(() => import('@src/views/' + item.component))
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

const App = () => {
  const routes = useMemo<DiyRouteObject[]>(() => {
    const routerComponentList: DiyRouteObject[] = [...routesConfig]
    if (!store.getState().user.router.length) {
      store.dispatch(fetchRouter()).finally(() => {
        routerComponentList.push(...formatRouter(store.getState().user.router))
      })
    } else {
      routerComponentList.push(...formatRouter(store.getState().user.router))
    }

    console.log('所有异步执行完', routerComponentList)
    return routerComponentList
  }, [store.getState().user.router])
  const Element = () => useRoutes(routes)
  return (
    <BrowserRouter>
      <Element></Element>
    </BrowserRouter>
  )
}

export default App
