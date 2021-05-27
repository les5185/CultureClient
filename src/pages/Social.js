import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import social from '../apis/social'

function FriendList(props) {
	const {users} = props;
	let _users;

	if(users){
		_users = users.map(user => (
			<div>
				{user.username}
			</div>
		))
	}
	return(
		<div>
			{_users}
			<button onClick = {props.setIsSearch}>친구 추가하기
			</button>
		</div>
	)
}


function FriendSearch(props) {
		const { results } = props;
		let _results;
		if (results) {
			_results = results.map(user => (
				<div>
					<h1>{user.username}
					</h1>
					<Button
						onClick={() => props.addFriend(user.username)}> 친구 추가하기
					</Button>
				</div>
			))
		}

		return (
			<div>
				<h1>
					친구 찾기
				</h1>
				<Input
					placeholder='친구 찾기...'
					onChange={props.setText}
				/>
				<Button icon onClick={props.sendText}>
					<Icon name='search' />
				</Button>
				
				{_results}
				<Button onClick={props.handleClick}>돌아가기</Button>
				
			</div>
		)
	}

	class Social extends Component {
		constructor(props) {
			super(props);
			this.state = {
				text: "",
				users: [],
				results: [],
				isSearch: false
			}
			this.setText = this.setText.bind(this);
			this.sendText = this.sendText.bind(this);
			this.addFriend = this.addFriend.bind(this);
			this.getFriend = this.getFriend.bind(this);
			this.setIsSearch = this.setIsSearch.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}

		componentDidMount(){
			this.getFriend();
		}

		setText(e) {
			this.setState({
				text: e.target.value
			})
		}

		async sendText() {
			const response = await social.get('search-user/?text=' + this.state.text);
			if (response) {
				this.setState({
					results: response.data,
				})
			}
		}

		async addFriend(username) {
			const body = {
				user: localStorage.getItem('username'),
				friend: username
			}
			const response = await social.post('add-friend/', body);
			if (response) {
				alert(username + '님이 추가 되었습니다.');
			}
		}

		async getFriend () {
			const body = {
				user: localStorage.getItem('username'),
			}
			const response = await social.post('friends/', body);
			if (response) {
				this.setState({
					users: response.data
				})
			}
		}

		setIsSearch() {
			this.setState(prevState => ({
				isSearch: !prevState.isSearch
			}))
		}

		handleClick(){
			this.setIsSearch();
			this.getFriend();
			this.setState({
				results: []
			})
		}

		render() {
			if (this.state.isSearch) {
				return (
					<FriendSearch setText={this.setText} sendText={this.sendText} addFriend = {this.addFriend} results={this.state.results} handleClick={this.handleClick}/>
				)
			} else return <FriendList users={this.state.users} setIsSearch={this.setIsSearch}/>
		}
	}

	export default Social; 