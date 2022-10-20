import UserContext from './UserContext.js';
import { baseColor } from '../constants/colors.js';
import styled from 'styled-components';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
	const location = useLocation();
	const { userInfo } = useContext(UserContext);
	console.log(userInfo);

	if (location.pathname !== '/' && location.pathname !== '/cadastro') {
		return (
			<HeaderContainer>
				<h1>TrackIt</h1>
				<img
					src={userInfo.image}
					alt={userInfo.name}
					title={`${userInfo.name}\n${userInfo.email}`}
				/>
			</HeaderContainer>
		);
	}
}

const HeaderContainer = styled.div`
	display: flex;
	z-index: 3;
	position: fixed;
	top: 0;
	left: 0;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	padding: 0 20px;
	color: #ffffff;
	font-size: 38.98px;
	font-family: 'Playball', cursive;
	background-color: ${baseColor};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	img {
		width: 51px;
		height: 51px;
		border-radius: 50%;
		object-fit: cover;
	}
`;
