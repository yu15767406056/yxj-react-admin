import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Menu, Layout } from 'antd'
import { FeatchRouteConfig } from '@/api/types/user'
import IconToElement from '@/components/IconToElement'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'
import { SelectEventHandler, MenuClickEventHandler } from 'rc-menu/lib/interface'

const getPathBySelectedKeys = (
  routeConfig: FeatchRouteConfig[],
  keyList: string[],
  path: string,
): { path: string; title: string } => {
  let childern: FeatchRouteConfig[] = []
  let title = ''
  if (keyList.length) {
    for (let i = 0; i < routeConfig.length; i++) {
      const item = routeConfig[i]
      if (item.id.toString() === keyList.at(-1)) {
        path += `/${item.path}`
        keyList.splice(keyList.length - 1, 1)
        title = item.title
        if (keyList.length && item.childern && item.childern.length) childern = item.childern
        break
      }
    }
  }
  if (childern.length && keyList.length) return getPathBySelectedKeys(childern, keyList, path)
  else return { path: path.replace(/(\/+)/, '/'), title }
}

/** 根据路由处理菜单配置 */
const getItems = (routeConfig: FeatchRouteConfig[]): ItemType[] => {
  const routerItems: ItemType[] = []
  for (let index = 0; index < routeConfig.length; index++) {
    const item = routeConfig[index]
    !item.hidden &&
      routerItems.push({
        label: item.title,
        icon: <IconToElement iconName={item.icon}></IconToElement>,
        key: item.id.toString(),
        children: item.childern ? getItems(item.childern) : undefined,
      })
  }
  return routerItems
}

/** 回显菜单选中 */
const getAllRouteCacheToSelected = (
  routeConfig: FeatchRouteConfig[],
  pathList: string[],
  keys: string[] = [],
): string[] => {
  let childern: FeatchRouteConfig[] = []
  if (pathList.length) {
    for (let i = 0; i < routeConfig.length; i++) {
      const item = routeConfig[i]
      if (item.path === (pathList[0] || '/')) {
        keys.push(item.id.toString())
        pathList.splice(0, 1)
        if (pathList.length && item.childern && item.childern.length) childern = item.childern
        break
      }
    }
  }

  if (childern.length && pathList.length)
    return getAllRouteCacheToSelected(childern, pathList, keys)
  else return keys
}
const LayoutMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const location = useLocation()
  const routeConfig = useAppSelector((state) => state.routers.router)
  const navigate = useNavigate()

  const items = useMemo<ItemType[]>(() => {
    console.log(getItems(routeConfig))

    return getItems(routeConfig)
  }, [routeConfig])

  useEffect(() => {
    const keys = getAllRouteCacheToSelected(routeConfig, location.pathname.split('/'), [])
    setSelectedKeys(keys)
    setOpenKeys(Array.from(new Set([...openKeys, ...keys])))
  }, [location])

  const onMenuItemSelect = useCallback<SelectEventHandler>(
    (selectData) => {
      setSelectedKeys([...selectData.selectedKeys])
      navigate({
        pathname: getPathBySelectedKeys(routeConfig, [...selectData.keyPath] as string[], '').path,
      })
    },
    [navigate, routeConfig],
  )
  const onMenuItemClick = useCallback<MenuClickEventHandler>((data) => {
    console.log('item点击', data)
  }, [])

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value: boolean) => setCollapsed(value)}
    >
      <div className='logo' />
      <Menu
        theme='dark'
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode='inline'
        items={items}
        onSelect={onMenuItemSelect}
        onOpenChange={setOpenKeys}
        onClick={onMenuItemClick}
      />
    </Layout.Sider>
  )
}

export default LayoutMenu
