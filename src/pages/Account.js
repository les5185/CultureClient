
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import SchedulerPage from './Scheduler';
import Social from '../pages/Social';
import '../static/Mypage.css';
import menubtn from '../static/image/mp-menubtn.png';


function Mypage(props) {
	return (
		< div className="row mypage" >
			<div className="user-name">
				<h3>홍길동님 안녕하세요!</h3>
			</div>
			<div className="userinfo col-6">
				<Link to ="/mypage-userinfo.html">
					<ul>
						<li>회원 정보 관리</li>
						<li><img src={menubtn} alt="" /></li>
					</ul>
				</Link>
			</div>
			<div className="userinfo col-6">
				<Link to="/reservation-list">
					<ul>
						<li>결제 및 예약 내역</li>
						<li><img src={menubtn} alt="" /></li>
					</ul>
				</Link>
			</div>
			<div className="userinfo col-6">
				<Link to="/social">
					<ul>
						<li>친구 목록</li>
						<li><img src={menubtn} alt="" /></li>
					</ul>
				</Link>
			</div>
			<div className="userinfo col-6">
				<Link to="faq">
					<ul>
						<li>FAQ</li>
						<li><img src={menubtn} alt="" /></li>
					</ul>
				</Link>
			</div>
		</div>
	)
}

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
		console.log(localStorage.getItem('token'));
		if (this.state.logged_in) {
			fetch('http://tiffany3123.pythonanywhere.com/user/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(res => res.json())
				.then(json => {
					this.setState({
						username: json.username,
						displayed_form: ''
					});
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
				console.log(json);
				localStorage.setItem('token', json.token);
				localStorage.setItem('username', json.user.username);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.user.username
				});
			})
			.catch(function (error) {
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
				localStorage.setItem('username', json.user.username);
				this.setState({
					logged_in: true,
					displayed_form: '',
					username: json.username
				});
			});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		this.setState({ logged_in: false, username: '' });
	};

	display_form = form => {
		this.setState({
			displayed_form: form
		});
	};



	renderMypage() {
		if (this.state.logged_in) {
			return (
				<Mypage />
			)
		}
		else return null
	}

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
				{
					this.renderMypage()
				}
				<button onClick={this.handle_logout}>토큰 지우기</button>
				<button onClick={this.display_form.bind(this, 'signup')}>회원가입 하기</button>
			</div>
		);
	}
}

export default Account;