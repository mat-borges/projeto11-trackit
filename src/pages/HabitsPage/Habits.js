import { BASE_URL } from '../../constants/urls.js';
import ProgressContext from '../../components/ProgressContext.js';
import UserContext from '../../components/UserContext.js';
import { WEEKDAYS } from '../../constants/weekdays.js';
import axios from 'axios';
import deleteIcon from '../../assets/images/delete.svg';
import styled from 'styled-components';
import { textColor } from '../../constants/colors';
import { useContext } from 'react';

export default function Habits({ habit, render, setRender }) {
	const { userInfo } = useContext(UserContext);
	const { progressBar, setProgressBar } = useContext(ProgressContext);

	function deleteHabit(id) {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		if (window.confirm('Tem certeza que deseja deletar esse hábito?')) {
			axios
				.delete(`${BASE_URL}/habits/${id}`, config)
				.then(() => {
					alert('Hábito removido com sucesso!');
					setRender(!render);
					setProgressBar(!progressBar);
				})
				.catch((err) => console.log(err.response.data));
		}
	}

	return (
		<Habit>
			<h3 data-identifier="habit-name">{habit.name}</h3>
			<img
				src={deleteIcon}
				alt="deletar habito"
				title="Deletar hábito"
				onClick={() => deleteHabit(habit.id)}
				data-identifier="delete-habit-btn"
			/>
			<div>
				{WEEKDAYS.map((day, i) => (
					<WeekdaysContainer
						key={i}
						title={day.day}
						selected={habit.days.includes(Number(day.number))}
						cursor="default"
						disabled>
						{day.abbr}
					</WeekdaysContainer>
				))}
			</div>
		</Habit>
	);
}

const WeekdaysContainer = styled.button`
	width: 30px;
	height: 30px;
	margin: 8px 4px 0 0;
	padding: 0;
	border: 1px solid #cfcfcf;
	color: ${(props) => (props.selected ? '#ffffff' : '#dbdbdb')};
	font-size: 20px;
	background-color: ${(props) => (props.selected ? '#cfcfcf' : '#ffffff')};
	cursor: ${(props) => (props.cursor === 'default' ? 'default' : 'pointer')};
`;

const Habit = styled.div`
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
