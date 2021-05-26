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
		if(preference_one === '') {
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
			const newState = {...prevstate};
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
			<Checkbox 
				label={item}
				onChange={this.handle_checkbox.bind(this, item)}
			/>
		)
		return checkbox
	}

	renderGender = () => {
		let checkbox = gender.map((item) =>
			<Checkbox
				label={item}
				onChange={this.handle_checkbox2.bind(this, item)}
			/>
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
				<Form onSubmit={e => this.props.handle_signup(e, state)}>
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
					<Form.Field>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							name="first_name"
							value={this.state.first_name}
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							name="last_name"
							value={this.state.last_name}
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="contact">Contact</label>
						<input
							type="text"
							name="contact"
							value={this.state.contact}
							placeholder="핸드폰번호 11자리를 입력하세요."
							onChange={this.handle_change}
						/>
					</Form.Field>
					<Form.Field>
						취향을 선택하세요:
					</Form.Field>
					{ this.renderPreferences() }
					<Form.Field>
						성별:
					</Form.Field>
					{this.renderGender()}
					<Form.Field>
						생년월일:
					</Form.Field>
					{ this.renderDatePicker() }
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