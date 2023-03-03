import { userRouter } from '@/api/types/user'
import IconToElement from '@/components/IconToElement'
import { useAppSelector } from '@/hooks/redux'
import { Breadcrumb, Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { SelectEventHandler } from 'rc-menu/lib/interface'
import { useState, Suspense, useMemo, useCallback, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'

const { Header, Content, Footer, Sider } = Layout
// type MenuCache = {
//   selectedKeys: string[]
//   pathList: string[]
//   labelList: string[]
// }

/** 根据路由处理菜单配置 */
const getItems = (routeConfig: userRouter[]): ItemType[] => {
  const routerItems: ItemType[] = []
  for (let index = 0; index < routeConfig.length; index++) {
    const item = routeConfig[index]
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
  routeConfig: userRouter[],
  pathList: string[],
  keys: string[] = [],
): string[] => {
  let childern: userRouter[] = []
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

const getPathBySelectedKeys = (
  routeConfig: userRouter[],
  keyList: string[],
  path: string,
): string => {
  let childern: userRouter[] = []
  if (keyList.length) {
    for (let i = 0; i < routeConfig.length; i++) {
      const item = routeConfig[i]
      if (item.id.toString() === keyList.at(-1)) {
        path += `/${item.path}`
        keyList.splice(keyList.length - 1, 1)
        if (keyList.length && item.childern && item.childern.length) childern = item.childern
        break
      }
    }
  }
  if (childern.length && keyList.length) return getPathBySelectedKeys(childern, keyList, path)
  else return path.replace(/(\/+)/, '/')
}
function BaseLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const location = useLocation()
  const routeConfig = useAppSelector((state) => state.user.router)

  const items = useMemo<ItemType[]>(() => {
    return getItems(routeConfig)
  }, [routeConfig])
  useEffect(() => {
    const keys = getAllRouteCacheToSelected(routeConfig, location.pathname.split('/'), [])
    setSelectedKeys(keys)
    setOpenKeys(Array.from(new Set([...openKeys, ...keys])))
  }, [location])

  const navigate = useNavigate()
  const onMenuItemSelect = useCallback<SelectEventHandler>(
    (selectData) => {
      setSelectedKeys([...selectData.selectedKeys])
      navigate({
        pathname: getPathBySelectedKeys(routeConfig, [...selectData.keyPath] as string[], ''),
      })
    },
    [navigate, routeConfig],
  )
  return (
    <Layout className='base-layout' style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='logo' />
        <Menu
          theme='dark'
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode='inline'
          items={items}
          onSelect={onMenuItemSelect}
          onOpenChange={(data) => setOpenKeys(data)}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Suspense fallback={<div>加载中......</div>}>
            <Outlet />
          </Suspense>
          {/*<BrowserRouter></BrowserRouter>*/}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
