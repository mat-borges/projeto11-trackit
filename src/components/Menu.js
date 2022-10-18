import { accentColor } from '../constants/colors';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

export default function Menu() {
	const location = useLocation();
	if (location.pathname !== '/' && location.pathname !== '/cadastro') {
		return (
			<MenuContainer>
				<h1>Hábitos</h1>
				<button>Hoje</button>
				<h1>Histórico</h1>
			</MenuContainer>
		);
	}
}

const MenuContainer = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	color: ${accentColor};
	font-size: 18px;
	background-color: #ffffff;
	img {
		width: 51px;
		height: 51px;
		border-radius: 50%;
		object-fit: cover;
	}
	button {
		width: 91px;
		height: 91px;
		border-radius: 50%;
		margin-bottom: 40px;
		font-size: 18px;
	}
	h1 {
		cursor: pointer;
	}
`;
