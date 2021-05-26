import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react';

class LoginForm extends React.Component {
	state = {
		username: '',
		password: ''
	};

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
		return (
			<Form onSubmit={e => this.props.handle_login(e, this.state)}>
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
			</Form>
		);
	}
}

export default LoginForm;

LoginForm.propTypes = {
	handle_login: PropTypes.func.isRequired
};