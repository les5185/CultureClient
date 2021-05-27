import React, { Component } from 'react';
import content from '../apis/content';
import StyledScheduler from '../components/Scheduler';

function ContentList(props) {
	console.log(props.contents);
	const _contents = props.contents.map(content => 
		<div>
			<h1>{content.title}</h1>
			<h1>{content.genre}</h1>
		</div>
	)
	return _contents
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: []
		}
		this.getContents = this.getContents.bind(this);
	}

	componentDidMount() {
		this.getContents();
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
	renderScheduler () {
		if(localStorage.getItem('pk')) {
			return <StyledScheduler />
		}
		else return null;
	}
	render() {
		const { contents } = this.state;
		return (
			<div>
				<div>Main Page</div>
				{ this.renderScheduler() }
				<ContentList contents={contents}/>
			</div>
		)
	}
}

export default Home