import { userRouter } from '@/api/types/user'
import IconToElement from '@/components/IconToElement'
import { useAppSelector } from '@/hooks/redux'
import { Breadcrumb, Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useState, Suspense, useMemo, useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './index.scss'

const { Header, Content, Footer, Sider } = Layout

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
const getSelectedKeys = (routeConfig: userRouter[], pathList: string[], keys: string[] = []) => {
  if (pathList.length) {
    for (let i = 0; i < routeConfig.length; i++) {
      const item = routeConfig[i]
      if (item.path === pathList[0] || '/') {
        keys.push(item.id.toString())
        pathList.splice(0, 1)
        pathList.length &&
          item.childern &&
          item.childern.length &&
          getSelectedKeys(item.childern, pathList, keys)
        break
      }
    }
  }

  return keys
}

function BaseLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const routeConfig = useAppSelector((state) => state.user.router)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()
  const items = useMemo<ItemType[]>(() => {
    return getItems(routeConfig)
  }, [routeConfig])
  useEffect(() => {
    setSelectedKeys(getSelectedKeys(routeConfig, location.pathname.split('/'), []))
  }, [location])

  const onMenuItemSelect = useCallback((selectData: any) => {
    setSelectedKeys(selectData.selectedKeys)
    console.log(selectData)
  }, [])
  return (
    <Layout className='base-layout' style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='logo' />
        <Menu
          theme='dark'
          selectedKeys={selectedKeys}
          mode='inline'
          items={items}
          onSelect={onMenuItemSelect}
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
