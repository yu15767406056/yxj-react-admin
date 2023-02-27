import { Navigate } from 'react-router-dom'
import { store } from '@/redux/store'
import { fetchRouter } from '@/redux/reducer/user'
import { userRouter } from '@/api/types/user'
import BaseLayout from '@/layout'
import { DiyRouteObject } from '@/types/user'
import {
  FC,
  lazy,
  Children,
  isValidElement,
  Fragment,
  cloneElement,
  ReactElement,
  useMemo,
} from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

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
      const route: DiyRouteObject = {
        path: item.path ? setPath : undefined,
        title: item.title,
      }
      if (item.component) {
        if (item.component === 'BaseLayout') route.element = <BaseLayout />
        else route.element = <LazyElement />
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
 * @description 路由守卫组件
 * */
const AuthRouter: FC<{ children: ReactElement<{ routes?: DiyRouteObject[] }> }> = (props) => {
  // const { pathname } = useLocation()

  const dispatch = useAppDispatch()
  const userRouter = useAppSelector((state) => state.user.router)

  if (!store.getState().user.router.length) {
    dispatch(fetchRouter())
  }

  const routes = useMemo(() => {
    return formatRouter(userRouter)
  }, [userRouter])

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
