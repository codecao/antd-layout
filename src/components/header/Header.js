import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './header.module.css'
import { Route, Redirect } from 'react-router-dom'
const menu = (
  <Menu>
    <Menu.Item key="1">
      {/* <Link to="/home/setting">
        <Icon type="setting" />&nbsp;偏好设置
      </Link> */}
      <span>偏好设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      {/* <Link to="/login">
      </Link> */}
      <Icon type="poweroff" />
      <span
        onClick={() => {
          handleLogOutClick()
        }}
      > 退出登录</span>
    </Menu.Item>
  </Menu>
);

function handleLogOutClick() {
  sessionStorage.removeItem("userName");
  window.location.reload(); 
  // <Redirect to="/login" />
}

const Header = (props) => {
  return (
    <div className='header-wrapper'>
      <span
        className='header-collapsed'
        onClick={() => props.handleCollapsed()}
      >
        <Icon type={'menu-fold'} />
      </span>
      <div className='header-user-info'>
        <Dropdown overlay={menu} placement="bottomRight">
          <span className='header-dropdown-link'>
            <Icon type="user" /> yzc <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header;