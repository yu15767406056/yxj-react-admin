import { RouteObject } from 'react-router-dom'

export type DiyRouteObject = RouteObject & {
  title?: string
  icon?: JSX.Element
  children?: DiyRouteObject[]
}
