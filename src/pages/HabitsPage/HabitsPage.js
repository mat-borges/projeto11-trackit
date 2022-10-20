import { accentColor, baseColor, textColor } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import Loading from '../../components/Loading';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import deleteIcon from '../../assets/images/delete.svg';
import styled from 'styled-components';

export default function HabitsPage() {
	const { userInfo } = useContext(UserContext);
	const [habitsList, setHabitsList] = useState([]);
	const [addingHabit, setAddingHabit] = useState(false);
	const [sendingNewHabit, setSendingNewHabit] = useState(false);
	const [newHabit, setNewHabit] = useState({ name: '', days: [] });

	const weekdays = [
		{ day: 'Domingo', abbr: 'D', number: '0' },
		{ day: 'Segunda-Feira', abbr: 'S', number: '1' },
		{ day: 'Terça-Feira', abbr: 'T', number: '2' },
		{ day: 'Quarta-Feira', abbr: 'Q', number: '3' },
		{ day: 'Quinta-Feira', abbr: 'Q', number: '4' },
		{ day: 'Sexta-Feira', abbr: 'S', number: '5' },
		{ day: 'Sábado', abbr: 'S', number: '6' },
	];

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		axios
			.get(`${BASE_URL}/habits`, config)
			.then((res) => {
				console.log(res.data);
				setHabitsList(res.data);
			})
			.catch((err) => console.log(err.response.data));
	}, [userInfo]);

	if (habitsList.length === 0) {
		return <Loading />;
	}

	function addNewHabit(e) {
		e.preventDefault();
		setSendingNewHabit(true);
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

		axios
			.post(`${BASE_URL}/habits`, newHabit, config)
			.then((res) => {
				setSendingNewHabit(false);
				setAddingHabit(false);
				console.log(res.data);
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
		<HabitsContainer display={habitsList.length === 0 ? 'inline-block' : 'none'}>
			<HabitsHeader>
				<h1>Meus Hábitos</h1>
				<button
					disabled={addingHabit === true ? 'disabled' : ''}
					onClick={() => setAddingHabit(true)}>
					<h2>+</h2>
				</button>
			</HabitsHeader>
			<NewHabit display={addingHabit === true ? 'flex' : 'none'} onSubmit={addNewHabit}>
				<input
					placeholder="nome do hábito"
					value={newHabit.name}
					onChange={(e) => handleName(e.target.value)}
				/>
				<div>
					{weekdays.map((e, i) => (
						<Weekdays
							key={i}
							type="button"
							title={e.day}
							backcolor={newHabit.days.includes(e.number) ? '#d5d5d5' : '#ffffff'}
							color={newHabit.days.includes(e.number) ? '#ffffff' : '#dbdbdb'}
							onClick={() => handleDays(e.number)}>
							{e.abbr}
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
			</NewHabit>
			{habitsList.map((habit) => {
				return (
					<Habits>
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
					</Habits>
				);
			})}

			<span>
				Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
			</span>
		</HabitsContainer>
	);
}

const HabitsContainer = styled.div`
	margin: 70px 18px;
	span {
		display: ${(props) => props.display};
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
	border: 1px solid #d5d5d5;
	color: ${(props) => props.color};
	font-size: 20px;
	background-color: ${(props) => props.backcolor};
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
