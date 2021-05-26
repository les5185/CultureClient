
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayed_form: 'login',
			logged_in: localStorage.getItem('token') ? true : false,
			username: '',
		};
	}

	componentDidMount() {
		if (this.state.logged_in) {
			fetch('http://tiffany3123.pythonanywhere.com/user/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					this.setState({ username: json.username });
				});
		}
	}

	// fetch 해서 state 에 가져오는법 url을 이것저것 바꿔줘서 출력하는법 
	handle_login = (e, data) => {
		e.preventDefault();
		fetch('http://tiffany3123.pythonanywhere.com//token-auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.user.username
				});
			})
			.catch(function(error) {
				alert('아이디나 비밀번호를 다시 확인해주세요.')
			})
	};

	handle_signup = (e, data) => {
		console.log(JSON.stringify(data))
		e.preventDefault();
		fetch('http://tiffany3123.pythonanywhere.com/user/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('token', json.token);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.username
				});
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	};

	display_form = form => {
		this.setState({
			displayed_form: form
		});
	};

	render() {
		let form;
		switch (this.state.displayed_form) {
			case 'login':
				form = <LoginForm handle_login={this.handle_login} />;
				break;
			case 'signup':
				form = <SignupForm handle_signup={this.handle_signup} />;
				break;
			default:
				form = null;
		}

		return (
			<div className="App">
				{form}
				<h3>
					{this.state.logged_in
						? `Hello, ${this.state.username}`
						: 'Please Log In'}
				</h3>
			</div>
		);
	}
}

export default Account;