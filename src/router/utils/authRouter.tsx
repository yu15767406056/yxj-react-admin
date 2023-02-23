import { useLocation, Navigate } from 'react-router-dom'
import { store } from '@/redux/store'
import { fetchRouter } from '@/redux/reducer/user'

import { userRouter } from '@/api/types/user'
import BaseLayout from '@/layout'
import { DiyRouteObject } from '@/types/user'
import {
  FC,
  lazy,
  useState,
  Children,
  isValidElement,
  Fragment,
  cloneElement,
  ReactElement,
} from 'react'

/**
 * 格式化返回的数据
 * @param router 请求回来的路由
 * @param path path
 * @returns
 */
const formatRouter = (router: userRouter[], path = '', setIndex = false): DiyRouteObject[] => {
  const overRouter: DiyRouteObject[] = []

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
      // console.log(
      //   '我靠?=====>',
      //   setPath,
      //   item.component === 'BaseLayout'
      //     ? '<BaseLayout />'
      //     : item.component
      //     ? ' <LazyElement />'
      //     : item.childern && item.childern.length
      //     ? (setPath + '/' + item.childern[0].path).replace(/(\/+)/, '/')
      //     : undefined,
      // )
      overRouter.push({
        path: item.path,
        title: item.title,
        element:
          item.component === 'BaseLayout' ? (
            <BaseLayout />
          ) : item.component ? (
            <LazyElement />
          ) : undefined,
        children: item.childern ? formatRouter(item.childern, setPath, setIndex) : [],
      })
    }
    if (setPath === '/test') {
      overRouter[0].element = <Navigate to={'/test/test2'} />
      console.log(overRouter, 'wori')
    }
  }

  // item.childern && item.childern.length ? (
  //   <Navigate to={(setPath + '/' + item.childern[0].path).replace(/(\/+)/, '/')} />
  // ) : undefined

  return overRouter
}
/**
 * @description 路由守卫组件
 * */
const AuthRouter: FC<{ children: ReactElement<{ routes?: DiyRouteObject[] }> }> = (props) => {
  // const { pathname } = useLocation()
  const [routes, setRoutes] = useState<DiyRouteObject[]>([])

  if (!store.getState().user.router.length) {
    store.dispatch(fetchRouter()).then(() => {
      console.log('最终的', formatRouter(store.getState().user.router))

      setRoutes(formatRouter(store.getState().user.router))
    })
  }
  //   const route = searchRoute(pathname, rootRouter)
  // * 在跳转路由之前，清除所有的请求
  //   axiosCanceler.removeAllPending()

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  //   if (!route.meta?.requiresAuth) return props.children

  // * 判断是否有Token
  //   const token = store.getState().global.token
  //   if (!token) return <Navigate to='/login' replace />

  // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  // const dynamicRouter = store.getState().auth.authRouter
  // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  //   const staticRouter = [HOME_URL, '/403']
  // const routerList = dynamicRouter.concat(staticRouter)
  // * 如果访问的地址没有在路由表中重定向到403页面
  // if (routerList.indexOf(pathname) == -1) return <Navigate to='/403' />

  // * 当前账号有权限返回 Router，正常访问页面
  return (
    <Fragment>
      {Children.map(props.children, (child) => {
        if (!isValidElement(child)) return null
        const childProps = { ...child.props, routes }
        return cloneElement(props.children, childProps)
      })}
    </Fragment>
  )
}

export default AuthRouter
