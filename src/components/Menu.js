import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { accentColor } from '../constants/colors';
import styled from 'styled-components';

export default function Menu() {
	const location = useLocation();
	const navigate = useNavigate();

	if (location.pathname !== '/' && location.pathname !== '/cadastro') {
		return (
			<MenuContainer>
				<h1>
					<Link to="/habitos">Hábitos</Link>
				</h1>
				<div onClick={() => navigate('/hoje')}>
					<CircularProgressbarWithChildren
						value={75}
						background="true"
						backgroundPadding={5}
						styles={{
							path: {
								stroke: '#ffffff',
								strokeLinecap: 'round',
								transition: 'stroke-dashoffset 0.5s ease 0s',
								transformOrigin: 'center center',
							},
							background: {
								fill: `${accentColor}`,
							},
						}}>
						<p>Hoje</p>
					</CircularProgressbarWithChildren>
				</div>
				<h1>
					<Link to="/historico">Histórico</Link>
				</h1>
			</MenuContainer>
		);
	}
}

const MenuContainer = styled.div`
	display: flex;
	z-index: 3;
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
	div {
		width: 91px;
		height: 91px;
		margin-bottom: 40px;
		border-radius: 50%;
		cursor: pointer;
		p {
			margin-bottom: 5px;
			color: #ffffff;
		}
	}
	h1 {
		cursor: pointer;
		a {
			text-decoration: none;
		}
	}
`;
