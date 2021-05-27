import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'date-fns'
import format from 'date-fns/format'
import { Button, Checkbox, Form, Radio } from 'semantic-ui-react';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../static/signup.css';
import JOIN from '../static/image/JOIN.png';

const preferences = [
	'유쾌한',
	'어두운',
	'감동적인',
	'스릴있는',
	'힐링',
	'설레는',
	'잔잔한',
	'역동적인',
	'유익한',
	'사진 찍기 좋은',
	'장르물',
	'온택트',
]

const gender = [
	'남성',
	'여성',
]

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			first_name: '',
			last_name: '',
			email: '',
			contact: '',
			birth: new Date(),
			gender: '',
			preference_one: '',
			preference_two: '',
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

	handle_checkbox = item => {
		let preference_one = this.state.preference_one;
		if (preference_one === '') {
			let name = 'preference_one';
			this.setState(prevstate => {
				const newState = { ...prevstate };
				newState[name] = item;
				return newState;
			});
		}
		else {
			let name = 'preference_two';
			this.setState(prevstate => {
				const newState = { ...prevstate };
				newState[name] = item;
				return newState;
			});
		}
	};

	handle_checkbox2 = item => {
		this.setState(prevstate => {
			const newState = { ...prevstate };
			newState['gender'] = item;
			return newState;
		});
	}

	handle_date = (date) => {
		this.setState({
			birth: format(date, 'yyyy-MM-dd')
		})
	}

	renderPreferences = () => {
		let checkbox = preferences.map((item) =>
			<div className="form-check">
				<input
					type="checkbox"
					name="preferences"
					onChange={this.handle_checkbox.bind(this, item)}
				/>
				<label className="form-check-label join-check-label">{item}</label>
			</div>
		)
		return checkbox
	}

	renderGender = () => {
		let checkbox = gender.map((item) =>
			<div className="form-check">
				<input
					type="checkbox"
					name="gender"
					onChange={this.handle_checkbox2.bind(this, item)}
				/>
				<label className="form-check-label join-check-label">{item}</label>
			</div>
		)
		return checkbox
	}

	renderDatePicker = () => {
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="yyyy-MM-dd"
					margin="normal"
					id="date-picker-inline"
					label="생년월일"
					value={this.state.birth}
					onChange={this.handle_date}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		)
	}

	render() {
		const state = this.state;

		return (
		<div>
			<div className="join-title">
				<img className="JOIN" img src={JOIN} alt="이미지 없음" />
			</div>
			<div className="join">
				<table className="join-table">
					<tr className="join-tr">
						<td>사용자 아이디</td>
						<td>
							<input
								type="text"
								name="username"
								value={this.state.username}
								onChange={this.handle_change}
							/>
						</td>
					</tr>
					<tr className="join-tr">
						<td>성</td>
						<td>
							<input
								type="text"
								name="last_name"
								value={this.state.last_name}
								onChange={this.handle_change}
							/>
						</td>
					</tr>
					<tr className="join-tr">
						<td>이 름</td>
						<td>
							<input
								type="text"
								name="first_name"
								value={this.state.first_name}
								onChange={this.handle_change}
							/>
						</td>
					</tr>
					<tr className="join-tr">
						<td>이 메 일</td>
						<td>
							<input
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handle_change}
							/>
						</td>
					</tr>
					<tr className="join-tr">
						<td>비 밀 번 호</td>
						<td>
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handle_change}
							/>
						</td>
					</tr>
				</table>
				<hr/>
					<table className="join-table">
						<tr className="join-tr">
							<td>휴대폰 번호</td>
							<td>
							<input
								type="text"
								name="contact"
								value={this.state.contact}
								placeholder="핸드폰번호 11자리를 입력하세요."
								onChange={this.handle_change}
							/>
							</td>
						</tr>
						<tr className="join-tr">
							<td>성 별</td>
							<td className="join-check">
								{ this.renderGender() }
							</td>
						</tr>
					</table>
						<tr className="join-tr">
							<td>취 향</td>
							<td className="join-check">
								{ this.renderPreferences() }
							</td>
						</tr>
			</div>
			<Form onSubmit={e => this.props.handle_signup(e, state)}>

				<Form.Field>
					취향을 선택하세요:
				</Form.Field>
				{this.renderPreferences()}
				<Form.Field>
					성별:
				</Form.Field>
				{this.renderGender()}
				<Form.Field>
					생년월일:
				</Form.Field>
				{this.renderDatePicker()}
				<Form.Button>회원가입 완료</Form.Button>
			</Form>
		</div>
		);
	}
}

export default SignupForm;

SignupForm.propTypes = {
	handle_signup: PropTypes.func.isRequired
};