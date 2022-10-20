import { baseColor, textColor } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import Loading from '../../components/Loading';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import checkIcon from '../../assets/images/checkmark.svg';
import dayjs from 'dayjs';
import styled from 'styled-components';

export default function TodayPage() {
	const { userInfo } = useContext(UserContext);
	const [todayHabits, setTodayHabits] = useState([]);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		axios
			.get(`${BASE_URL}/habits/today`, config)
			.then((res) => {
				console.log(res.data);
				setTodayHabits(res.data);
			})
			.catch((err) => console.log(err.response.data));
	}, [userInfo]);

	if (todayHabits.length === 0) {
		return <Loading />;
	}

	dayjs.locale('br');
	const dayOfWeek = () => {
		switch (dayjs().day()) {
			case 0:
				return { d: '0', name: 'Domingo' };
			case 1:
				return { d: '1', name: 'Segunda' };
			case 2:
				return { d: '2', name: 'Terça' };
			case 3:
				return { d: '3', name: 'Quarta' };
			case 4:
				return { d: '4', name: 'Quinta' };
			case 5:
				return { d: '5', name: 'Sexta' };
			case 6:
				return { d: '6', name: 'Sábado' };
			default:
				return null;
		}
	};

	return (
		<TodayContainer>
			<TodayHeader>
				<h1>
					{dayOfWeek().name}, {dayjs().format('DD/MM')}
				</h1>
				<h2>Nenhum hábito concluído ainda</h2>
			</TodayHeader>
			{todayHabits.map((e) => {
				return (
					<DayHabits key={e.id} color={e.done === true ? '#8FC549' : '#e7e7e7'}>
						<div>
							<h1>{e.name}</h1>
							<p>Sequência atual: {e.currentSequence} dias</p>
							<p>Seu recorde: {e.highestSequence} dias</p>
						</div>
						<button>
							<img src={checkIcon} alt="check icon" title="concluir hábito" />
						</button>
					</DayHabits>
				);
			})}
		</TodayContainer>
	);
}

const TodayContainer = styled.div`
	margin: 70px 18px;
`;

const TodayHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 25px;
	padding-top: 23px;
	h1 {
		color: ${baseColor};
		font-size: 23px;
		line-height: 23px;
		margin-bottom: 5px;
	}
	h2 {
		color: #bababa;
		font-size: 18px;
		line-height: 23px;
	}
`;

const DayHabits = styled.div`
	box-sizing: border-box;
	min-height: 94px;
	height: fit-content;
	background-color: #ffffff;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	padding: 15px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: ${textColor};
		h1 {
			font-size: 20px;
			line-height: 25px;
			margin-bottom: 7px;
		}
		h2 {
			font-size: 13px;
			line-height: 16px;
		}
	}
	button {
		background-color: ${(props) => props.color};
		img {
			width: 69px;
			height: 69px;
			filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(273deg) brightness(105%) contrast(106%);
		}
	}
`;
