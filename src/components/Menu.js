import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ProgressContext from './ProgressContext';
import { accentColor } from '../constants/colors';
import styled from 'styled-components';

export default function Menu() {
	const location = useLocation();
	const navigate = useNavigate();
	const { percentage, setPercentage, progress, progressBar } = useContext(ProgressContext);

	useEffect(() => {
		setPercentage((progress.done / progress.total) * 100);
	}, [progress, progressBar]);

	if (location.pathname !== '/' && location.pathname !== '/cadastro') {
		return (
			<MenuContainer>
				<h1 data-identifier="habit-page-action">
					<Link to="/habitos">Hábitos</Link>
				</h1>
				<div onClick={() => navigate('/hoje')} key={progress}>
					<CircularProgressbarWithChildren
						value={isNaN(percentage) ? 0 : percentage}
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
				<h1 data-identifier="historic-page-action">
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
