import { accentColor, baseColor, textColor } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls';
import Habits from './Habits';
import Loading from '../../components/Loading';
import NewHabit from './NewHabit';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import styled from 'styled-components';

export default function HabitsPage() {
	const { userInfo } = useContext(UserContext);
	const [habitsList, setHabitsList] = useState([]);
	const [addingHabit, setAddingHabit] = useState(false);
	const [newHabit, setNewHabit] = useState({ name: '', days: [] });

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		axios
			.get(`${BASE_URL}/habits`, config)
			.then((res) => {
				setHabitsList(res.data);
			})
			.catch((err) => console.log(err.response.data));
	}, [userInfo]);

	if (habitsList.length === 0) {
		return <Loading />;
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
			<NewHabit
				addingHabit={addingHabit}
				newHabit={newHabit}
				setAddingHabit={setAddingHabit}
				setNewHabit={setNewHabit}
			/>
			{habitsList.map((habit, i) => (
				<Habits key={i} habit={habit} />
			))}

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
