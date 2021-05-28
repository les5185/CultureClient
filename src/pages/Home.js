import React, { Component } from 'react';
import content from '../apis/content';
import content2 from '../apis/content2';
import social from '../apis/social';
import { Input, Button, Icon } from 'semantic-ui-react';
import StyledScheduler from '../components/Scheduler';
import { add } from 'date-fns';

function FriendList(props) {
	const { users } = props;
	let _users;

	if(users){
		_users = users.map(user => (
			<div>
				{user.username}
				<input type="checkbox" value={user.pk} onChange={props.handleCheckbox}/>
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
		if(index < 5) {
			return (
				<div>
					<img src={"http://tiffany3123.pythonanywhere.com"+content.content.image} alt="사진없음" style={{ width: "150px", height: "150px"}} />
					<h1>{content.content.title}</h1>
					<button onClick={() => props.handleDetail(content)}>detail</button>
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
					<div>
						<button onClick={this.handlePage}>스케줄러 이동</button>
						<StyledScheduler />
						<hr />
						<h1>전체 콘텐츠</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<ContentList contents={contents}/>
						</div>
						<hr />
						<h1>내 일정 맞춤 콘텐츠</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<SpecificContentList contents={specificContents} handleDetail={this.handleDetail}/>
						</div>
						<hr />
						<h1>친구 일정 맞춤 콘텐츠</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<SpecificContentList contents={specificFriendContents} handleDetail={this.handleDetail}/>
						</div>
						<hr />
						<h1>취향 맞춤 콘텐츠</h1>
						<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
							<ContentList contents={preferedContents}/>
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
					<button onClick={this.handleBack}>돌아가기</button>
					
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
					<button onClick={this.handleBack}>돌아가기</button>
					
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
					<button onClick={this.handleBack}>돌아가기</button>
					
				</div>
			)
		}
	}

	render() {
		return (//여기다가 매안페이지 html 처럼 작성하기..
			<div>
				{/* <div>Main Page</div>
      <div className="row" style="margin-bottom: 1em; padding-top: 1em;">
          <div id="carouselExampleIndicators" className="col-md-6 carousel slide" data-bs-ride="carousel" style="height: 400px;">
          <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
              <div className="carousel-item active">
              <img src="./img/인터랙티브 배너_서비스 소개.png" className="d-block w-100" alt="...">
              </div>
              <div className="carousel-item">
              <img src="./img/인터랙티브 배너_광고홍보.png" className="d-block w-100" alt="...">
              </div>
              <div className="carousel-item">
              <img src="./img/인터렉티브 배너_이벤트소개페이지.png" className="d-block w-100" alt="...">
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
          </div>
      {/* <!-- 캘린더 --> */}
        {/* <img className="col-md-6 calendarimg" src="./img/calendar.png"/>
        <button className="calendarbtn">로그인 후 이용 가능한 서비스입니다</button>
          {/* <!-- Button --> */}
        {/* <div className="col-md-12 cal-modifybtn">
          <a href="#"><button >캘린더 수정</button></a>
        </div>
      </div>
     {/* 검색 */}
      {/* <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div> */}
				{
					this.state.page !== "detail" &&
					<Search setText={this.setText} sendText={this.handleSearch}/>
				}
				{ this.renderUser() }
				{ this.renderSchduler() }
				{ this.renderSearch() }
				{ this.renderDetail() }
			</div>
		)
	}
}

export default Home