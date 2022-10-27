import { accentColor, baseColor, textColor } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import Habits from './Habits';
import Loading from '../../components/Loading';
import NewHabit from './NewHabit';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function HabitsPage() {
	const { userInfo } = useContext(UserContext);
	const navigate = useNavigate();
	const [habitsList, setHabitsList] = useState([]);
	const [addingHabit, setAddingHabit] = useState(false);
	const [newHabit, setNewHabit] = useState({ name: '', days: [] });
	const [render, setRender] = useState(false);
	const [load, setLoad] = useState(true);

	useEffect(() => {
		if (localStorage.token !== undefined) {
			userInfo.userName = localStorage.name;
			userInfo.email = localStorage.email;
			userInfo.token = localStorage.token;
			userInfo.image = localStorage.image;
			const config = { headers: { Authorization: `Bearer ${localStorage.token}` } };
			axios
				.get(`${BASE_URL}/habits`, config)
				.then((res) => {
					setHabitsList(res.data);
					setLoad(false);
				})
				.catch((err) => {
					navigate('/');
					console.log(err.response.data);
				});
		} else {
			navigate('/');
		}
	}, [render]);

	if (load === true) {
		return <Loading />;
	}

	return (
		<HabitsContainer display={habitsList.length === 0 ? 'inline-block' : 'none'}>
			<HabitsHeader>
				<h1>Meus Hábitos</h1>
				<button
					disabled={addingHabit === true ? 'disabled' : ''}
					onClick={() => setAddingHabit(true)}
					data-identifier="create-habit-btn">
					<h2>+</h2>
				</button>
			</HabitsHeader>
			<NewHabit
				addingHabit={addingHabit}
				newHabit={newHabit}
				setAddingHabit={setAddingHabit}
				setNewHabit={setNewHabit}
				render={render}
				setRender={setRender}
			/>
			{habitsList.map((habit, i) => (
				<Habits key={i} habit={habit} render={render} setRender={setRender} />
			))}

			<span data-identifier="no-habit-message">
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
