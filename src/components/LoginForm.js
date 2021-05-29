import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react';
import '../static/Login.css';
import login from '../static/image/login.png';


class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}


	handle_change = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevstate => {
			const newState = { ...prevstate };
			newState[name] = value;
			return newState;
		});
	};


	render() {
		const state = this.state;
		return (
		<div>
			<div className="row login">
				<div className="login-img">
					<img src={login} alt="" />
				</div>
				<div className="idANdPW">
					<div className="userid">
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handle_change}
						/>
					</div>
					<div className="userpw">
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handle_change}
						/>
					</div>
				</div>
				<ul className="agree">
					<li><input type="checkbox" /></li>
					<li>자동 로그인</li>
				</ul>
			</div>
					
			<div className="loginbtn">
				<button onClick={() => this.props.handle_login(state)}>로그인</button>
			</div>
			<footer>
				<p>© 2021. COMMA Co. all rights reserved.</p>
			</footer>
		</div>
		);
	};
}


export default LoginForm;

LoginForm.propTypes = {
	handle_login: PropTypes.func.isRequired
};



{/* <Form onSubmit={e => this.props.handle_login(e, this.state)}> 
					<h4>Log In</h4>
					<Form.Field>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Button>로그인</Form.Button>
</Form> */}