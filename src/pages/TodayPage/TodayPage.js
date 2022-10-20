import { baseColor, textColor } from '../../constants/colors';
import { useContext, useEffect, useRef, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import Loading from '../../components/Loading';
import ProgressContext from '../../components/ProgressContext';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import checkIcon from '../../assets/images/checkmark.svg';
import dayjs from 'dayjs';
import styled from 'styled-components';

export default function TodayPage() {
	const { userInfo } = useContext(UserContext);
	const { setProgress, progress } = useContext(ProgressContext);
	const [todayHabits, setTodayHabits] = useState([]);
	const percentage = useRef(0);

	console.log(percentage);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

		function progressUpdate() {
			let newProgress = { ...progress };
			newProgress = { ...newProgress, total: todayHabits.length };
			const dones = todayHabits.filter((e) => e.done === true);
			newProgress = { ...newProgress, done: dones.length };
			setProgress(newProgress);
		}

		axios
			.get(`${BASE_URL}/habits/today`, config)
			.then((res) => {
				setTodayHabits(res.data);
				percentage.current = (progress.done / progress.total) * 100;
				progressUpdate();
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

	function checkHabit({ id, done }) {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		if (done === false) {
			axios
				.post(`${BASE_URL}/habits/${id}/check`, [], config)
				.then(() => console.log('sucesso'))
				.catch((err) => console.log(err.response.data));
		} else {
			axios
				.post(`${BASE_URL}/habits/${id}/uncheck`, [], config)
				.then(() => console.log('sucesso'))
				.catch((err) => console.log(err.response.data));
		}
	}

	return (
		<TodayContainer>
			<TodayHeader>
				<h1>
					{dayOfWeek().name}, {dayjs().format('DD/MM')}
				</h1>
				{!percentage ? (
					<h2>Nenhum hábito concluído ainda</h2>
				) : (
					<h3>percentage% dos hábitos concluídos</h3>
				)}
			</TodayHeader>
			{todayHabits.map((e) => {
				return (
					<DayHabits key={e.id} done={e.done}>
						<div>
							<h1>{e.name}</h1>
							<p>Sequência atual: {e.currentSequence} dias</p>
							<p>Seu recorde: {e.highestSequence} dias</p>
						</div>
						<button>
							<img
								src={checkIcon}
								alt="check icon"
								title="concluir hábito"
								onClick={() => checkHabit(e)}
							/>
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
	h3 {
		color: #8fc549;
		font-size: 18px;
		line-height: 23px;
	}
`;

const DayHabits = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	height: fit-content;
	min-height: 94px;
	margin-top: 10px;
	padding: 15px;
	border-radius: 5px;
	background-color: #ffffff;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: ${textColor};
		h1 {
			margin-bottom: 7px;
			font-size: 20px;
			line-height: 25px;
		}
		h2 {
			font-size: 13px;
			line-height: 16px;
		}
	}
	button {
		background-color: ${(props) => (props.done ? '#8FC549' : '#e7e7e7')};
		img {
			width: 69px;
			height: 69px;
			filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(273deg) brightness(105%) contrast(106%);
		}
	}
`;
