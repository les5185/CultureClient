import React, { Component } from 'react';
import content from '../apis/content';
import content2 from '../apis/content2';
import social from '../apis/social';
import { Input, Button, Icon } from 'semantic-ui-react';
import StyledScheduler from '../components/Scheduler';
import daybreak from '../static/image/daybreak.png';
import more from '../static/image/more.png';


import { add } from 'date-fns';

function FriendList(props) {
	const { users } = props;
	let _users;
	const containerStyle = {
		display: 'flex',
		alignItems: "center",
		justifyContent: 'center',
		width: '100%',
		marginBottom: 5
	}
	const inputStyle = {
		marginRight: 5
	}

	const spanStyle = {
		fontSize: 20
	}
	if(users){
		_users = users.map(user => (
			<div style={containerStyle}>
				<input style={inputStyle} type="checkbox" value={user.pk} onChange={props.handleCheckbox}/>
				<span style={spanStyle}>{user.username}</span>
			</div>
		))
	}
	return(
		<div style={{ display:"flex", flexDirection: "column" }}>
			{_users}
		</div>
	)
}


function Search(props) {
	return (
		<div>
			<Input
				placeholder='콘텐츠 검색하기'
				onChange={props.setText}
			/>
			<Button icon onClick={props.sendText}>
				<Icon name='search' />
			</Button>
		</div>
	)
}

function ContentList(props) {
	console.log(props.contents);
	const _contents = props.contents.map((content, index) => {
		if(index < 5) {
			return (		
				<div>
					<img src={"http://tiffany3123.pythonanywhere.com"+content.image} alt="사진없음" style={{ width: "150px", height: "150px"}} />
					<h3>{content.title}</h3>
					<h3>{content.genre}</h3>
				</div>
			)
		}
		else return null
	}

	)
	return _contents
}

function SpecificContentList(props) {
	const _contents = props.contents.map((content, index) => {
		if(5<index < 11) {
			return (
				<div style={{maxWidth: 150}}>
					<img src={"http://tiffany3123.pythonanywhere.com"+content.content.image} alt="사진없음" style={{ width: "150px", height: "150px"}} />
					<h1>{content.content.title}</h1>
					<Button onClick={() => props.handleDetail(content)}>더보기</Button>
				</div>
			)
		}
		else return null
	})
	return _contents
}

function SpecificContentList2(props) {
	const _contents = props.contents.map((content, index) => {
		if(index < 5) {
			return (
				<div style={{maxWidth: 150}}>
					<img src={"http://tiffany3123.pythonanywhere.com"+content.content.image} alt="사진없음" style={{ width: "150px", height: "150px"}} />
					<h1>{content.content.title}</h1>
					<Button onClick={() => props.handleDetail(content)}>더보기</Button>
				</div>
			)
		}
		else return null
	})
	return _contents
}



