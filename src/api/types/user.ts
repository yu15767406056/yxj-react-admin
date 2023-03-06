import { RouteObject } from 'react-router-dom'

export type FeatchRouteObject = RouteObject & {
  children?: FeatchRouteObject[]
  mate?: {
    title?: string
    icon?: JSX.Element
    keepAlive?: boolean
  }
}

export type FeatchRouteConfig = {
  hidden?: boolean
  keepAlive?: boolean
  title: string
  icon?: string
  path?: string
  type: 0 | 1 | 2
  component?: string
  childern?: FeatchRouteConfig[]
  id: number
}
