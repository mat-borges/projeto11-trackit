import { baseColor, textColor } from '../../constants/colors';

import checkIcon from '../../assets/images/checkmark.svg';
import dayjs from 'dayjs';
import styled from 'styled-components';

export default function TodayPage() {
	dayjs.locale('br');
	const dayOfWeek = () => {
		switch (dayjs().day()) {
			case 0:
				return 'Domingo';
			case 1:
				return 'Segunda';
			case 2:
				return 'Terça';
			case 3:
				return 'Quarta';
			case 4:
				return 'Quinta';
			case 5:
				return 'Sexta';
			case 6:
				return 'Sábado';
			default:
				return null;
		}
	};

	return (
		<TodayContainer>
			<TodayHeader>
				<h1>
					{dayOfWeek()}, {dayjs().format('DD/MM')}
				</h1>
				<h2>Nenhum hábito concluído ainda</h2>
			</TodayHeader>
			<DayHabits>
				<div>
					<h1>Ler 1 capítulo de livro</h1>
					<p>Sequência atual: 3 dias</p>
					<p>Seu recorde: 5 dias</p>
				</div>
				<button>
					<img src={checkIcon} alt="check icon" title="concluir hábito" />
				</button>
			</DayHabits>
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
		background-color: #e7e7e7;
		img {
			width: 69px;
			height: 69px;
			filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(273deg) brightness(105%) contrast(106%);
		}
	}
`;
