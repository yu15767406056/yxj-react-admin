import { Navigate } from 'react-router-dom'
import { store } from '@/redux'
import { fetchRouter } from '@/redux/modules/routers'
import { FeatchRouteConfig } from '@/api/types/user'
import BaseLayout from '@/layout'
import { FeatchRouteObject } from '@/api/types/user'
import KeepAlive from 'react-activation'
import { FC, lazy, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

/**
 * 格式化返回的数据
 * @param router 请求回来的路由
 * @param path path
 * @returns
 */
const formatRouter = (
  router: FeatchRouteConfig[],
  path = '',
  setIndex = false,
): FeatchRouteObject[] => {
  const overRouter: FeatchRouteObject[] = []

  for (let i = 0; i < router.length; i++) {
    const item = router[i]
    const setPath = (path + `/${item.path}`).replace(/(\/+)/, '/')

    if (item.type !== 2) {
      if (!setIndex) {
        setIndex = true
        overRouter.unshift({
          index: true,
          element: (
            <Navigate
              to={(
                setPath +
                '/' +
                (item.childern && item.childern?.length ? item.childern[0].path : '')
              ).replace(/(\/+)/, '/')}
            />
          ),
        })
      }

      const LazyElement = lazy(() => import('@/views/' + item.component))
      const route: FeatchRouteObject = {
        path: item.path ? setPath : undefined,
        mate: { title: item.title, keepAlive: item.keepAlive },
      }
      if (item.component) {
        if (item.component === 'BaseLayout') route.element = <BaseLayout />
        else
          route.element = route.mate?.keepAlive ? (
            <KeepAlive>
              <LazyElement />
            </KeepAlive>
          ) : (
            <LazyElement />
          )
      }
      if (!route.element) {
        const routeChildren = item.childern ? formatRouter(item.childern, setPath, setIndex) : []
        route.element = routeChildren.length ? (
          <Navigate to={routeChildren[0].path || '/404'}></Navigate>
        ) : (
          <Navigate to={'/404'}></Navigate>
        )
        route.children = []
        overRouter.push(route, ...routeChildren)
      } else {
        route.children = item.childern ? formatRouter(item.childern, setPath, setIndex) : []
        overRouter.push(route)
      }
    }
  }

  return overRouter
}

/**
 * @description 路由守卫高阶组件
 * */
const authRouter = (RouterComponent: FC<{ routes?: FeatchRouteObject[] }>): FC => {
  return () => {
    console.log('执行拦截')

    const dispatch = useAppDispatch()
    const userRouter = useAppSelector((state) => state.routers.router)

    if (!store.getState().routers.router.length) {
      dispatch(fetchRouter())
    }

    const routes = useMemo(() => {
      return formatRouter(userRouter)
    }, [userRouter])

    return <RouterComponent routes={routes} />
  }
}

export default authRouter
