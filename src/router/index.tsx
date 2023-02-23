import Error from '@/views/error'
import { DiyRouteObject } from '@/types/user'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

const baseRoutesConfig: DiyRouteObject[] = [{ path: '404', element: <Error /> }]

const RouterComponent: FC<{ routes?: DiyRouteObject[] }> = (props) => {
  const { routes = [] } = props
  return useRoutes([...routes, ...baseRoutesConfig])
}

export default RouterComponent
