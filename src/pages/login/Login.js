import React from 'react'
import './Login.styl'
import { login } from '../../mock.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { getToken, setToken, removeToken, setUserName, setPwd, removeUserInfo } from '@/utils/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.isLogging = false;
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {

				React.$axios
					.post("/admin/auth/login", {
						username: values.userName,
						password: values.password
					})
					.then(res => {
						const data = res.data
						setToken(data.token)
						setUserName(values.userName)
						setPwd(values.password)
						// commit('SET_TOKEN', data.token)
						// commit('SET_USERINFO', data.user)

						this.isLogging = true;
						login(values).then(() => {
							this.isLogging = false;
							let toPath = this.props.toPath === '' ? '/home' : this.props.toPath
							this.props.history.push(toPath);
						})

					});

			}
		});
	}
	render() {
		const { increase, decrease} = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem>
					{/* {getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)} */}
					<Button type="primary" htmlType="submit" className="login-form-button"
						loading={this.isLogging ? true : false}>
						{this.isLogging ? 'Loging' : '登录'}
					</Button>

					{/* <Button  onClick={increase}   className="login-form-button">
						add
					</Button>
					<Button   onClick={decrease}   className="login-form-button">
						jian
					</Button>
					{this.props.count} */}
				</FormItem>
			</Form>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		increase: () => dispatch({ type: 'ADD' }),
		decrease: () => dispatch({ type: 'JIAN' })
	}
}

const mapStateToProps = ({ loginState }) => ({
	toPath: loginState.toPath,
	count: loginState.count
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappedNormalLoginForm))
