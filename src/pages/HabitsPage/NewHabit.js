import { useContext, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext';
import { WEEKDAYS } from '../../constants/weekdays.js';
import { accentColor } from '../../constants/colors';
import axios from 'axios';
import styled from 'styled-components';

export default function NewHabit({ addingHabit, newHabit, setAddingHabit, setNewHabit }) {
	const [sendingNewHabit, setSendingNewHabit] = useState(false);
	const { userInfo } = useContext(UserContext);

	function addNewHabit(e) {
		e.preventDefault();
		setSendingNewHabit(true);
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

		axios
			.post(`${BASE_URL}/habits`, newHabit, config)
			.then((res) => {
				setSendingNewHabit(false);
				setAddingHabit(false);
			})
			.catch((err) => {
				setSendingNewHabit(false);
				console.log(err.response.data);
			});
	}

	function handleDays(number) {
		let newDays = [...newHabit.days];
		if (!newDays.includes(number)) {
			newDays.push(number);
			newDays.sort();
			setNewHabit({ ...newHabit, days: newDays });
		} else {
			newDays = newDays.filter((e) => e !== number);
			setNewHabit({ ...newHabit, days: newDays });
		}
	}
	function handleName(name) {
		setNewHabit({ ...newHabit, name });
	}
	function cancelNewHabit() {
		setNewHabit({ name: '', days: [] });
		setAddingHabit(false);
	}

	return (
		<NewHabitContainer display={addingHabit === true ? 'flex' : 'none'} onSubmit={addNewHabit}>
			<input
				placeholder="nome do hábito"
				value={newHabit.name}
				onChange={(e) => handleName(e.target.value)}
			/>
			<div>
				{WEEKDAYS.map((day, i) => (
					<Weekdays
						key={i}
						type="button"
						title={day.day}
						selected={newHabit.days.includes(day.number)}
						onClick={() => handleDays(day.number)}>
						{day.abbr}
					</Weekdays>
				))}
			</div>
			<Buttons>
				<button type="button" onClick={cancelNewHabit}>
					Cancelar
				</button>
				<button type="submit">
					{sendingNewHabit === true ? <ThreeDots color="#ffffff" width="50" /> : 'Salvar'}
				</button>
			</Buttons>
		</NewHabitContainer>
	);
}

const NewHabitContainer = styled.form`
	display: ${(props) => props.display};
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

const Weekdays = styled.button`
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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 84px;
		height: 35px;
		margin-left: 15px;
		font-size: 16px;
	}
`;