class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: [],
			results: [],
			specificContents: [],
			page: "home",
			friends: [],
			text: "",
			addedFriend: localStorage.getItem('pk') ? [localStorage.getItem('pk')] : [],
			specificFriendContents: [],
			preferedContents: [],
			currentContent: null
		}
		this.getContents = this.getContents.bind(this);
		this.getSpecificContent = this.getSpecificContent.bind(this);
		this.getSpecificFriendContent = this.getSpecificFriendContent.bind(this);
		this.handlePage = this.handlePage.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.getFriend = this.getFriend.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.setText = this.setText.bind(this);
		this.getSearch = this.getSearch.bind(this);
		this.getPreferedContents = this.getPreferedContents.bind(this);
		this.handleDetail = this.handleDetail.bind(this);
		this.handleImage = this.handleImage.bind(this);
	}

	componentDidMount() {
		this.getContents();
		this.getSpecificContent();
		this.getPreferedContents();
	}

	componentDidUpdate() {
		console.log('update');
	}

	async getContents () {
		const response = await content.get('');
		if (response) {
			console.log(response);
			this.setState({
				contents: response.data
			})
		}
	}

	async getSpecificContent () {
		if(localStorage.getItem('pk')) {
			const data = {
				data: localStorage.getItem('pk')
			}
			const response = await content2.post('compare-individual-schedule/', data);
			if (response) {
				console.log(response);
				this.setState({
					specificContents: response.data
				})
			}
		}
	}


	async getSpecificFriendContent () {
		const { addedFriend } = this.state;
		const converted = addedFriend.map(item => 
			Number(item)
		)
		console.log(converted)
		if(localStorage.getItem('pk')) {
			const data = {
				data: converted
			}
			const response = await content2.post('compare/', data);
			if (response) {
				console.log(response);
				this.setState({
					specificFriendContents: response.data
				})
			}
		}
	}

	async getSearch () {
		const { text } = this.state;
		console.log(text)			
		const response = await content.get('search-content/?text=' + text);
		if (response) {
			console.log(response);
			this.setState({
				results: response.data
			})
		}
	}

	
	async getPreferedContents () {
		if(localStorage.getItem('pk')) {
			const data = {
				user: localStorage.getItem('pk')
			}
			const response = await content2.post('content-by-preference/', data);
			if (response) {
				console.log(response);
				this.setState({
					preferedContents: response.data
				})
			}
		}
	}

	async getFriend () {
		const body = {
			user: localStorage.getItem('username'),
		}
		console.log(body);
		const response = await social.post('friends/', body);
		if (response) {
			this.setState({
				friends: response.data,
			})
		}
	}

	setText(e) {
		this.setState({
			text: e.target.value
		})
	}

	handlePage() {
		this.setState({
			page: "scheduler",
		})
		this.getFriend();
	}

	handleBack() {
		this.setState({
			page: "home",
		})
		this.getSpecificFriendContent();
	}

	handleSearch() {
		this.setState({
			page: "search"
		})
		this.getSearch();
	}

	handleCheckbox(e) {
		const value = e.target.value;
		console.log(value);
		this.setState(prevState => ({
			...prevState,
			addedFriend: [
				...prevState.addedFriend,
				value
			]
		}))
	}

	handleImage() {
		this.setState({
			page: "image"
		})
	}

	handleDetail(data) {
		this.setState({
			currentContent: data,
			page: "detail"
		})
	}

	renderUser () {
		const { contents, specificContents, specificFriendContents, preferedContents } = this.state;
		console.log(preferedContents)
		if(this.state.page === "home") {
			if(localStorage.getItem('pk')) {
				return (
					<div class="cool">
						<div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: 'calc(100% - 38px)'}}>
							<Button style={{
							marginLeft: 200
						}} onClick={this.handlePage}>스케줄 편집</Button>
						</div>

						<StyledScheduler />
						<hr />
						<h1>전체 콘텐츠</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<ContentList contents={contents}/>
						</div>
						<hr/>
						<h1>이번주 추천 문화생활</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<SpecificContentList2 contents={specificContents} handleDetail={this.handleDetail}/>
						</div>
						<hr/>
						<h1>취향 저격 문화생활</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<ContentList contents={preferedContents}/>
						</div>
						<hr/>
						<div>
						<h1>지금 뜨는 문화생활</h1>
						<div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
						</div>
							<img src={daybreak} alt="사진없음" style={{ width: "150px", height: "150px"}} />
							<h4> 데이브레이크 3주년 콘서트</h4>
						</div>
						<hr/>
						<h1>친구와 함께 갈만한 문화생활</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<SpecificContentList contents={specificFriendContents} handleDetail={this.handleDetail}/>
						</div>
					</div>

				)
			}
			else return (
				<div>
					<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
						<h1>전체 콘텐츠</h1>
						<ContentList contents={contents}/>
					</div>
					<hr />
				</div>
			)
		}
	}

	renderSchduler() {
		const { friends } = this.state;
		if(this.state.page === "scheduler") {
			return (
				<div>
					<StyledScheduler />
					<div>
						<FriendList users={friends} handleCheckbox={this.handleCheckbox}/>
					</div>
					<Button onClick={this.handleBack}>돌아가기</Button>
					
				</div>
			)
		}
	}

	renderSearch() {
		const { results } = this.state;
		if(this.state.page === "search") {
			return (
				<div>
					<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
						<ContentList contents={results}/>
					</div>
					<Button onClick={this.handleBack}>돌아가기</Button>
					
				</div>
			)
		}
	}

	renderDetail() {
		const { currentContent } = this.state;
		if(this.state.page === "detail") {
			return (
				<div>
					<div>
						<img src={"http://tiffany3123.pythonanywhere.com"+currentContent.content.image} alt="사진없음" style={{ width: "400px", height: "400px"}} />
						<h1>{currentContent.content.title}</h1>
						<h3>{currentContent.start_time.slice(11, 16)}</h3>
						<h3>{currentContent.end_time.slice(11, 16)}</h3>
					</div>
					<Button onClick={this.handleBack}>돌아가기</Button>
					<Button onClick={this.handleImage}>예약하기</Button>
					
				</div>
			)
		}
	}

	renderImage() {
		const { currentContent } = this.state;
		if(this.state.page === "image") {
			return (
				<div>
					<div>
						<img src={"http://tiffany3123.pythonanywhere.com"+currentContent.content.image} alt="사진없음" style={{ width: "100%", height: "100%"}} />
					</div>
					<Button onClick={this.handleBack}>돌아가기</Button>
					<Button></Button>
					
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{
					this.state.page !== "detail" &&
					<Search setText={this.setText} sendText={this.handleSearch}/>
				}
				{ this.renderUser() }
				{ this.renderSchduler() }
				{ this.renderSearch() }
				{ this.renderDetail() }
				{ this.renderImage()}
			</div>
		)
	}
}

export default Home