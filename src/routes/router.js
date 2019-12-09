import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Login from '../pages/login/Login'
import AuthorizedRoute from './AuthorizedRoute'
import NoFound from '../pages/noFound/NoFound'



export const Router = () => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/login" component={Login} />{/*注意redirect转向的地址要先定义好路由*/}
				<Redirect from="/" exact to="/login" />
				<AuthorizedRoute component={Layout} />
				<Route component={NoFound} />
			</Switch>
		</div>
	</BrowserRouter>
)

