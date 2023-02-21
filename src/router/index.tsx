import Error from '@src/views/error'
import { DiyRouteObject } from '@src/types/user'

const routesConfig: DiyRouteObject[] = [{ path: '404', element: <Error /> }]

export default routesConfig
