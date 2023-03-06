import { Breadcrumb, Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
import LayoutMenu from './Menu'

const { Header, Content, Footer } = Layout

function BaseLayout() {
  return (
    <Layout className='base-layout' style={{ minHeight: '100vh' }}>
      <LayoutMenu></LayoutMenu>
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
