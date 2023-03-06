import Error from '@/views/error'
import { FeatchRouteObject } from '@/api/types/user'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'

const baseRoutesConfig: FeatchRouteObject[] = [
  { path: '/404', element: <Error /> },
  // { path: '*', element: <Navigate to='/404'></Navigate> },
]

const RouterComponent: FC<{ routes?: FeatchRouteObject[] }> = (props) => {
  const { routes = [] } = props
  console.log('劲来了', routes)

  return useRoutes([...baseRoutesConfig, ...routes])
}

export default RouterComponent
