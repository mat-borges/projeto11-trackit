import deleteIcon from '../../assets/images/delete.svg';
import styled from 'styled-components';
import { textColor } from '../../constants/colors';
import weekdays from '../../constants/weekdays';

export default function Habits({ habit }) {
	return (
		<Habit>
			<h3>{habit.name}</h3>
			<img src={deleteIcon} alt="deletar habito" title="Deletar hábito" />
			<div>
				{weekdays.map((day, i) => (
					<Weekdays
						key={i}
						title={day.day}
						color={habit.days.includes(day.number) ? '#d5d5d5' : '#ffffff'}
						backcolor={habit.days.includes(day.number) ? '#ffffff' : '#dbdbdb'}
						cursor="default"
						disabled>
						{day.abbr}
					</Weekdays>
				))}
			</div>
		</Habit>
	);
}

const Weekdays = styled.button`
	width: 30px;
	height: 30px;
	margin: 8px 4px 0 0;
	padding: 0;
	border: 1px solid #d5d5d5;
	color: ${(props) => props.color};
	font-size: 20px;
	background-color: ${(props) => props.backcolor};
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
