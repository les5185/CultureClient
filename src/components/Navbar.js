import React from 'react';
import logo from '../static/image/logo.png'
import '../static/navbar.css';

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="/">
				<img className = "logo" src={logo} alt="이미지 없음"/>
				</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="/concerts">
							공연예술
							</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/conference">
							강연
							</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/exhibition">
							전시
							</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/culture">
							문화예술
							</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/sports">
							스포츠
							</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/admin">
							로그인/회원가입
							</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;