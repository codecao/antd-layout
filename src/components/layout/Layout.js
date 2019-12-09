import React, { useState, Component } from 'react'
import { withRouter, Route, Link, Switch } from 'react-router-dom'
import { routes } from '../../routes/routesConfig' 
import Header from '../header/Header'
import logo from '@/assets/ym_logo.png'
import { Layout, Menu, Icon, Breadcrumb, PageHeader } from 'antd'

const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
let openKeysArray = [];
let selKey = [];
// 面包屑配置格式化
function formaterBreadCrumb(breadcrumbRouters, route) {
  if (route instanceof Array) {
    breadcrumbRouters.push(route[0]);
  } else {
    breadcrumbRouters.push(route);
  }
  route.children && route.children.map(children => {
    children.breadcrumbName = children.name
    breadcrumbRouters.push(children);
    if (children.children) {
      formaterBreadCrumb(breadcrumbRouters, children.children)
    }
  })

}


// 面包屑配置[]
function breadcrumb() {
  const breadcrumbRouters = []
  routes.forEach((route, params, routes) => {
    route.breadcrumbName = route.name
    // 首页面包屑
    if (routes.indexOf(route) === 0) return (
      breadcrumbRouters[0] = route
    )
    const pathArr = location.pathname.split('/') || []
    if (route.path == '/' + pathArr[1]) {
      formaterBreadCrumb(breadcrumbRouters, route);
    }

  })

  openKeysArray = [];
  if(breadcrumbRouters.length>0){
    breadcrumbRouters.forEach((item, index) => {
      if (index != 0 && index != (breadcrumbRouters.length - 1)) {
        openKeysArray.push(item.name);
      } else if (index == (breadcrumbRouters.length - 1)) {
        selKey.push(item.name);
      }
    });
  }

  return breadcrumbRouters
}

//加载菜单
function loadMenuList(item) {
  let childArray = item.children;
  if (childArray instanceof Array && childArray.length > 0) {
    let contentHtml = item.children.map((subItem, subItemIdx) => {
      return loadMenuList(subItem);
    }
    );
    return (
      <SubMenu key={item.name}
        title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
        {contentHtml}
      </SubMenu>
    )
  } else {
    return (
      <Menu.Item key={item.name}>
        <Link to={item.path}>
          <Icon type={item.icon} /><span>{item.name}</span>
        </Link>
      </Menu.Item>
    )
  }
}

//加载路由
function loadRouter(route) {

  if (route['children']) {
    let routeVal = route['children'].map((children, childrenIdx) => {
      return loadRouter(children);
    })
    return (routeVal)
  }

  if (!route['children']) {
    return (<Route key={route.name} path={route.path} component={route.component} />)
  }
}




export default class ProLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      path: "",
      collapsed: false,
      openKeys: [],
      breadcrumbRouters: breadcrumb()
    };
    this.setCurrent = this.setCurrent.bind(this);
    this.setCollapsed = this.setCollapsed.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  setCurrent(e) {
    this.setState({
      key: e.key,
      breadcrumbRouters: breadcrumb(),
      path: this.state.breadcrumbRouters[this.state.breadcrumbRouters.length - 1].path
    });
  }
  setCollapsed(collapsedParam) {
    this.setState({
      collapsed: collapsedParam
    })
  }


  componentDidMount() {
    // 获取当前路径
    const pathname = this.props.location.pathname

    this.setState({
      key: selKey,
      openKeys: openKeysArray
    }, () => {

    })
  }

  openMenu(e) {
    this.setState({
      openKeys: e
    })
  }

  render() {
    const defaultProps = this.state.collapsed ? null :  this.state.openKeys;
    return (
      <Layout style={{ height: '100%' }}>
        {/* 菜单栏 */}
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="white p2 flex a-center" >
            <img className={[this.state.collapsed && 'centered']} src={logo} width='40px' />
            {!this.state.collapsed && <div className='px2 f4'>testProject</div>}
          </div>
          <Menu
            theme="dark"
            onClick={(e) => {
              this.setCurrent(e)
            }}
            mode={this.state.collapsed ? 'vertical' : 'inline'}
            selectedKeys={
              this.state.key
            }
            openKeys={
              this.state.openKeys
            }
            onOpenChange={this.openMenu}
          >
            {
              routes.map((item, menuIdx) => {
                return loadMenuList(item);
              })
            }
          </Menu>
        </Sider>

        <Layout>
          {/* 右边头部组件 */}
          <Header handleCollapsed={() => this.setCollapsed(!this.state.collapsed)} />
          {/* 带页头的面包屑 */}
          {
        
            <Breadcrumb className='bg-white f4 px4 pt3'>
              <Breadcrumb.Item href={this.state.breadcrumbRouters.length>0?this.state.breadcrumbRouters[0].path:""}>
                <Icon type="home" />
                <span>{this.state.breadcrumbRouters.length>0?this.state.breadcrumbRouters[0].name:""}</span>
              </Breadcrumb.Item>

              {this.state.breadcrumbRouters.map((breadcrumb, breadcrumbIdx) => {
                if (breadcrumbIdx !== 0) {
                  return (
                    <Breadcrumb.Item key={breadcrumbIdx}  >
                      <span>{breadcrumb.name}</span>
                    </Breadcrumb.Item>
                  )
                }
              })}
            </Breadcrumb>

          }

          {/* <PageHeader title={this.state.key} /> */}

          {/* 主体内容 */}
          <Content className='m3'>
            <Switch>
              {
                routes.map((route, routeIdx) => {
                  return loadRouter(route);
                })
              }
            </Switch>
          </Content>
          {/* <Footer>

          </Footer> */}
        </Layout>
      </Layout>
    )
  }


}

// export default withRouter(ProLayout)