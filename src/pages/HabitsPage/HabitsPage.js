import { accentColor, baseColor, textColor } from '../../constants/colors';

import deleteIcon from '../../assets/images/delete.svg';
import styled from 'styled-components';

export default function HabitsPage() {
	const weekdays = [
		{ day: 'Domingo', abbr: 'D' },
		{ day: 'Segunda-Feira', abbr: 'S' },
		{ day: 'Terça-Feira', abbr: 'T' },
		{ day: 'Quarta-Feira', abbr: 'Q' },
		{ day: 'Quinta-Feira', abbr: 'Q' },
		{ day: 'Sexta-Feira', abbr: 'S' },
		{ day: 'Sábado', abbr: 'S' },
	];

	return (
		<HabitsContainer>
			<HabitsHeader>
				<h1>Meus Hábitos</h1>
				<button>
					<h2>+</h2>
				</button>
			</HabitsHeader>
			<NewHabit>
				<input placeholder="nome do hábito" />
				<Weekdays>
					{weekdays.map((e, i) => (
						<button key={i} title={e.day}>
							{e.abbr}
						</button>
					))}
				</Weekdays>
				<Buttons>
					<button type="submit">Cancelar</button>
					<button type="submit">Salvar</button>
				</Buttons>
			</NewHabit>
			<Habits>
				<h3>Ler 1 capítulo de livro</h3>
				<img src={deleteIcon} alt="deletar habito" title="Deletar hábito" />
				<Weekdays>
					{weekdays.map((e, i) => (
						<button key={i} title={e.day}>
							{e.abbr}
						</button>
					))}
				</Weekdays>
			</Habits>
			<p>
				Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
			</p>
		</HabitsContainer>
	);
}

const HabitsContainer = styled.div`
	margin: 70px 18px;
	p {
		margin-top: 30px;
		color: ${textColor};
		font-size: 18px;
	}
`;

const HabitsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 25px;
	padding-top: 23px;
	color: ${baseColor};
	font-size: 23px;
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 35px;
		padding: 0;
		background-color: ${accentColor};
		h2 {
			padding-bottom: 4px;
			color: #ffffff;
			font-weight: 500;
			font-size: 28px;
			line-height: 35px;
			text-align: center;
		}
	}
`;

const NewHabit = styled.form`
	display: flex;
	position: relative;
	flex-direction: column;
	box-sizing: border-box;
	width: 340px;
	height: 180px;
	padding: 15px;
	border-radius: 5px;
	background-color: #ffffff;
	input {
		width: 95%;
	}
`;

const Weekdays = styled.div`
	button {
		width: 30px;
		height: 30px;
		margin: 8px 4px 0 0;
		padding: 0;
		border: 1px solid #d5d5d5;
		color: #dbdbdb;
		font-size: 20px;
		background-color: #ffffff;
	}
`;

const Buttons = styled.div`
	display: flex;
	position: absolute;
	right: 15px;
	bottom: 15px;
	button:first-child {
		color: ${accentColor};
		background-color: #ffffff;
	}
	button {
		width: 84px;
		height: 35px;
		margin-left: 15px;
		font-size: 16px;
	}
`;

const Habits = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	box-sizing: border-box;
	width: 340px;
	height: fit-content;
	min-height: 90px;
	margin-top: 10px;
	padding: 15px;
	border-radius: 5px;
	text-align: left;
	background-color: #ffffff;
	h3 {
		color: ${textColor};
		font-size: 18px;
	}
	img {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 15px;
		height: 15px;
		cursor: pointer;
		filter: invert(40%) sepia(0%) saturate(1406%) hue-rotate(151deg) brightness(100%) contrast(97%);
	}
`;
