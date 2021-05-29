import React, { Component } from 'react';
import "./styles.css";
import 데이브레이크 from './img/데이브레이크.gif';
import 위키드 from './img/위키드.gif';
import 드라큘라 from './img/드라큘라.gif';
import 미스터트롯 from './img/미스터트롯.gif';
import 스페셜라이어 from './img/스페셜라이어.gif';
import 시카고 from './img/시카고.gif';
import 싱어게인 from './img/싱어게인.gif';
import 알엔제이 from './img/알앤제이.gif';


const Blank = () => {
	return (
		<div>
			<ul className='blank-postlist'>
				<li>
					<a href="#"><img className='photo' src={위키드.default} />
						<p>위키드</p></a>
				</li>
				<li>
					<a href="#"> <img className='photo' src={데이브레이크.default} />
						<p>데이브레이크</p></a>
				</li>
				<li>
					<a href="#"><img className='photo' src={드라큘라.default} />
						<p>드라큘라</p></a>
				</li>
				<li>
					<a href="#"><img className='photo' src={미스터트롯.default} />
						<p>미스터트롯</p></a>
				</li>
				<li>
					<a href="#"><img className='photo' src={스페셜라이어.default} />
						<p>스페셜라이어</p></a>
				</li>
			</ul>
			<ul className='blank-postlist'>
				<li>
					<a href="#"><img className='photo' src={시카고.default} />
						<p>시카고</p></a>
				</li>
				<li>
					<a href="#"><img className='photo' src={싱어게인.default} />
						<p>싱어게임</p></a>
				</li>
				<li>
					<a href="#"><img className='photo' src={알엔제이.default} />
						<p>알앤제이</p></a>
				</li>
			</ul>

		</div>
	)
}

export default Blank; 